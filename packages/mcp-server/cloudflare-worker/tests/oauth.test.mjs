import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';

// Bundle just the OAuth adapter: no Workers runtime or production credentials needed.
async function loadBundle(entry) {
  const bundled = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    plugins: [
      {
        name: 'workers-runtime',
        setup(plugin) {
          plugin.onResolve({ filter: /^cloudflare:workers$/ }, () => ({
            path: 'workers',
            namespace: 'fixture',
          }));
          plugin.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({
            contents: 'export class WorkerEntrypoint {}',
          }));
        },
      },
    ],
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
}
const { makeOAuthHandler } = await loadBundle('src/oauth.ts');
const { default: LegacyOAuthProvider } = await loadBundle(
  'node_modules/oauth-provider-v0/dist/oauth-provider.js',
);
const origin = 'https://mcp.example.com';
const ctx = { waitUntil() {} };

class MemoryKV {
  entries = new Map();
  async put(key, value, options = {}) {
    this.entries.set(key, {
      value,
      metadata: options.metadata,
      expiration:
        options.expiration ??
        (options.expirationTtl ? Math.floor(Date.now() / 1000) + options.expirationTtl : undefined),
    });
  }
  async get(key, type) {
    const entry = this.entries.get(key);
    if (!entry || (entry.expiration && entry.expiration <= Date.now() / 1000)) return null;
    return type === 'json' || type?.type === 'json' ? JSON.parse(entry.value) : entry.value;
  }
  async delete(key) {
    this.entries.delete(key);
  }
  async list({ prefix = '' } = {}) {
    return {
      keys: [...this.entries]
        .filter(([name]) => name.startsWith(prefix))
        .map(([name, entry]) => ({ name, metadata: entry.metadata })),
      list_complete: true,
      cursor: '',
    };
  }
}

const consent = {
  async fetch(request, env) {
    const auth = await env.OAUTH_PROVIDER.parseAuthRequest(request);
    const { redirectTo } = await env.OAUTH_PROVIDER.completeAuthorization({
      request: auth,
      userId: 'dodo_test',
      metadata: {},
      scope: auth.scope,
      props: { clientProps: { bearerToken: 'fixture-not-a-real-key', environment: 'test_mode' } },
    });
    return Response.redirect(redirectTo);
  },
};
const handlers = {
  '/mcp': { fetch: (_req, _env, context) => Response.json(context.props) },
  '/sse': { fetch: (_req, _env, context) => Response.json(context.props) },
};
function fixture() {
  const env = { OAUTH_KV: new MemoryKV() };
  const current = makeOAuthHandler(handlers, consent);
  const legacy = new LegacyOAuthProvider({
    apiHandlers: handlers,
    defaultHandler: consent,
    authorizeEndpoint: '/authorize',
    tokenEndpoint: '/token',
    clientRegistrationEndpoint: '/register',
    accessTokenTTL: 86400,
    refreshTokenTTL: undefined,
    clientRegistrationTTL: undefined,
  });
  const call = (provider, path, init) => provider.fetch(new Request(origin + path, init), env, ctx);
  return { env, current, legacy, call };
}
async function tokens(f, provider, resource) {
  const registration = await f.call(provider, '/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_name: 'fixture',
      redirect_uris: ['http://localhost:9999/cb'],
      token_endpoint_auth_method: 'none',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
    }),
  });
  assert.equal(registration.status, 201);
  const { client_id } = await registration.json();
  const verifier = 'x'.repeat(64);
  const challenge = Buffer.from(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)),
  ).toString('base64url');
  const query = new URLSearchParams({
    client_id,
    redirect_uri: 'http://localhost:9999/cb',
    response_type: 'code',
    state: 'fixture',
    code_challenge: challenge,
    code_challenge_method: 'S256',
    scope: '',
  });
  if (resource) query.set('resource', resource);
  const authorized = await f.call(provider, `/authorize?${query}`);
  assert.equal(authorized.status, 302);
  const code = new URL(authorized.headers.get('location')).searchParams.get('code');
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id,
    code,
    code_verifier: verifier,
    redirect_uri: 'http://localhost:9999/cb',
  });
  if (resource) body.set('resource', resource);
  const exchange = await f.call(provider, '/token', { method: 'POST', body });
  assert.equal(exchange.status, 200, await exchange.clone().text());
  return { ...(await exchange.json()), client_id };
}

for (const path of ['', '/mcp', '/sse']) {
  test(`discovery preserves ${path || 'origin'} audience when upgraded`, async () => {
    // Given the 0.x advertised audiences; When clients discover 1.x; Then URLs stay exact.
    const f = fixture();
    const response = await f.call(f.current, '/.well-known/oauth-protected-resource' + path);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).resource, origin + path);
  });
  test(`old ${path || 'origin'} tokens and refresh remain valid when upgraded`, async () => {
    // Given real 0.8.0 registrations/grants/tokens in KV.
    const f = fixture();
    const old = await tokens(f, f.legacy, origin + path);
    // When the identical KV is served by 1.x, Then the access token still authorizes.
    // Origin-bound tokens covered both transports in 0.x, so check both.
    const apiPaths = path ? [path] : ['/mcp', '/sse'];
    for (const apiPath of apiPaths) {
      const access = await f.call(f.current, apiPath, {
        headers: { authorization: `Bearer ${old.access_token}` },
      });
      assert.equal(access.status, 200, await access.clone().text());
      assert.equal((await access.json()).clientProps.environment, 'test_mode');
    }
    const refresh = await f.call(f.current, '/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: old.client_id,
        refresh_token: old.refresh_token,
        resource: origin + path,
      }),
    });
    assert.equal(refresh.status, 200, await refresh.clone().text());
    const next = await refresh.json();
    assert.equal(next.expires_in, 86400);
    for (const apiPath of apiPaths) {
      const renewed = await f.call(f.current, apiPath, {
        headers: { authorization: `Bearer ${next.access_token}` },
      });
      assert.equal(renewed.status, 200);
    }
  });
}
test('unbound old grants refresh to the legacy origin when resource is omitted', async () => {
  const f = fixture();
  const old = await tokens(f, f.legacy);
  const response = await f.call(f.current, '/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: old.client_id,
      refresh_token: old.refresh_token,
    }),
  });
  assert.equal(response.status, 200, await response.clone().text());
});
test('new registrations and S256 token flow work for both transports', async () => {
  const f = fixture();
  for (const path of ['/mcp', '/sse']) {
    const issued = await tokens(f, f.current, origin + path);
    const response = await f.call(f.current, path, {
      headers: { authorization: `Bearer ${issued.access_token}` },
    });
    assert.equal(response.status, 200);
  }
});
test('path metadata is served even when the request carries an origin-bound token', async () => {
  const f = fixture();
  const old = await tokens(f, f.legacy, origin);
  for (const path of ['/mcp', '/sse']) {
    const response = await f.call(f.current, '/.well-known/oauth-protected-resource' + path, {
      headers: { authorization: `Bearer ${old.access_token}` },
    });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).resource, origin + path);
  }
});
test('path-bound token cannot authorize the other transport', async () => {
  const f = fixture();
  const issued = await tokens(f, f.current, origin + '/mcp');
  const response = await f.call(f.current, '/sse', {
    headers: { authorization: `Bearer ${issued.access_token}` },
  });
  assert.equal(response.status, 401);
});
test('unregistered resource is rejected at refresh', async () => {
  const f = fixture();
  const issued = await tokens(f, f.current, origin + '/mcp');
  const response = await f.call(f.current, '/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: issued.client_id,
      refresh_token: issued.refresh_token,
      resource: origin + '/other',
    }),
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, 'invalid_target');
});
