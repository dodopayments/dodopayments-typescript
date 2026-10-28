// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';
import { AuthenticationError, PermissionDeniedError } from 'dodopayments';

const baseURL = 'http://localhost:5000';
const tokenPath = '/workload-identity/token';
const revokePath = '/workload-identity/token/revoke';
const subjectToken = 'test-subject-token';
const identityProviderId = 'wip_test';

type RecordedCall = { path: string; method: string; headers: Headers; body: string | undefined };

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function tokenResponse(accessToken: string, expiresIn: number): Response {
  return jsonResponse(200, {
    access_token: accessToken,
    issued_token_type: 'urn:ietf:params:oauth:token-type:access_token',
    token_type: 'Bearer',
    expires_in: expiresIn,
    scope: 'payments:read',
  });
}

/**
 * A mock server: `route` returns the response for each request. The test records all requests.
 */
function mockServer(route: (call: RecordedCall, calls: RecordedCall[]) => Response | Promise<Response>) {
  const calls: RecordedCall[] = [];
  const fetch = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
    const call: RecordedCall = {
      path: new URL(String(url)).pathname,
      method: init?.method ?? 'GET',
      headers: new Headers(init?.headers),
      body: typeof init?.body === 'string' ? init.body : undefined,
    };
    calls.push(call);
    return route(call, calls);
  };
  const count = (path: string) => calls.filter((c) => c.path === path).length;
  return { calls, fetch, count };
}

function makeClient(fetch: (url: string | URL | Request, init?: RequestInit) => Promise<Response>) {
  return new DodoPayments({
    baseURL,
    fetch,
    workloadIdentity: { identityProviderId, provider: DodoPayments.workloadIdentity.static(subjectToken) },
  });
}

describe('workload identity', () => {
  let accessTokenCounter = 0;
  const nextAccessToken = () => `access-token-${++accessTokenCounter}`;

  test('exchanges the subject token, then sends the access token as a bearer token', async () => {
    const server = mockServer((call) =>
      call.path === tokenPath ? tokenResponse('access-token-a', 3600) : jsonResponse(200, { ok: true }),
    );
    const client = makeClient(server.fetch);

    await client.get('/foo');

    expect(server.calls.map((c) => c.path)).toEqual([tokenPath, '/foo']);
    const [exchange, apiCall] = server.calls;
    expect(exchange!.method).toEqual('POST');
    expect(exchange!.headers.get('content-type')).toEqual('application/json');
    expect(exchange!.headers.has('authorization')).toBe(false);
    expect(exchange!.body).toEqual(
      JSON.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        subject_token: subjectToken,
        identity_provider_id: identityProviderId,
      }),
    );
    expect(apiCall!.headers.get('authorization')).toEqual('Bearer access-token-a');
  });

  test('concurrent requests share one token exchange', async () => {
    const server = mockServer((call) =>
      call.path === tokenPath ? tokenResponse(nextAccessToken(), 3600) : jsonResponse(200, { ok: true }),
    );
    const client = makeClient(server.fetch);

    await Promise.all([client.get('/foo'), client.get('/bar')]);

    expect(server.count(tokenPath)).toEqual(1);
    expect(server.count('/foo')).toEqual(1);
    expect(server.count('/bar')).toEqual(1);
  });

  test('exchanges again when 5 minutes or less remain on the access token', async () => {
    const server = mockServer((call) =>
      call.path === tokenPath ? tokenResponse(nextAccessToken(), 200) : jsonResponse(200, { ok: true }),
    );
    const client = makeClient(server.fetch);

    await client.get('/foo');
    await client.get('/foo');

    expect(server.count(tokenPath)).toEqual(2);
  });

  test('uses the cached access token while more than 5 minutes remain', async () => {
    const server = mockServer((call) =>
      call.path === tokenPath ? tokenResponse(nextAccessToken(), 3600) : jsonResponse(200, { ok: true }),
    );
    const client = makeClient(server.fetch);

    await client.get('/foo');
    await client.get('/foo');

    expect(server.count(tokenPath)).toEqual(1);
  });

  test('an API 401 causes one new exchange and one retry', async () => {
    const server = mockServer((call, calls) => {
      if (call.path === tokenPath) return tokenResponse(nextAccessToken(), 3600);
      return calls.filter((c) => c.path === '/foo').length === 1 ?
          jsonResponse(401, { message: 'unauthorized' })
        : jsonResponse(200, { ok: true });
    });
    const client = makeClient(server.fetch);

    await expect(client.get('/foo')).resolves.toEqual({ ok: true });

    expect(server.count(tokenPath)).toEqual(2);
    expect(server.count('/foo')).toEqual(2);
    const [first, second] = server.calls.filter((c) => c.path === '/foo');
    expect(first!.headers.get('authorization')).not.toEqual(second!.headers.get('authorization'));
  });

  test('a second API 401 is returned to the caller', async () => {
    const server = mockServer((call) =>
      call.path === tokenPath ?
        tokenResponse(nextAccessToken(), 3600)
      : jsonResponse(401, { message: 'unauthorized' }),
    );
    const client = makeClient(server.fetch);

    await expect(client.get('/foo')).rejects.toThrow(AuthenticationError);

    expect(server.count(tokenPath)).toEqual(2);
    expect(server.count('/foo')).toEqual(2);
  });

  test('bearerToken and workloadIdentity together are a configuration error', () => {
    expect(
      () =>
        new DodoPayments({
          baseURL,
          bearerToken: 'My Bearer Token',
          workloadIdentity: { identityProviderId, provider: () => subjectToken },
        }),
    ).toThrow(/mutually exclusive/);
  });

  test('an exchange 403 invalid_grant is a PermissionDeniedError with the description', async () => {
    const server = mockServer(() =>
      jsonResponse(403, { error: 'invalid_grant', error_description: 'no rule matches the token claims' }),
    );
    const client = makeClient(server.fetch);

    const err: any = await client.get('/foo').catch((e) => e);

    expect(err).toBeInstanceOf(PermissionDeniedError);
    expect(err.status).toEqual(403);
    expect(err.error).toEqual({
      error: 'invalid_grant',
      error_description: 'no rule matches the token claims',
    });
    expect(err.message).toContain('invalid_grant');
    expect(err.message).toContain('no rule matches the token claims');
    expect(server.count(tokenPath)).toEqual(1);
    expect(server.count('/foo')).toEqual(0);
  });

  test('revoke() sends the access token to the revoke endpoint and clears the cache', async () => {
    const server = mockServer((call) => {
      if (call.path === tokenPath) return tokenResponse(nextAccessToken(), 3600);
      if (call.path === revokePath) return new Response(null, { status: 204 });
      return jsonResponse(200, { ok: true });
    });
    const client = makeClient(server.fetch);

    await client.workloadIdentity.revoke();
    expect(server.calls).toEqual([]);

    await client.get('/foo');
    const used = server.calls.find((c) => c.path === '/foo')!.headers.get('authorization');
    await client.workloadIdentity.revoke();

    const revoke = server.calls.find((c) => c.path === revokePath)!;
    expect(revoke.method).toEqual('POST');
    expect(revoke.headers.get('authorization')).toEqual(used);

    await client.get('/foo');
    expect(server.count(tokenPath)).toEqual(2);
  });

  test('reads the identity provider ID from the environment', async () => {
    const env = process.env;
    process.env = { ...env, DODO_PAYMENTS_IDENTITY_PROVIDER_ID: 'wip_from_env' };
    try {
      const server = mockServer((call) =>
        call.path === tokenPath ? tokenResponse(nextAccessToken(), 3600) : jsonResponse(200, { ok: true }),
      );
      const client = new DodoPayments({
        baseURL,
        fetch: server.fetch,
        workloadIdentity: { provider: () => subjectToken },
      });

      await client.get('/foo');

      expect(JSON.parse(server.calls[0]!.body!).identity_provider_id).toEqual('wip_from_env');
    } finally {
      process.env = env;
    }
  });

  test('clients made with withOptions share the token cache', async () => {
    const server = mockServer((call) =>
      call.path === tokenPath ? tokenResponse(nextAccessToken(), 3600) : jsonResponse(200, { ok: true }),
    );
    const client = makeClient(server.fetch);

    await client.get('/foo');
    await client.withOptions({ timeout: 1000 }).get('/foo');

    expect(server.count(tokenPath)).toEqual(1);
  });
});

describe('workload identity vercel()', () => {
  const vercelTokenURL = 'https://oidc.vercel.com/~token';

  function vercelServer(vercelResponse: () => Response) {
    const calls: { url: string; headers: Headers; body: string | undefined }[] = [];
    const fetch = async (url: string | URL | Request, init?: RequestInit): Promise<Response> => {
      calls.push({
        url: String(url),
        headers: new Headers(init?.headers),
        body: typeof init?.body === 'string' ? init.body : undefined,
      });
      if (String(url) === vercelTokenURL) {
        return vercelResponse();
      }
      return new URL(String(url)).pathname === tokenPath ?
          tokenResponse('access-token-v', 3600)
        : jsonResponse(200, { ok: true });
    };
    const client = new DodoPayments({
      baseURL: `${baseURL}/v1`,
      fetch,
      maxRetries: 0,
      workloadIdentity: { identityProviderId, provider: DodoPayments.workloadIdentity.vercel() },
    });
    return { calls, client };
  }

  test('exchanges the Vercel token for a token with the default audience', async () => {
    const env = process.env;
    process.env = { ...env, VERCEL_OIDC_TOKEN: 'vercel-base-token' };
    try {
      const { calls, client } = vercelServer(() =>
        jsonResponse(200, { token: 'vercel-dodo-token', expiry: 1 }),
      );
      await client.get('/foo');

      expect(calls[0]!.url).toEqual(vercelTokenURL);
      expect(calls[0]!.headers.get('content-type')).toEqual('application/json');
      expect(JSON.parse(calls[0]!.body!)).toEqual({
        token: 'vercel-base-token',
        aud: 'http://localhost:5000',
      });
      expect(JSON.parse(calls[1]!.body!).subject_token).toEqual('vercel-dodo-token');
    } finally {
      process.env = env;
    }
  });

  test('a non-2xx response from Vercel is an error without the token', async () => {
    const env = process.env;
    process.env = { ...env, VERCEL_OIDC_TOKEN: 'vercel-base-token' };
    try {
      const { client } = vercelServer(() => jsonResponse(400, { error: 'invalid_request' }));
      const err = await client.get('/foo').catch((e: unknown) => e);
      expect(err).toBeInstanceOf(Error);
      expect(String(err)).toContain('status 400');
      expect(String(err)).not.toContain('vercel-base-token');
    } finally {
      process.env = env;
    }
  });
});
