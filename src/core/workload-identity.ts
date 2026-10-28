// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { DodoPayments } from '../client';
import type { RequestInit } from '../internal/builtin-types';
import { castToError } from '../internal/errors';
import { readEnv } from '../internal/utils/env';
import { loggerFor } from '../internal/utils/log';
import { sleep } from '../internal/utils/sleep';
import { safeJSON } from '../internal/utils/values';
import { APIConnectionError, APIError, DodoPaymentsError } from './error';

const TOKEN_PATH = '/workload-identity/token';
const REVOKE_PATH = '/workload-identity/token/revoke';
const IDENTITY_PROVIDER_ID_ENV = 'DODO_PAYMENTS_IDENTITY_PROVIDER_ID';
const IDENTITY_TOKEN_FILE_ENV = 'DODO_PAYMENTS_IDENTITY_TOKEN_FILE';
const KUBERNETES_TOKEN_PATH = '/var/run/secrets/tokens/dodo-token';
const REFRESH_WINDOW_MS = 300 * 1000;

/**
 * The information that the client gives to a subject token provider.
 */
export interface SubjectTokenContext {
  /**
   * The base URL of the client.
   */
  baseURL: string;

  /**
   * The default audience: the origin of the client base URL.
   */
  audience: string;

  /**
   * Sends an HTTP request with the fetch implementation, fetch options and timeout of the client.
   */
  fetch: (url: string, init?: RequestInit) => Promise<Response>;
}

/**
 * Returns the subject token (a JWT from your identity provider).
 * The client calls the provider before each token exchange.
 */
export type SubjectTokenProvider = (context: SubjectTokenContext) => string | Promise<string>;

export interface WorkloadIdentityOptions {
  /**
   * The ID of the workload identity provider (`wip_...`).
   *
   * Defaults to process.env['DODO_PAYMENTS_IDENTITY_PROVIDER_ID'].
   */
  identityProviderId?: string | undefined;

  /**
   * The source of the subject token. Use a helper from `DodoPayments.workloadIdentity`
   * or your own function.
   *
   * Defaults to `DodoPayments.workloadIdentity.auto()`.
   */
  provider?: SubjectTokenProvider | undefined;
}

export interface WorkloadIdentityResource {
  /**
   * Revokes the cached access token and clears the cache.
   * Does nothing if no access token is cached.
   */
  revoke(): Promise<void>;
}

type ResolvedOptions = { identityProviderId: string; provider: SubjectTokenProvider };

type CachedToken = { accessToken: string; expiresAt: number };

type TokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  expires_at?: string;
};

function configError(message: string): DodoPaymentsError {
  return new DodoPaymentsError(message);
}

/**
 * Resolves the `workloadIdentity` client option.
 *
 * Returns `undefined` when the client must use the bearer token.
 */
export function resolveOptions(
  bearerToken: string | null | undefined,
  options: WorkloadIdentityOptions | null | undefined,
): ResolvedOptions | undefined {
  if (options) {
    if (bearerToken != null) {
      throw configError(
        'The `bearerToken` and `workloadIdentity` client options are mutually exclusive. Give only one of them.',
      );
    }
    if (options.identityProviderId && options.provider) {
      return options as ResolvedOptions;
    }
    const identityProviderId = options.identityProviderId ?? readEnv(IDENTITY_PROVIDER_ID_ENV);
    if (!identityProviderId) {
      throw configError(
        `The \`workloadIdentity\` client option needs an \`identityProviderId\`. Give it, or set the ${IDENTITY_PROVIDER_ID_ENV} environment variable.`,
      );
    }
    return { identityProviderId, provider: options.provider ?? auto() };
  }
  if (bearerToken != null) {
    return undefined;
  }
  const identityProviderId = readEnv(IDENTITY_PROVIDER_ID_ENV);
  if (!identityProviderId) {
    return undefined;
  }
  const provider = detect();
  return provider ? { identityProviderId, provider } : undefined;
}

const caches = /* @__PURE__ */ new WeakMap<object, Map<string, TokenCache>>();

type TokenCache = { token?: CachedToken | undefined; inflight?: Promise<CachedToken> | undefined };

function cacheFor(options: ResolvedOptions, baseURL: string): TokenCache {
  let byURL = caches.get(options);
  if (!byURL) {
    byURL = new Map();
    caches.set(options, byURL);
  }
  let cache = byURL.get(baseURL);
  if (!cache) {
    cache = {};
    byURL.set(baseURL, cache);
  }
  return cache;
}

/**
 * Exchanges subject tokens for access tokens and caches the access token.
 * Clients that share the same options object share the cache.
 */
export class TokenManager implements WorkloadIdentityResource {
  #client: DodoPayments;
  #options: ResolvedOptions;

  constructor(client: DodoPayments, options: ResolvedOptions) {
    this.#client = client;
    this.#options = options;
  }

  get #cache(): TokenCache {
    return cacheFor(this.#options, this.#client.baseURL);
  }

  /**
   * Returns a valid access token. Concurrent calls share one token exchange.
   */
  async getToken(): Promise<string> {
    const cache = this.#cache;
    if (cache.token && cache.token.expiresAt - Date.now() > REFRESH_WINDOW_MS) {
      return cache.token.accessToken;
    }
    if (!cache.inflight) {
      cache.inflight = this.#exchange().then(
        (token) => {
          cache.token = token;
          cache.inflight = undefined;
          return token;
        },
        (err) => {
          cache.inflight = undefined;
          throw err;
        },
      );
    }
    return (await cache.inflight).accessToken;
  }

  /**
   * Clears the cache if it holds the access token of the given `Authorization` header value.
   */
  invalidate(authorization: string | null | undefined): void {
    const cache = this.#cache;
    if (cache.token && authorization === `Bearer ${cache.token.accessToken}`) {
      cache.token = undefined;
    }
  }

  async revoke(): Promise<void> {
    const cache = this.#cache;
    const token = cache.token;
    if (!token) {
      return;
    }
    cache.token = undefined;
    loggerFor(this.#client).debug('workload identity: revoking the access token');
    const response = await this.#post(REVOKE_PATH, {
      Authorization: `Bearer ${token.accessToken}`,
    });
    if (!response.ok) {
      throw await statusError(response);
    }
  }

  async #exchange(): Promise<CachedToken> {
    const client = this.#client;
    const subjectToken = await this.#options.provider(subjectTokenContext(client));
    const body = JSON.stringify({
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      subject_token: subjectToken,
      identity_provider_id: this.#options.identityProviderId,
    });
    loggerFor(client).debug('workload identity: exchanging the subject token for an access token');
    const response = await this.#post(TOKEN_PATH, { 'Content-Type': 'application/json' }, body);
    if (!response.ok) {
      throw await statusError(response);
    }
    const json = (await response.json()) as TokenResponse;
    const expiresAt = json.expires_at ? Date.parse(json.expires_at) : NaN;
    return {
      accessToken: json.access_token,
      expiresAt: Number.isNaN(expiresAt) ? Date.now() + (json.expires_in ?? 0) * 1000 : expiresAt,
    };
  }

  /**
   * Sends a POST request without the client `Authorization` header.
   * Retries connection errors and 5xx responses with the retry policy of the client, but never a 4xx response.
   */
  async #post(path: string, headers: Record<string, string>, body?: string): Promise<Response> {
    const client = this.#client;
    const url = client.buildURL(path, undefined);
    for (let attempt = 0; ; attempt++) {
      const retriesRemaining = client.maxRetries - attempt;
      const response = await client
        .fetchWithTimeout(
          url,
          {
            ...((client.fetchOptions as any) ?? {}),
            method: 'POST',
            headers: { Accept: 'application/json', ...headers },
            ...(body !== undefined && { body }),
          },
          client.timeout,
          new AbortController(),
        )
        .catch(castToError);
      if (response instanceof Error) {
        if (retriesRemaining > 0) {
          await sleep(retryDelayMillis(attempt));
          continue;
        }
        throw new APIConnectionError({ cause: response });
      }
      if (response.status >= 500 && retriesRemaining > 0) {
        await response.body?.cancel().catch(() => {});
        await sleep(retryDelayMillis(attempt));
        continue;
      }
      return response;
    }
  }
}

function retryDelayMillis(attempt: number): number {
  const sleepSeconds = Math.min(0.5 * Math.pow(2, attempt), 8.0);
  return sleepSeconds * (1 - Math.random() * 0.25) * 1000;
}

async function statusError(response: Response): Promise<APIError> {
  const errText = await response.text().catch((err: any) => castToError(err).message);
  const errJSON = safeJSON(errText) as any;
  return APIError.generate(response.status, errJSON, errJSON ? undefined : errText, response.headers);
}

function subjectTokenContext(client: DodoPayments): SubjectTokenContext {
  return {
    baseURL: client.baseURL,
    audience: new URL(client.baseURL).origin,
    fetch: (url, init) => client.fetchWithTimeout(url, init, client.timeout, new AbortController()),
  };
}

function nodeFS(): any {
  const process = (globalThis as any).process;
  return process?.getBuiltinModule?.('node:fs');
}

async function readTokenFile(path: string): Promise<string> {
  const fs = nodeFS();
  if (!fs) {
    throw configError(`Cannot read the token file ${path}: this runtime has no Node.js file system.`);
  }
  const token = String(await fs.promises.readFile(path, 'utf8')).trim();
  if (!token) {
    throw configError(`The token file ${path} is empty.`);
  }
  return token;
}

function fileExists(path: string): boolean {
  try {
    return Boolean(nodeFS()?.existsSync(path));
  } catch {
    return false;
  }
}

function requireEnv(name: string): string {
  const value = readEnv(name);
  if (!value) {
    throw configError(`The ${name} environment variable is missing or empty.`);
  }
  return value;
}

async function fetchText(response: Response, source: string): Promise<string> {
  if (!response.ok) {
    throw configError(`${source} returned status ${response.status}.`);
  }
  return (await response.text()).trim();
}

/**
 * GitHub Actions: requests an OIDC token from the Actions runtime.
 * The job needs the `id-token: write` permission.
 *
 * @param audience - Defaults to the origin of the client base URL.
 */
export function githubActions(audience?: string): SubjectTokenProvider {
  return async (context) => {
    const requestURL = requireEnv('ACTIONS_ID_TOKEN_REQUEST_URL');
    const requestToken = requireEnv('ACTIONS_ID_TOKEN_REQUEST_TOKEN');
    const url = `${requestURL}&audience=${encodeURIComponent(audience ?? context.audience)}`;
    const response = await context.fetch(url, {
      method: 'GET',
      headers: { Authorization: `bearer ${requestToken}`, Accept: 'application/json' },
    });
    if (!response.ok) {
      throw configError(`The GitHub Actions OIDC endpoint returned status ${response.status}.`);
    }
    const json = (await response.json()) as { value?: string };
    if (!json.value) {
      throw configError('The GitHub Actions OIDC endpoint returned no token.');
    }
    return json.value;
  };
}

/**
 * GitLab CI/CD: reads the ID token from an environment variable (see `id_tokens` in `.gitlab-ci.yml`).
 */
export function gitlab(envVar: string = 'DODO_PAYMENTS_ID_TOKEN'): SubjectTokenProvider {
  return () => requireEnv(envVar);
}

/**
 * Terraform Cloud: reads `TFC_WORKLOAD_IDENTITY_TOKEN_DODO` or `TFC_WORKLOAD_IDENTITY_TOKEN`.
 */
export function terraformCloud(): SubjectTokenProvider {
  return () => readEnv('TFC_WORKLOAD_IDENTITY_TOKEN_DODO') ?? requireEnv('TFC_WORKLOAD_IDENTITY_TOKEN');
}

/**
 * Google Cloud: requests an identity token from the metadata server.
 *
 * @param audience - Defaults to the origin of the client base URL.
 */
export function gcp(audience?: string): SubjectTokenProvider {
  return async (context) => {
    const url =
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity' +
      `?audience=${encodeURIComponent(audience ?? context.audience)}&format=full`;
    const response = await context.fetch(url, { method: 'GET', headers: { 'Metadata-Flavor': 'Google' } });
    return fetchText(response, 'The GCP metadata server');
  };
}

/**
 * Vercel: reads `VERCEL_OIDC_TOKEN`.
 */
export function vercel(): SubjectTokenProvider {
  return () => requireEnv('VERCEL_OIDC_TOKEN');
}

/**
 * Kubernetes: reads a projected service account token file before each exchange.
 */
export function kubernetes(path: string = KUBERNETES_TOKEN_PATH): SubjectTokenProvider {
  return () => readTokenFile(path);
}

/**
 * Reads the token from a file before each exchange.
 *
 * @param path - Defaults to process.env['DODO_PAYMENTS_IDENTITY_TOKEN_FILE'].
 */
export function file(path?: string): SubjectTokenProvider {
  const tokenPath = path ?? requireEnv(IDENTITY_TOKEN_FILE_ENV);
  return () => readTokenFile(tokenPath);
}

/**
 * AWS: wraps your function that returns a web identity token (for example from STS `GetWebIdentityToken`).
 */
export function aws(fn: () => string | Promise<string>): SubjectTokenProvider {
  return () => fn();
}

/**
 * A fixed subject token. Use it for tests.
 */
export function staticToken(token: string): SubjectTokenProvider {
  return () => token;
}

/**
 * Finds a subject token source from the environment, or returns `undefined`.
 */
export function detect(): SubjectTokenProvider | undefined {
  if (readEnv('ACTIONS_ID_TOKEN_REQUEST_URL') && readEnv('ACTIONS_ID_TOKEN_REQUEST_TOKEN')) {
    return githubActions();
  }
  if (readEnv('TFC_WORKLOAD_IDENTITY_TOKEN_DODO') || readEnv('TFC_WORKLOAD_IDENTITY_TOKEN')) {
    return terraformCloud();
  }
  const tokenFile = readEnv(IDENTITY_TOKEN_FILE_ENV);
  if (tokenFile) {
    return file(tokenFile);
  }
  if (fileExists(KUBERNETES_TOKEN_PATH)) {
    return kubernetes();
  }
  return undefined;
}

/**
 * Finds a subject token source from the environment, in this order: GitHub Actions,
 * Terraform Cloud, `DODO_PAYMENTS_IDENTITY_TOKEN_FILE`, and the Kubernetes token path.
 */
export function auto(): SubjectTokenProvider {
  const provider = detect();
  if (!provider) {
    throw configError(
      `Cannot find a workload identity token source. Give a \`provider\`, or set ${IDENTITY_TOKEN_FILE_ENV}.`,
    );
  }
  return provider;
}

/**
 * The subject token helpers, available as `DodoPayments.workloadIdentity`.
 */
export const helpers = {
  githubActions,
  gitlab,
  terraformCloud,
  gcp,
  vercel,
  kubernetes,
  file,
  aws,
  static: staticToken,
  auto,
};
