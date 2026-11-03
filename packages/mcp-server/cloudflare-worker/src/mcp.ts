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
  type Tool,
} from '@modelcontextprotocol/server';
import DodoPayments, { type ClientOptions } from 'dodopayments';
import docsSearch, { setLocalSearch } from 'dodopayments-mcp/docs-search-tool';
import { getInstructions } from 'dodopayments-mcp/instructions';
import { LocalDocsSearch } from 'dodopayments-mcp/local-docs-search';
import type { DodoAuthProps } from './dodo-auth';
import { ExchangeRefusedError } from './dodo-auth';
import { executeToolDescriptor, runExecute, type ForbiddenCall } from './execute-tool';

export const SERVER_INFO = { name: 'dodopayments_api', version: '2.61.1' }; // x-release-please-version

/** The caller of one MCP request: a dodo-auth MCP token after the token check. */
export type McpSession = DodoAuthProps;

export interface McpDeps {
  loader: WorkerLoader;
  /** The SDK options for the `execute` tool. A dodo-auth session gets them from the token exchange. */
  clientOptions: (session: McpSession) => Promise<ClientOptions>;
  /** The page where the user changes the scopes of a connection. */
  profileUrl: string;
  /** Host names that this deployment serves, in addition to the loopback names. */
  allowedHosts: readonly string[];
}

const TOOLS_LIST_TTL_MS = 300_000;
const INSTRUCTIONS_TIMEOUT_MS = 3_000;
const INSTRUCTIONS_RETRY_MS = 300_000;
const MCP_PATH = '/mcp';

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

let docsIndex: Promise<void> | undefined;

/** The embedded docs index is built once for each isolate, at the first `search_docs` call. */
function ensureDocsIndex(): Promise<void> {
  docsIndex ??= LocalDocsSearch.create().then(setLocalSearch, (error: unknown) => {
    docsIndex = undefined;
    throw error;
  });
  return docsIndex;
}

let instructions: { value: string | undefined; until: number } | undefined;

/** The server instructions come from the Stainless API. A failure gives no instructions, which is valid. */
async function serverInstructions(): Promise<string | undefined> {
  if (instructions && instructions.until > Date.now()) return instructions.value;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<undefined>((resolve) => {
      timeoutId = setTimeout(() => resolve(undefined), INSTRUCTIONS_TIMEOUT_MS);
    });
    const value = await Promise.race([getInstructions({}), timeout]);
    instructions = {
      value,
      until: value === undefined ? Date.now() + INSTRUCTIONS_RETRY_MS : Number.POSITIVE_INFINITY,
    };
    return value;
  } catch (error) {
    console.error('Failed to fetch the MCP server instructions', error);
    instructions = { value: undefined, until: Date.now() + INSTRUCTIONS_RETRY_MS };
    return undefined;
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
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
  description: string,
  annotations: Tool['annotations'],
): Tool {
  const { properties, required } = tool.inputSchema;
  return {
    name: tool.name,
    description,
    inputSchema: {
      type: 'object',
      ...(properties !== undefined && { properties: jsonObject(properties) }),
      ...(required !== undefined && { required }),
    },
    annotations,
  };
}

/** The tools for the grant of this request. The order is fixed. */
export function toolsFor(session: McpSession): Tool[] {
  const write = canWrite(session);
  const { scopes } = session;
  const grantLine = `This connection can use these scopes: ${scopes.length > 0 ? scopes.join(', ') : 'none'}. A call that needs a different scope fails.`;
  return [
    v2Tool(executeToolDescriptor, `${executeToolDescriptor.description ?? ''}\n\n${grantLine}`, {
      readOnlyHint: !write,
      destructiveHint: write,
      idempotentHint: false,
      openWorldHint: true,
    }),
    v2Tool(docsSearch.tool, docsSearch.tool.description ?? '', {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    }),
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

async function callSearchDocs(args: Record<string, unknown> | undefined): Promise<CallToolResult> {
  await ensureDocsIndex();
  // The handler type asks for an SDK client, but `search_docs` reads only the embedded index.
  const client = new DodoPayments({ bearerToken: 'search-docs-has-no-api-access' });
  return docsSearch.handler({ reqContext: { client }, args });
}

export function buildServer(
  session: McpSession,
  deps: McpDeps,
  origin: string,
  instructionsText: string | undefined,
): Server {
  const server = new Server(SERVER_INFO, {
    capabilities: { tools: {} },
    ...(instructionsText !== undefined && { instructions: instructionsText }),
    cacheHints: { 'tools/list': { ttlMs: TOOLS_LIST_TTL_MS, cacheScope: 'private' } },
  });
  server.setRequestHandler('tools/list', async () => ({ tools: toolsFor(session) }));
  server.setRequestHandler('tools/call', async (request, ctx) => {
    const { name, arguments: args } = request.params;
    if (name === 'execute') return callExecute(args, ctx.mcpReq._meta, session, deps, origin);
    if (name === 'search_docs') return callSearchDocs(args);
    throw new ProtocolError(ProtocolErrorCode.InvalidParams, `Unknown tool: ${name}`);
  });
  return server;
}

function authInfoFor(session: McpSession): AuthInfo {
  return {
    token: session.token,
    clientId: session.clientId,
    scopes: session.scopes,
    ...(session.expiresAt !== undefined && { expiresAt: session.expiresAt }),
  };
}

/** Serves one POST /mcp for a caller whose token is already checked. */
export async function serveMcp(request: Request, session: McpSession, deps: McpDeps): Promise<Response> {
  const rejected = transportGate(request) ?? rebindingGate(request, deps.allowedHosts);
  if (rejected) return rejected;
  const origin = new URL(request.url).origin;
  const instructionsText = await serverInstructions();
  const handler = createMcpHandler(() => buildServer(session, deps, origin, instructionsText), {
    legacy: 'stateless',
    onerror: (error) => console.error('MCP request failed', error),
  });
  const response = await handler.fetch(request, { authInfo: authInfoFor(session) });
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
