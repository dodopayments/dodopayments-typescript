import { home } from './app';
import { sentinelSink } from './feedback';
import { apiTokenFor, dodoAuthConfig, type DodoAuthConfig } from './dodo-auth';
import { serveMcp, signInChallenge, transportGate, type McpDeps } from './mcp';
import { authenticate, discoveryResponse } from './oauth';

const DEFAULT_PROFILE_URL = 'https://app.dodopayments.com/settings?tab=connected-apps';
// The custom domain of the Worker. The `*.workers.dev` names are also allowed.
const PRODUCTION_HOST = 'mcp.dodopayments.com';

function allowedHosts(env: Env): string[] {
  const hosts = [PRODUCTION_HOST];
  if (env.DODO_AUTH_MCP_RESOURCE) {
    try {
      hosts.push(new URL(env.DODO_AUTH_MCP_RESOURCE).hostname);
    } catch (error) {
      console.error('DODO_AUTH_MCP_RESOURCE is not a URL', error);
    }
  }
  return hosts;
}

function mcpDeps(env: Env, config: DodoAuthConfig): McpDeps {
  return {
    loader: env.LOADER,
    clientOptions: async (session) => ({
      bearerToken: await apiTokenFor(config, session.token, session.mode),
      environment: session.mode === 'live' ? 'live_mode' : 'test_mode',
    }),
    profileUrl: env.DODO_PROFILE_SETTINGS_URL ?? DEFAULT_PROFILE_URL,
    allowedHosts: allowedHosts(env),
    knowledge: env.KNOWLEDGE,
    docs: { fetch: (request) => fetch(request) },
    ...(env.MCP_FEEDBACK_URL &&
      env.MCP_FEEDBACK_SECRET && { feedback: sentinelSink(env.MCP_FEEDBACK_URL, env.MCP_FEEDBACK_SECRET) }),
    ...(env.FEEDBACK_LIMITER && { feedbackLimiter: env.FEEDBACK_LIMITER }),
  };
}

function isRemovedSsePath(pathname: string): boolean {
  return (
    pathname === '/sse' ||
    pathname.startsWith('/sse/') ||
    pathname === '/.well-known/oauth-protected-resource/sse'
  );
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    if (isRemovedSsePath(pathname)) {
      return new Response('Not found. The SSE transport was removed: use POST /mcp.', { status: 404 });
    }
    const gated = transportGate(request);
    if (gated) return gated;
    const config = dodoAuthConfig(env);
    if (pathname === '/mcp') {
      if (!config) {
        return Response.json(
          {
            error: 'temporarily_unavailable',
            error_description: 'Sign-in is not configured on this server.',
          },
          { status: 503 },
        );
      }
      if (!request.headers.has('authorization')) {
        // Sign-in is required by default: several clients (OpenCode, Cursor) only start OAuth when
        // connecting returns 401, and never after a 401 in the middle of a session.
        // `?auth=optional` opts in to the docs tools without sign-in, for clients that cannot do
        // OAuth. Its `execute` call still gets 401 (see serveMcp).
        if (url.searchParams.get('auth') !== 'optional') return signInChallenge(url.origin);
        return serveMcp(request, null, mcpDeps(env, config));
      }
      const session = await authenticate(request, config);
      if (session instanceof Response) return session;
      return serveMcp(request, session, mcpDeps(env, config));
    }
    return (await discoveryResponse(request, config)) ?? home.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
