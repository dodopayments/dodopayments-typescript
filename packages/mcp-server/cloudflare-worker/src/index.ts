import { makeOAuthConsent } from './app';
// `agents` and `@modelcontextprotocol/sdk` versions must stay in sync with the
// pins/overrides in package.json. `agents` declares an exact peer on
// `@modelcontextprotocol/sdk` (older than our pin); the overrides force one copy.
// If they drift, npm installs a second copy under `agents/node_modules/`, and
// `initMcpServer`'s runtime `instanceof McpServer` check fails because the two
// `McpServer` classes are distinct constructors.
import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolRequest,
  type ListToolsResult,
  type ServerResult,
} from '@modelcontextprotocol/sdk/types.js';
import { makeOAuthHandler } from './oauth';
import { ClientOptions } from 'dodopayments';
import { McpOptions } from 'dodopayments-mcp/options';
import { initMcpServer, newMcpServer } from 'dodopayments-mcp/server';
import { configureLogger } from 'dodopayments-mcp/logger';
import { executeToolDescriptor, runExecute } from './execute-tool';

// Explicit booleans for all three MCP tool hints. The generated package sets only
// `readOnlyHint` on `search_docs` and nothing on `execute`; the OpenAI plugin
// directory refuses submission unless every tool carries all three.
// - search_docs reads the embedded docs index: read-only, no side effects.
// - execute runs arbitrary SDK code against the caller's account, so it can create,
//   refund, cancel or delete real resources in Dodo Payments.
const TOOL_HINTS: Record<
  string,
  { readOnlyHint: boolean; destructiveHint: boolean; openWorldHint: boolean }
> = {
  search_docs: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
  execute: { readOnlyHint: false, destructiveHint: true, openWorldHint: true },
};

type MCPProps = {
  clientProps: ClientOptions;
  clientConfig: McpOptions;
};

/**
 * The information displayed on the OAuth consent screen
 */
const serverConfig: ServerConfig = {
  orgName: 'Dodo Payments',
  instructionsUrl: undefined, // Set a url for where you show users how to get an API key
  logoUrl: undefined, // Set a custom logo url to appear during the OAuth flow
  clientProperties: [
    {
      key: 'bearerToken',
      label: 'API Key',
      description: 'Your Dodo Payments API key',
      required: true,
      default: undefined,
      placeholder: 'Enter your API key',
      type: 'password',
    },
    {
      key: 'environment',
      label: 'Environment',
      description: 'The environment to use for the client',
      required: false,
      default: 'live_mode',
      placeholder: 'live_mode',
      type: 'radio',
      options: [
        { label: 'Live Mode', value: 'live_mode' },
        { label: 'Test Mode', value: 'test_mode' },
      ],
    },
  ],
};

// `newMcpServer` fetches MCP server instructions from the Stainless API. In a
// Durable Object, that fetch happens inside `blockConcurrencyWhile`; if it
// hangs the DO is reset, and if it rejects the same thing happens. Race
// against a short timeout and catch any rejection so any failure mode lands
// on a fallback server constructed without instructions (the `initialize`
// response simply omits the `instructions` field, which is spec-allowed).
const INSTRUCTIONS_FETCH_TIMEOUT_MS = 5000;

function fallbackMcpServer(): McpServer {
  return new McpServer(
    { name: 'dodopayments_api', version: '2.53.0' },
    { capabilities: { tools: {}, logging: {} } },
  );
}

async function buildMcpServer(stainlessApiKey?: string): Promise<McpServer> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const fetched = newMcpServer({ stainlessApiKey });
    const timeout = new Promise<null>((resolve) => {
      timeoutId = setTimeout(() => resolve(null), INSTRUCTIONS_FETCH_TIMEOUT_MS);
    });

    const result = await Promise.race([fetched, timeout]);

    if (result != null) {
      return result;
    }
  } catch (error) {
    console.error('Failed to build MCP server from upstream instructions; using fallback', error);
  } finally {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  }

  return fallbackMcpServer();
}

export class MyMCP extends McpAgent<Env, unknown, MCPProps> {
  #resolveServer!: (server: McpServer) => void;
  #rejectServer!: (error: unknown) => void;
  server: Promise<McpServer> = new Promise<McpServer>((resolve, reject) => {
    this.#resolveServer = resolve;
    this.#rejectServer = reject;
  });

  async init() {
    try {
      if (this.props == null) {
        throw new Error('MCP props are not initialized');
      }

      configureLogger({ level: 'info', pretty: false });

      const server = await buildMcpServer(this.props.clientConfig?.stainlessApiKey);

      // `includeCodeTool: false` stops `dodopayments-mcp` from registering its own
      // `execute` tool (which would proxy code to the remote Stainless sandbox).
      // We register a self-hosted `execute` below that runs code in a Cloudflare
      // Worker Loader isolate instead. `docsSearchMode: 'local'` makes
      // `initMcpServer` build the embedded (no-fs) docs index `search_docs` needs.
      const mcpOptions: McpOptions = {
        ...this.props.clientConfig,
        includeCodeTool: false,
        docsSearchMode: 'local',
      };

      await initMcpServer({
        server,
        clientOptions: this.props.clientProps,
        mcpOptions,
      });

      this.#installExecuteTool(server, this.props.clientProps);

      this.#resolveServer(server);
    } catch (error) {
      this.#rejectServer(error);
      throw error;
    }
  }

  // `initMcpServer` installs the `tools/list` and `tools/call` handlers directly on
  // the low-level `Server`. `McpServer.registerTool` would throw here because that
  // handler already exists, so we instead re-install both handlers via the
  // last-write-wins `setRequestHandler`, capturing the package's handlers and
  // delegating to them for every tool except our self-hosted `execute`.
  #installExecuteTool(server: McpServer, clientProps: ClientOptions) {
    const raw = server.server;
    type InnerHandler = (request: unknown, extra: unknown) => Promise<ServerResult>;
    const handlers = (raw as unknown as { _requestHandlers: Map<string, InnerHandler> })._requestHandlers;
    const innerList = handlers.get('tools/list');
    const innerCall = handlers.get('tools/call');

    // Fail loudly at init rather than silently degrading at runtime: if a future
    // `@modelcontextprotocol/sdk` release renames `_requestHandlers`, these lookups
    // return undefined and we must not ship a server that drops `search_docs`.
    if (!innerList || !innerCall) {
      throw new Error(
        'Expected dodopayments-mcp to have installed tools/list and tools/call handlers. ' +
          'This usually means the @modelcontextprotocol/sdk internals changed; check version compatibility.',
      );
    }

    raw.setRequestHandler(ListToolsRequestSchema, async (request, extra): Promise<ServerResult> => {
      const base = (await innerList(request, extra)) as ListToolsResult;
      const tools = [...base.tools, executeToolDescriptor].map((tool) => ({
        ...tool,
        annotations: { ...tool.annotations, ...TOOL_HINTS[tool.name] },
      }));
      return { ...base, tools };
    });

    raw.setRequestHandler(
      CallToolRequestSchema,
      async (request: CallToolRequest, extra): Promise<ServerResult> => {
        if (request.params.name !== 'execute') {
          return innerCall(request, extra);
        }
        const code = String(request.params.arguments?.code ?? '');
        return runExecute({
          code,
          loader: this.env.LOADER,
          clientOptions: clientProps,
        });
      },
    );
  }
}

export type ServerConfig = {
  /**
   * The name of the company/project
   */
  orgName: string;

  /**
   * An optional company logo image
   */
  logoUrl?: string;

  /**
   * An optional URL with instructions for users to get an API key
   */
  instructionsUrl?: string;

  /**
   * Properties collected to initialize the client
   */
  clientProperties: ClientProperty[];
};

export type ClientProperty = {
  key: string;
  label: string;
  description?: string;
  required: boolean;
  default?: unknown;
  placeholder?: string;
  type: 'string' | 'number' | 'password' | 'select' | 'radio';
  options?: { label: string; value: string; description?: string }[];
};

// Export the OAuth handler as the default
export default makeOAuthHandler<Env, MCPProps>(
  {
    '/sse': MyMCP.serveSSE('/sse'), // legacy SSE
    '/mcp': MyMCP.serve('/mcp'), // Streaming HTTP
  },
  makeOAuthConsent(serverConfig),
);
