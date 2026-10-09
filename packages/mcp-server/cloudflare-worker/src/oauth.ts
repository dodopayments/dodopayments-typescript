import {
  OAuthAuthorizationServer,
  OAuthResourceServer,
  type OAuthHelpers,
  type OAuthResourceHandler,
} from '@cloudflare/workers-oauth-provider';

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
export function makeOAuthHandler<E extends { OAUTH_KV: KVNamespace }, Props>(
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
