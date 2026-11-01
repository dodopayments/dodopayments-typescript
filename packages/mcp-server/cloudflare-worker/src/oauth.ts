import {
  OAuthAuthorizationServer,
  OAuthResourceServer,
  type OAuthHelpers,
  type OAuthResourceHandler,
} from '@cloudflare/workers-oauth-provider';
import {
  dodoAuthConfig,
  introspectMcpToken,
  isLegacyToken,
  requestMode,
  type DodoAuthConfig,
  type DodoAuthEnv,
  type DodoAuthProps,
} from './dodo-auth';

type ConsentHandler<E> = {
  fetch(
    request: Request,
    env: E & { OAUTH_PROVIDER: OAuthHelpers },
    ctx: ExecutionContext,
  ): Response | Promise<Response>;
};

// 0.x advertised the origin, /mcp and /sse separately. Keep all three registered:
// replacing them with one resource would invalidate existing grants on refresh.
// Construct per request so the workers.dev alias and localhost keep their own issuer.
export function makeOAuthHandler<E extends { OAUTH_KV: KVNamespace } & DodoAuthEnv, Props>(
  handlers: Readonly<Record<'/mcp' | '/sse', OAuthResourceHandler<E, Props>>>,
  consent: ConsentHandler<E>,
) {
  return {
    async fetch(request: Request, env: E, ctx: ExecutionContext): Promise<Response> {
      const { origin, pathname } = new URL(request.url);
      const authorizationServer = new OAuthAuthorizationServer<E>({
        issuer: origin,
        resources: [origin, `${origin}/mcp`, `${origin}/sse`],
        defaultResource: origin,
        legacyGrantResource: origin,
        authorizeEndpoint: '/authorize',
        tokenEndpoint: '/token',
        clientRegistrationEndpoint: '/register',
        // mcp-remote refreshes only after a 401, so retain the 24h access TTL to
        // avoid repeated browser prompts. Explicit undefined overrides the 30d
        // refresh / 90d registration defaults; existing sessions never expire.
        accessTokenTTL: 86400,
        refreshTokenTTL: undefined,
        clientRegistrationTTL: undefined,
      });

      const path = (['/mcp', '/sse'] as const).find(
        (route) =>
          pathname === route ||
          pathname.startsWith(`${route}/`) ||
          pathname === `/.well-known/oauth-protected-resource${route}`,
      );
      if (path || pathname === '/.well-known/oauth-protected-resource') {
        const handler = handlers[path ?? '/mcp'];
        // Origin-bound (including previously unbound) tokens cover both transports.
        // Use the origin resource host for those tokens, without rewriting audience.
        // Metadata documents are public and must describe the requested path whatever
        // token the client sends, so only transport requests are pre-validated. The
        // path-bound audience is tried first because that is what most clients hold.
        const isTransport = path !== undefined && !pathname.startsWith('/.well-known/');
        const bearer =
          isTransport ? request.headers.get('authorization')?.match(/^Bearer\s+(\S+)$/i)?.[1] : undefined;

        // With dodo-auth configured, the MCP resource of this origin belongs to dodo-auth. New
        // clients go there. Tokens of this Worker's own server keep working until they end.
        const dodo = dodoAuthConfig(env);
        if (dodo && path === '/mcp' && `${origin}/mcp` === dodo.mcpResource && !(bearer && isLegacyToken(bearer))) {
          return dodoResource(dodo, handlers['/mcp'], bearer, request, env, ctx);
        }
        const pathToken =
          bearer ? await authorizationServer.validateToken<Props>(`${origin}${path}`, bearer, env) : null;
        const originToken =
          bearer && !pathToken ? await authorizationServer.validateToken<Props>(origin, bearer, env) : null;
        const resource = originToken || !path ? origin : `${origin}${path}`;
        const host = new OAuthResourceServer<E, Props>({
          resourceMetadata: { resource, authorization_servers: [origin] },
          handler,
          validateToken: () => (audience, token) =>
            originToken && token === bearer ?
              Promise.resolve(originToken)
            : authorizationServer.validateToken<Props>(audience, token, env),
        });
        return host.fetch(request, env, ctx);
      }

      if (
        pathname === '/token' ||
        pathname === '/register' ||
        pathname === '/.well-known/oauth-authorization-server'
      ) {
        return authorizationServer.fetch(request, env, ctx);
      }
      return consent.fetch(request, { ...env, OAUTH_PROVIDER: authorizationServer.getOAuthApi(env) }, ctx);
    },
  };
}

/** Serves the MCP resource for a dodo-auth token, or the metadata and the 401 challenge without one. */
async function dodoResource<E, Props>(
  config: DodoAuthConfig,
  handler: OAuthResourceHandler<E, Props>,
  bearer: string | undefined,
  request: Request,
  env: E,
  ctx: ExecutionContext,
): Promise<Response> {
  let props: { dodoAuth: DodoAuthProps } | undefined;
  let expiresAt = 0;
  let scope: string[] = [];
  if (bearer) {
    let introspection;
    try {
      introspection = await introspectMcpToken(config, bearer);
    } catch (error) {
      console.error('dodo-auth introspection failed', error);
      return Response.json(
        { error: 'temporarily_unavailable', error_description: 'The authorization server is not available. Try again later.' },
        { status: 503, headers: { 'retry-after': '5' } },
      );
    }
    if (introspection) {
      const mode = requestMode(introspection, request.headers.get('dodo-mode'));
      if (typeof mode !== 'string') {
        return Response.json({ error: 'invalid_request', error_description: mode.error }, { status: 400 });
      }
      props = {
        dodoAuth: {
          token: bearer,
          mode,
          subject: introspection.sub ?? '',
          clientId: introspection.client_id ?? '',
          businessId: introspection.business_id ?? '',
        },
      };
      expiresAt = introspection.exp ?? 0;
      scope = (introspection.scope ?? '').split(' ').filter(Boolean);
    }
  }
  const host = new OAuthResourceServer<E, Props>({
    resourceMetadata: { resource: config.mcpResource, authorization_servers: [config.issuer] },
    handler,
    validateToken: () => async (_audience, token) =>
      props && token === bearer ?
        {
          props: props as Props,
          audience: config.mcpResource,
          expiresAt,
          scope,
          userId: props.dodoAuth.subject,
          clientId: props.dodoAuth.clientId,
        }
      : null,
  });
  return host.fetch(request, env, ctx);
}
