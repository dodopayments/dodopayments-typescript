import type { OAuthResourceHandler } from '@cloudflare/workers-oauth-provider';
import type { ClientOptions } from 'dodopayments';
import { makeOAuthConsent } from './app';
import { apiTokenFor, dodoAuthConfig, type DodoAuthProps } from './dodo-auth';
import { serveMcp, transportGate, type McpSession } from './mcp';
import { makeOAuthHandler } from './oauth';

/** A grant of this Worker's own OAuth server: the API key that the user pasted on the consent page. */
type LegacyProps = { clientProps: ClientOptions };

/** A dodo-auth token. The API token comes from the exchange on each tool call. */
type DodoProps = { dodoAuth: DodoAuthProps };

export type MCPProps = LegacyProps | DodoProps;

const DEFAULT_PROFILE_URL = 'https://app.dodopayments.com';
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

function sessionFor(props: MCPProps): McpSession {
  if ('dodoAuth' in props) {
    return { kind: 'dodo', ...props.dodoAuth };
  }
  return { kind: 'api-key', clientOptions: props.clientProps };
}

async function clientOptionsFor(env: Env, session: McpSession): Promise<ClientOptions> {
  if (session.kind === 'api-key') return session.clientOptions;
  const config = dodoAuthConfig(env);
  if (!config) {
    throw new Error('dodo-auth is not configured on this Worker');
  }
  return {
    bearerToken: await apiTokenFor(config, session.token, session.mode),
    environment: session.mode === 'live' ? 'live_mode' : 'test_mode',
  };
}

const mcpHandler: OAuthResourceHandler<Env, MCPProps> = {
  fetch(request, env, ctx) {
    return serveMcp(request, sessionFor(ctx.props), {
      loader: env.LOADER,
      clientOptions: (session) => clientOptionsFor(env, session),
      profileUrl: env.DODO_PROFILE_SETTINGS_URL ?? DEFAULT_PROFILE_URL,
      allowedHosts: allowedHosts(env),
    });
  },
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

const oauth = makeOAuthHandler<Env, MCPProps>(mcpHandler, makeOAuthConsent(serverConfig));

function isRemovedSsePath(pathname: string): boolean {
  return (
    pathname === '/sse' ||
    pathname.startsWith('/sse/') ||
    pathname === '/.well-known/oauth-protected-resource/sse'
  );
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (isRemovedSsePath(pathname)) {
      return new Response('Not found. The SSE transport was removed: use POST /mcp.', { status: 404 });
    }
    return transportGate(request) ?? oauth.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
