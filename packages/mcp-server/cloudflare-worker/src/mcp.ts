// The stateless MCP endpoint (protocol revision 2026-07-28, with stateless serving for 2025-era
// clients). Each POST /mcp gets a new server instance from `createMcpHandler`: there is no
// session, no `Mcp-Session-Id`, and no Durable Object.
import {
  createMcpHandler,
  localhostAllowedHostnames,
  localhostAllowedOrigins,
  originValidationResponse,
  ProtocolError,
  ProtocolErrorCode,
  Server,
  TRACEPARENT_META_KEY,
  TRACESTATE_META_KEY,
  type AuthInfo,
  type CallToolResult,
  type JSONObject,
  type JSONValue,
  type McpHandlerRequestOptions,
  type Tool,
} from '@modelcontextprotocol/server';
import type { ClientOptions } from 'dodopayments';
import docsSearch from 'dodopayments-mcp/docs-search-tool';
import { LocalDocsSearch } from 'dodopayments-mcp/local-docs-search';
import { asTextContentResult } from 'dodopayments-mcp/types';
import type { DodoAuthProps } from './dodo-auth';
import { ExchangeRefusedError } from './dodo-auth';
import {
  callReadDocsPage,
  callSearchDocs,
  readDocsPageTool,
  searchDocsTool,
  type DocsFetcher,
} from './docs-tools';
import { executeToolDescriptor, runExecute, type ForbiddenCall } from './execute-tool';
import { callFeedback, feedbackTool } from './feedback';

export const SERVER_INFO = { name: 'dodopayments_api', version: '2.61.1' }; // x-release-please-version

/**
 * The caller of one MCP request: a dodo-auth MCP token after the token check. A request without
 * a token gets `null`: it can use the docs tools and `feedback`, but never gets an API client.
 */
export type McpSession = DodoAuthProps;
export type McpCaller = McpSession | null;

export interface McpDeps {
  loader: WorkerLoader;
  /** The SDK options for the `execute` tool. A dodo-auth session gets them from the token exchange. */
  clientOptions: (session: McpSession) => Promise<ClientOptions>;
  /** The page where the user changes the scopes of a connection. */
  profileUrl: string;
  /** Host names that this deployment serves, in addition to the loopback names. */
  allowedHosts: readonly string[];
  /** dodo-knowledge, for `search_docs`: the KNOWLEDGE service binding. */
  knowledge: DocsFetcher;
  /** The fetcher of docs.dodopayments.com pages, for `read_docs_page`. */
  docs: DocsFetcher;
}

const TOOLS_LIST_TTL_MS = 300_000;
const MCP_PATH = '/mcp';

export const SERVER_INSTRUCTIONS = `Dodo Payments: docs and API tools.

- search_docs: search the guides. Call it before you write integration code.
- read_docs_page: read a full docs page from a search_docs \`Source:\` URL.
- search: find SDK methods and their parameters. Call it before execute.
- execute: run code against the Dodo Payments API for the signed-in business. Needs sign-in: the first call without it starts sign-in in the client.
- feedback: report a wrong answer, a confusing error or a missing feature.

All tools except execute work without sign-in. Each execute call runs in a fresh sandbox, so return everything you need, and read an error before you retry. Use test mode until the integration is ready for live payments.`;

export const CORS_HEADERS: Record<string, string> = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST, OPTIONS',
  'access-control-allow-headers':
    'authorization, content-type, accept, mcp-protocol-version, mcp-method, mcp-name, dodo-mode, traceparent, tracestate',
  'access-control-expose-headers': 'www-authenticate',
  'access-control-max-age': '86400',
};

/** Rejects a request that is not POST /mcp before any token check. */
export function transportGate(request: Request): Response | undefined {
  const { pathname } = new URL(request.url);
  if (pathname !== MCP_PATH) return undefined;
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (request.method !== 'POST') {
    return Response.json(
      { jsonrpc: '2.0', error: { code: -32000, message: 'Method not allowed.' }, id: null },
      { status: 405, headers: { allow: 'POST', ...CORS_HEADERS } },
    );
  }
  return undefined;
}

function isLoopback(hostname: string): boolean {
  return localhostAllowedHostnames().includes(hostname);
}

function forbidden(message: string): Response {
  return Response.json(
    { jsonrpc: '2.0', error: { code: -32000, message }, id: null },
    { status: 403, headers: CORS_HEADERS },
  );
}

/**
 * DNS rebinding protection (the SDK handler does not do it). The Host must be a name of this
 * deployment. On a loopback host (`wrangler dev`) the Origin must also be a loopback origin.
 * On the public host, MCP clients that run in a browser send their own Origin, so it is not checked.
 */
function rebindingGate(request: Request, allowedHosts: readonly string[]): Response | undefined {
  const { hostname } = new URL(request.url);
  if (isLoopback(hostname)) {
    return originValidationResponse(request, localhostAllowedOrigins());
  }
  if (allowedHosts.includes(hostname) || hostname.endsWith('.workers.dev')) return undefined;
  return forbidden(`Invalid Host header: ${hostname}`);
}

let docsIndex: Promise<LocalDocsSearch> | undefined;

/** The embedded SDK method index is built once for each isolate, at the first `search` call. */
function ensureDocsIndex(): Promise<LocalDocsSearch> {
  docsIndex ??= LocalDocsSearch.create().catch((error: unknown) => {
    docsIndex = undefined;
    throw error;
  });
  return docsIndex;
}

function canWrite(session: McpSession): boolean {
  return session.scopes.some((scope) => scope.endsWith(':write'));
}

function jsonValue(value: unknown): JSONValue {
  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  if (Array.isArray(value)) return value.map(jsonValue);
  if (typeof value === 'object') return jsonObject(value);
  return null;
}

function jsonObject(value: object): JSONObject {
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, jsonValue(item)]));
}

/** A tool of the `dodopayments-mcp` package (SDK v1 types) as an SDK v2 tool. */
function v2Tool(
  tool: typeof executeToolDescriptor,
  name: string,
  description: string,
  annotations: Tool['annotations'],
): Tool {
  const { properties, required } = tool.inputSchema;
  return {
    name,
    description,
    inputSchema: {
      type: 'object',
      ...(properties !== undefined && { properties: jsonObject(properties) }),
      ...(required !== undefined && { required }),
    },
    annotations,
  };
}

const EXECUTE_DESCRIPTION = `Run JavaScript against the Dodo Payments API with an SDK client for the signed-in business, in the mode of the session (test or live). Needs sign-in: without it the call returns 401 and the client starts sign-in.

Call search first to find the SDK method and its parameters. Define \`async function run(client) { ... }\`. The tool returns the value of run and the console.log output. Each call runs in a fresh sandbox with no network except the API: return everything you need. Do not wrap single calls in try/catch. Write calls change real data.`;

const SEARCH_DESCRIPTION =
  'Search the Dodo Payments SDK reference for methods, parameters and examples. Call it before execute, or when you need the exact SDK method for your code. For guides and concepts, use search_docs. No sign-in needed.';

/** The tools for the caller of this request. The order is fixed. */
export function toolsFor(session: McpCaller): Tool[] {
  const write = session === null || canWrite(session);
  const grantLine =
    session === null ? undefined : (
      `This connection can use these scopes: ${session.scopes.length > 0 ? session.scopes.join(', ') : 'none'}. A call that needs a different scope fails.`
    );
  return [
    v2Tool(docsSearch.tool, 'search', SEARCH_DESCRIPTION, {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    }),
    searchDocsTool,
    readDocsPageTool,
    v2Tool(
      executeToolDescriptor,
      'execute',
      grantLine === undefined ? EXECUTE_DESCRIPTION : `${EXECUTE_DESCRIPTION}\n\n${grantLine}`,
      { readOnlyHint: !write, destructiveHint: write, idempotentHint: false, openWorldHint: true },
    ),
    feedbackTool,
  ];
}

const SCOPE_ALIASES: Record<string, string> = {
  checkouts: 'checkout_sessions',
  addons: 'products',
  product_collections: 'products',
  licenses: 'license_keys',
  license_key_instances: 'license_keys',
};

/** The resources of `MCP_RESOURCES` in `common::permissions` of the backend. Keep the two lists the same. */
export const MCP_SCOPE_RESOURCES: ReadonlySet<string> = new Set([
  'payments',
  'refunds',
  'disputes',
  'checkout_sessions',
  'customers',
  'subscriptions',
  'discounts',
  'license_keys',
  'entitlements',
  'credit_entitlements',
  'products',
  'brands',
  'events',
  'meters',
  'payouts',
  'balances',
]);

/** The scope that an API call needs, from its method and path. Undefined if the path has no MCP scope. */
export function scopeForCall(call: Pick<ForbiddenCall, 'method' | 'path'>): string | undefined {
  const segments = call.path
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replaceAll('-', '_'));
  const first = segments[0] === 'invoices' ? segments[1] : segments[0];
  const resource = SCOPE_ALIASES[first ?? ''] ?? first;
  if (resource === undefined || !MCP_SCOPE_RESOURCES.has(resource)) return undefined;
  const access = call.method === 'GET' || call.method === 'HEAD' ? 'read' : 'write';
  return `${resource}:${access}`;
}

/**
 * The answer to an API 403. It is a tool error, not HTTP 403, because Cursor and Claude Code do
 * not do the step-up correctly. ChatGPT reads `mcp/www_authenticate` and asks for the scope.
 */
export function scopeErrorResult(
  call: ForbiddenCall,
  origin: string,
  profileUrl: string,
  scope: string,
): CallToolResult {
  const description = `This connection does not have the ${scope} scope.`;
  const lines = [
    `Dodo Payments refused ${call.method} ${call.path} with 403 Forbidden.`,
    description,
    `To add the scope, change this connection in Settings, Connected apps: ${profileUrl}. Then call the tool again.`,
  ];
  if (call.message) lines.push(`API message: ${call.message}`);
  return {
    content: [{ type: 'text', text: lines.join('\n') }],
    isError: true,
    _meta: {
      'mcp/www_authenticate': [
        `Bearer realm="OAuth", resource_metadata="${origin}/.well-known/oauth-protected-resource${MCP_PATH}", error="insufficient_scope", scope="${scope}", error_description="${description}"`,
      ],
    },
  };
}

const TRACEPARENT = /^[0-9a-f]{2}-[0-9a-f]{32}-[0-9a-f]{16}-[0-9a-f]{2}$/;

/** W3C trace context from the request `_meta`, for the API calls of the tool. */
export function traceHeaders(meta: Record<string, unknown> | undefined): Record<string, string> {
  const traceparent = meta?.[TRACEPARENT_META_KEY];
  if (typeof traceparent !== 'string' || !TRACEPARENT.test(traceparent)) return {};
  const tracestate = meta?.[TRACESTATE_META_KEY];
  return typeof tracestate === 'string' && tracestate.length <= 512 ?
      { traceparent, tracestate }
    : { traceparent };
}

function textError(text: string): CallToolResult {
  return { content: [{ type: 'text', text }], isError: true };
}

async function callExecute(
  args: Record<string, unknown> | undefined,
  meta: Record<string, unknown> | undefined,
  session: McpSession,
  deps: McpDeps,
  origin: string,
): Promise<CallToolResult> {
  let clientOptions: ClientOptions;
  try {
    clientOptions = await deps.clientOptions(session);
  } catch (error) {
    if (error instanceof ExchangeRefusedError) {
      return textError(
        `Dodo Payments refused this connection: ${error.message}. The access was revoked, or MCP access is off for this mode. Connect again.`,
      );
    }
    throw error;
  }
  const trace = traceHeaders(meta);
  const run = await runExecute({
    code: typeof args?.['code'] === 'string' ? args['code'] : '',
    loader: deps.loader,
    clientOptions: {
      ...clientOptions,
      defaultHeaders: { ...clientOptions.defaultHeaders, ...trace },
    },
  });
  // A 403 that the code caught must not replace its result.
  if (!run.forbidden || !run.result.isError) return run.result;
  const scope = scopeForCall(run.forbidden);
  return scope ? scopeErrorResult(run.forbidden, origin, deps.profileUrl, scope) : run.result;
}

/** The SDK method search. It reads only the embedded index and never creates an API client. */
async function callSearch(args: Record<string, unknown> | undefined): Promise<CallToolResult> {
  const index = await ensureDocsIndex();
  const query = typeof args?.['query'] === 'string' ? args['query'] : '';
  const language = typeof args?.['language'] === 'string' ? args['language'] : 'typescript';
  const detail = typeof args?.['detail'] === 'string' ? args['detail'] : 'default';
  const { results } = index.search({ query, language, detail, maxResults: 10 });
  return asTextContentResult(results);
}

export function buildServer(session: McpCaller, deps: McpDeps, origin: string): Server {
  const server = new Server(SERVER_INFO, {
    capabilities: { tools: {} },
    instructions: SERVER_INSTRUCTIONS,
    cacheHints: { 'tools/list': { ttlMs: TOOLS_LIST_TTL_MS, cacheScope: 'private' } },
  });
  server.setRequestHandler('tools/list', async () => ({ tools: toolsFor(session) }));
  server.setRequestHandler('tools/call', async (request, ctx) => {
    const { name, arguments: args } = request.params;
    switch (name) {
      case 'execute':
        // `serveMcp` answers an unsigned `execute` with HTTP 401 before it gets here.
        return session === null ?
            textError('The execute tool needs sign-in. Connect to Dodo Payments, then call it again.')
          : callExecute(args, ctx.mcpReq._meta, session, deps, origin);
      case 'search':
        return callSearch(args);
      case 'search_docs':
        return callSearchDocs(args, deps.knowledge);
      case 'read_docs_page':
        return callReadDocsPage(args, deps.docs);
      case 'feedback':
        return callFeedback(args, session !== null);
      default:
        throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Unknown tool: ${name}`);
    }
  });
  return server;
}

/** True if a JSON-RPC message (or batch) of the body calls the `execute` tool. */
export function callsExecute(body: unknown): boolean {
  if (Array.isArray(body)) return body.some(callsExecute);
  if (typeof body !== 'object' || body === null) return false;
  const { method, params } = body as { method?: unknown; params?: unknown };
  return (
    method === 'tools/call' &&
    typeof params === 'object' &&
    params !== null &&
    (params as { name?: unknown }).name === 'execute'
  );
}

/** The challenge that makes an MCP client start sign-in (RFC 9728, section 5.1). */
export function signInChallenge(
  origin: string,
  description = 'This request needs an access token.',
): Response {
  return Response.json(
    { error: 'invalid_token', error_description: description },
    {
      status: 401,
      headers: {
        'www-authenticate': `Bearer realm="OAuth", resource_metadata="${origin}/.well-known/oauth-protected-resource${MCP_PATH}"`,
        ...CORS_HEADERS,
      },
    },
  );
}

/** The size bound of the MCP handler (`maxRequestBodySize`), applied to the body that the Worker reads. */
export const MAX_BODY_BYTES = 4 * 1024 * 1024;

/** The body of a request without a token, read once with a size bound. */
type UnsignedBody =
  { kind: 'too_large' } | { kind: 'json'; value: unknown } | { kind: 'other'; bytes: Uint8Array };

async function readUnsignedBody(request: Request): Promise<UnsignedBody> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > MAX_BODY_BYTES) return { kind: 'too_large' };
  const reader = request.body?.getReader();
  if (!reader) return { kind: 'other', bytes: new Uint8Array() };
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
    size += chunk.value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return { kind: 'too_large' };
    }
    chunks.push(chunk.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return { kind: 'json', value: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch (error) {
    // The MCP handler answers it with a parse error.
    console.warn('POST /mcp body is not JSON', error instanceof Error ? error.message : error);
    return { kind: 'other', bytes };
  }
}

function authInfoFor(session: McpSession): AuthInfo {
  return {
    token: session.token,
    clientId: session.clientId,
    scopes: session.scopes,
    ...(session.expiresAt !== undefined && { expiresAt: session.expiresAt }),
  };
}

/**
 * Serves one POST /mcp. `session` is the caller whose token is already checked, or `null` for a
 * request without a token: its `execute` call gets HTTP 401 so that the client starts sign-in.
 */
export async function serveMcp(request: Request, session: McpCaller, deps: McpDeps): Promise<Response> {
  const rejected = transportGate(request) ?? rebindingGate(request, deps.allowedHosts);
  if (rejected) return rejected;
  const origin = new URL(request.url).origin;
  let options: McpHandlerRequestOptions;
  let served = request;
  if (session === null) {
    const body = await readUnsignedBody(request);
    switch (body.kind) {
      case 'too_large':
        return Response.json(
          { jsonrpc: '2.0', error: { code: -32000, message: 'Request body too large.' }, id: null },
          { status: 413, headers: CORS_HEADERS },
        );
      case 'json':
        if (callsExecute(body.value)) return signInChallenge(origin, 'The execute tool needs sign-in.');
        options = { parsedBody: body.value };
        break;
      case 'other':
        // The body is already read: the handler gets the same bytes and answers the parse error.
        served = new Request(request, { body: body.bytes });
        options = {};
        break;
    }
  } else {
    options = { authInfo: authInfoFor(session) };
  }
  const handler = createMcpHandler(() => buildServer(session, deps, origin), {
    legacy: 'stateless',
    maxRequestBodySize: MAX_BODY_BYTES,
    onerror: (error) => console.error('MCP request failed', error),
  });
  const response = await handler.fetch(served, options);
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
