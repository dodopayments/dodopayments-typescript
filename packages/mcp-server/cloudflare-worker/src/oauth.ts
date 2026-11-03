// The Worker is an OAuth resource server of dodo-auth. It has no authorization server of its own.
//
// - Protected resource metadata (RFC 9728) at the root path and at the `/mcp` path.
// - A copy of the authorization server metadata of dodo-auth (RFC 8414). The issuer stays dodo-auth.
// - `/authorize`, `/token` and `/register` send the client to the endpoints of dodo-auth.
// - `POST /mcp` needs a dodo-auth MCP token. The Worker introspects it.

import {
  introspectMcpToken,
  isLegacyToken,
  requestMode,
  type DodoAuthConfig,
  type DodoAuthProps,
} from './dodo-auth';
import { CORS_HEADERS } from './mcp';

const PRM_PATHS: ReadonlySet<string> = new Set([
  '/.well-known/oauth-protected-resource',
  '/.well-known/oauth-protected-resource/mcp',
]);
const AS_METADATA_PATH = '/.well-known/oauth-authorization-server';

/** The path on this host, and the field of the dodo-auth metadata that gives the target endpoint. */
const PASS_THROUGH: Readonly<Record<string, string>> = {
  '/authorize': 'authorization_endpoint',
  '/token': 'token_endpoint',
  '/register': 'registration_endpoint',
};

const METADATA_TTL_MS = 3_600_000;
/** After a failed fetch, the Worker uses its stale copy and tries again after this time. */
const METADATA_RETRY_MS = 60_000;
const METADATA_TIMEOUT_MS = 5_000;

const DISCOVERY_CORS: Record<string, string> = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, HEAD, OPTIONS',
  'access-control-allow-headers': '*',
  'access-control-max-age': '86400',
};

type Metadata = Record<string, unknown>;

/** The metadata copy of each issuer. `until` is the time of the next fetch. */
const metadataCopies = new Map<string, { metadata: Metadata; until: number }>();

function isRecord(value: unknown): value is Metadata {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function fetchMetadata(config: DodoAuthConfig): Promise<Metadata> {
  const response = await fetch(`${config.issuer}${AS_METADATA_PATH}`, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(METADATA_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`dodo-auth metadata returned ${response.status}`);
  }
  const body: unknown = await response.json();
  // RFC 8414, section 3.3: the issuer in the document must be the issuer that the client uses.
  if (!isRecord(body) || body['issuer'] !== config.issuer) {
    throw new Error('dodo-auth metadata does not have the configured issuer');
  }
  return body;
}

/**
 * The authorization server metadata of dodo-auth, kept for one hour. If dodo-auth is not
 * available, the stale copy is used. `fresh` is false for a stale copy.
 */
export async function authServerMetadata(
  config: DodoAuthConfig,
): Promise<{ metadata: Metadata; fresh: boolean } | undefined> {
  const copy = metadataCopies.get(config.issuer);
  if (copy && copy.until > Date.now()) return { metadata: copy.metadata, fresh: true };
  try {
    const metadata = await fetchMetadata(config);
    metadataCopies.set(config.issuer, { metadata, until: Date.now() + METADATA_TTL_MS });
    return { metadata, fresh: true };
  } catch (error) {
    console.error('dodo-auth metadata fetch failed', error);
    if (!copy) return undefined;
    metadataCopies.set(config.issuer, { metadata: copy.metadata, until: Date.now() + METADATA_RETRY_MS });
    return { metadata: copy.metadata, fresh: false };
  }
}

function oauthError(status: number, error: string, description: string, headers: HeadersInit = {}): Response {
  return Response.json(
    { error, error_description: description },
    { status, headers: { 'cache-control': 'no-store', ...DISCOVERY_CORS, ...headers } },
  );
}

function notConfigured(): Response {
  return oauthError(503, 'temporarily_unavailable', 'Sign-in is not configured on this server.');
}

function metadataUnavailable(): Response {
  return oauthError(
    502,
    'temporarily_unavailable',
    'The authorization server is not available. Try again later.',
    { 'retry-after': '30' },
  );
}

function protectedResourceMetadata(config: DodoAuthConfig): Response {
  return Response.json(
    {
      resource: config.mcpResource,
      authorization_servers: [config.issuer],
      bearer_methods_supported: ['header'],
    },
    { headers: { 'cache-control': 'public, max-age=3600', ...DISCOVERY_CORS } },
  );
}

async function metadataCopy(config: DodoAuthConfig): Promise<Response> {
  const result = await authServerMetadata(config);
  if (!result) return metadataUnavailable();
  return Response.json(result.metadata, {
    headers: { 'cache-control': `public, max-age=${result.fresh ? 3600 : 60}`, ...DISCOVERY_CORS },
  });
}

async function passThrough(request: Request, config: DodoAuthConfig, field: string): Promise<Response> {
  const result = await authServerMetadata(config);
  if (!result) return metadataUnavailable();
  const endpoint = result.metadata[field];
  if (typeof endpoint !== 'string') {
    return oauthError(404, 'invalid_request', 'The authorization server does not have this endpoint.');
  }
  const target = new URL(endpoint);
  target.search = new URL(request.url).search;
  // 307 keeps the method and the body of POST /token and POST /register. Clients do not
  // keep a 307, so a change of the dodo-auth endpoints takes effect when the copy expires.
  return new Response(null, {
    status: 307,
    headers: { location: target.toString(), 'cache-control': 'no-store', ...DISCOVERY_CORS },
  });
}

/**
 * The discovery documents and the pass-through endpoints. `undefined` means that the path is
 * not one of them.
 */
export async function discoveryResponse(
  request: Request,
  config: DodoAuthConfig | undefined,
): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);
  const field = PASS_THROUGH[pathname];
  const isDocument = PRM_PATHS.has(pathname) || pathname === AS_METADATA_PATH;
  if (!isDocument && field === undefined) return undefined;
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: DISCOVERY_CORS });
  }
  if (!config) return notConfigured();
  if (field !== undefined) return passThrough(request, config, field);
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { allow: 'GET, HEAD, OPTIONS', ...DISCOVERY_CORS } });
  }
  return PRM_PATHS.has(pathname) ? protectedResourceMetadata(config) : metadataCopy(config);
}

function challenge(request: Request, error?: { code: string; description: string }): Response {
  const metadataUrl = `${new URL(request.url).origin}/.well-known/oauth-protected-resource/mcp`;
  const params = [
    'realm="OAuth"',
    ...(error ? [`error="${error.code}"`, `error_description="${error.description}"`] : []),
    `resource_metadata="${metadataUrl}"`,
  ];
  return Response.json(
    {
      error: error?.code ?? 'invalid_token',
      error_description: error?.description ?? 'This request needs an access token.',
    },
    { status: 401, headers: { 'www-authenticate': `Bearer ${params.join(', ')}`, ...CORS_HEADERS } },
  );
}

/** The session of a request to `POST /mcp`, or the error response. */
export async function authenticate(
  request: Request,
  config: DodoAuthConfig,
): Promise<DodoAuthProps | Response> {
  const bearer = request.headers.get('authorization')?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!bearer) return challenge(request);
  // A token of the removed Worker authorization server. dodo-auth does not know it.
  if (isLegacyToken(bearer)) {
    return challenge(request, {
      code: 'invalid_token',
      description: 'This connection uses the old sign-in. Connect again.',
    });
  }
  let introspection;
  try {
    introspection = await introspectMcpToken(config, bearer);
  } catch (error) {
    console.error('dodo-auth introspection failed', error);
    return Response.json(
      {
        error: 'temporarily_unavailable',
        error_description: 'The authorization server is not available. Try again later.',
      },
      { status: 503, headers: { 'retry-after': '5', ...CORS_HEADERS } },
    );
  }
  if (!introspection) {
    return challenge(request, {
      code: 'invalid_token',
      description: 'The access token is not active for this server.',
    });
  }
  const mode = requestMode(introspection, request.headers.get('dodo-mode'));
  if (typeof mode !== 'string') {
    return Response.json(
      { error: 'invalid_request', error_description: mode.error },
      { status: 400, headers: CORS_HEADERS },
    );
  }
  return {
    token: bearer,
    mode,
    subject: introspection.sub ?? '',
    clientId: introspection.client_id ?? '',
    businessId: introspection.business_id ?? '',
    scopes: (introspection.scope ?? '').split(' ').filter(Boolean),
    ...(introspection.exp !== undefined && { expiresAt: introspection.exp }),
  };
}
