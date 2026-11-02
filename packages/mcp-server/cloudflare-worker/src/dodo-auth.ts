// Tokens from the Dodo Payments authorization server (dodo-auth).
//
// The Worker never sends a dodo-auth MCP token to the API (no token passthrough). It
// introspects the MCP token, then exchanges it (RFC 8693) for a short API token of the
// mode of the request. All settings are optional: without them, only the legacy
// API-key tokens of this Worker work.

export type DodoMode = 'test' | 'live';

export interface DodoAuthEnv {
  DODO_AUTH_ISSUER?: string;
  DODO_AUTH_MCP_RESOURCE?: string;
  DODO_AUTH_API_RESOURCE_TEST?: string;
  DODO_AUTH_API_RESOURCE_LIVE?: string;
  MCP_WORKER_CLIENT_SECRET?: string;
}

export interface DodoAuthConfig {
  issuer: string;
  mcpResource: string;
  apiResources: Record<DodoMode, string>;
  clientSecret: string;
}

/** The session props of a dodo-auth token. The `execute` tool exchanges `token` on each call. */
export interface DodoAuthProps {
  token: string;
  mode: DodoMode;
  subject: string;
  clientId: string;
  businessId: string;
  scopes: string[];
  /** Seconds since the epoch. */
  expiresAt?: number;
}

export interface Introspection {
  active: boolean;
  aud?: string | string[];
  exp?: number;
  sub?: string;
  client_id?: string;
  scope?: string;
  business_id?: string;
  mode?: DodoMode;
}

const CLIENT_ID = 'mcp_worker';
const TOKEN_EXCHANGE = 'urn:ietf:params:oauth:grant-type:token-exchange';
const ACCESS_TOKEN_TYPE = 'urn:ietf:params:oauth:token-type:access_token';
const INTROSPECTION_CACHE_MS = 30_000;
const EXCHANGE_MARGIN_MS = 30_000;
const CACHE_LIMIT = 1000;
const TIMEOUT_MS = 5_000;

function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value[end - 1] === '/') end -= 1;
  return value.slice(0, end);
}

export function dodoAuthConfig(env: DodoAuthEnv): DodoAuthConfig | undefined {
  const {
    DODO_AUTH_ISSUER,
    DODO_AUTH_MCP_RESOURCE,
    DODO_AUTH_API_RESOURCE_TEST,
    DODO_AUTH_API_RESOURCE_LIVE,
  } = env;
  const secret = env.MCP_WORKER_CLIENT_SECRET;
  if (
    !DODO_AUTH_ISSUER ||
    !DODO_AUTH_MCP_RESOURCE ||
    !DODO_AUTH_API_RESOURCE_TEST ||
    !DODO_AUTH_API_RESOURCE_LIVE ||
    !secret
  ) {
    return undefined;
  }
  return {
    issuer: trimTrailingSlashes(DODO_AUTH_ISSUER),
    mcpResource: DODO_AUTH_MCP_RESOURCE,
    apiResources: { test: DODO_AUTH_API_RESOURCE_TEST, live: DODO_AUTH_API_RESOURCE_LIVE },
    clientSecret: secret,
  };
}

/** A token of this Worker's own authorization server has the form `user:grant:secret`. */
export function isLegacyToken(token: string): boolean {
  return token.includes(':');
}

function basicAuth(config: DodoAuthConfig): string {
  return `Basic ${btoa(`${encodeURIComponent(CLIENT_ID)}:${encodeURIComponent(config.clientSecret)}`)}`;
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** A small cache for one isolate. The key is a hash, so the cache keeps no token. */
class ExpiringCache<T> {
  readonly #entries = new Map<string, { value: T; until: number }>();

  get(key: string): T | undefined {
    const entry = this.#entries.get(key);
    if (!entry) return undefined;
    if (entry.until <= Date.now()) {
      this.#entries.delete(key);
      return undefined;
    }
    return entry.value;
  }

  set(key: string, value: T, until: number): void {
    if (this.#entries.size >= CACHE_LIMIT) {
      const oldest = this.#entries.keys().next().value;
      if (oldest !== undefined) this.#entries.delete(oldest);
    }
    this.#entries.set(key, { value, until });
  }
}

const introspections = new ExpiringCache<Introspection>();
const exchanges = new ExpiringCache<string>();

async function postForm(
  config: DodoAuthConfig,
  path: string,
  fields: Record<string, string>,
): Promise<Response> {
  return fetch(`${config.issuer}${path}`, {
    method: 'POST',
    headers: {
      authorization: basicAuth(config),
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
    body: new URLSearchParams(fields),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

/**
 * The introspection of an MCP token. `null` means that the token is not an active token for
 * the MCP resource. A failure of dodo-auth throws, so the caller answers 503, not 401.
 */
export async function introspectMcpToken(
  config: DodoAuthConfig,
  token: string,
): Promise<Introspection | null> {
  const key = await sha256(token);
  const cached = introspections.get(key);
  if (cached) return cached.active ? cached : null;

  const response = await postForm(config, '/oauth2/introspect', { token });
  if (!response.ok) {
    throw new Error(`dodo-auth introspection returned ${response.status}`);
  }
  const body = (await response.json()) as Introspection;
  const audiences =
    Array.isArray(body.aud) ? body.aud
    : body.aud ? [body.aud]
    : [];
  const nowSeconds = Math.floor(Date.now() / 1000);
  const active =
    body.active === true &&
    audiences.includes(config.mcpResource) &&
    typeof body.exp === 'number' &&
    body.exp > nowSeconds &&
    typeof body.sub === 'string' &&
    typeof body.client_id === 'string' &&
    typeof body.business_id === 'string';
  const result: Introspection = active ? body : { active: false };
  const until =
    active ?
      Math.min(Date.now() + INTROSPECTION_CACHE_MS, (body.exp ?? 0) * 1000)
    : Date.now() + INTROSPECTION_CACHE_MS;
  introspections.set(key, result, until);
  return active ? result : null;
}

/**
 * The mode of a request. A grant with one mode gives its mode in the introspection. A CLI grant
 * with two modes needs the `Dodo-Mode` header. A header that names a different mode is an error.
 */
export function requestMode(
  introspection: Introspection,
  header: string | null,
): DodoMode | { error: string } {
  const requested = header?.trim().toLowerCase();
  if (requested !== undefined && requested !== '' && requested !== 'test' && requested !== 'live') {
    return { error: 'The Dodo-Mode header must be test or live.' };
  }
  if (introspection.mode) {
    if (requested && requested !== introspection.mode) {
      return { error: `This connection has access to ${introspection.mode} mode only.` };
    }
    return introspection.mode;
  }
  if (requested === 'test' || requested === 'live') {
    return requested;
  }
  return {
    error:
      'This connection has access to test mode and live mode. Send the Dodo-Mode header with test or live.',
  };
}

export class ExchangeRefusedError extends Error {
  override readonly name = 'ExchangeRefusedError';
}

/** An API token for the mode, from the exchange. It is kept until 30 seconds before it expires. */
export async function apiTokenFor(config: DodoAuthConfig, mcpToken: string, mode: DodoMode): Promise<string> {
  const key = `${await sha256(mcpToken)}:${mode}`;
  const cached = exchanges.get(key);
  if (cached) return cached;

  const response = await postForm(config, '/oauth2/token', {
    grant_type: TOKEN_EXCHANGE,
    subject_token: mcpToken,
    subject_token_type: ACCESS_TOKEN_TYPE,
    resource: config.apiResources[mode],
  });
  const body = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };
  if (response.status >= 400 && response.status < 500) {
    throw new ExchangeRefusedError(
      body.error_description ?? body.error ?? `the exchange returned ${response.status}`,
    );
  }
  if (!response.ok || typeof body.access_token !== 'string' || typeof body.expires_in !== 'number') {
    throw new Error(`dodo-auth token exchange returned ${response.status}`);
  }
  const until = Date.now() + body.expires_in * 1000 - EXCHANGE_MARGIN_MS;
  if (until > Date.now()) {
    exchanges.set(key, body.access_token, until);
  }
  return body.access_token;
}
