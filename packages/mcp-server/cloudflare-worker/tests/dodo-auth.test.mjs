import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { build } from 'esbuild';

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
const { apiTokenFor, requestMode } = await loadBundle('src/dodo-auth.ts');

const origin = 'https://mcp.example.com';
const issuer = 'https://auth.example.com';
const dodoEnv = {
  OAUTH_KV: {
    get: async () => null,
    put: async () => {},
    delete: async () => {},
    list: async () => ({ keys: [], list_complete: true }),
  },
  DODO_AUTH_ISSUER: issuer,
  DODO_AUTH_MCP_RESOURCE: `${origin}/mcp`,
  DODO_AUTH_API_RESOURCE_TEST: 'https://test.example.com',
  DODO_AUTH_API_RESOURCE_LIVE: 'https://live.example.com',
  MCP_WORKER_CLIENT_SECRET: 's'.repeat(43),
};
const ctx = { waitUntil() {} };
const mcpHandler = { fetch: (_req, _env, context) => Response.json(context.props) };
const consent = { fetch: () => new Response('consent') };
const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

/** Answers dodo-auth calls and counts them. `answers` maps a token to its introspection. */
function fakeDodoAuth(answers) {
  const calls = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    const body = new URLSearchParams(String(init?.body ?? ''));
    calls.push({ url, body, authorization: init?.headers?.authorization });
    if (url === `${issuer}/oauth2/introspect`) {
      return Response.json(answers[body.get('token')] ?? { active: false });
    }
    if (url === `${issuer}/oauth2/token`) {
      return Response.json({ access_token: `api-${body.get('resource')}`, expires_in: 300 });
    }
    return realFetch(input, init);
  };
  return calls;
}
const active = (extra = {}) => ({
  active: true,
  aud: `${origin}/mcp`,
  exp: Math.floor(Date.now() / 1000) + 3600,
  sub: 'user-1',
  client_id: 'https://claude.ai/meta',
  business_id: 'bus_1',
  scope: 'payments:read',
  ...extra,
});
const call = (env, path, headers = {}) =>
  makeOAuthHandler(mcpHandler, consent).fetch(new Request(origin + path, { headers }), env, ctx);

test('the MCP resource metadata names dodo-auth when it is configured', async () => {
  const response = await call(dodoEnv, '/.well-known/oauth-protected-resource/mcp');
  assert.equal(response.status, 200);
  const metadata = await response.json();
  assert.equal(metadata.resource, `${origin}/mcp`);
  assert.deepEqual(metadata.authorization_servers, [issuer]);
});

test('without dodo-auth settings the metadata names this Worker', async () => {
  const { DODO_AUTH_ISSUER: _unused, ...env } = dodoEnv;
  const response = await call(env, '/.well-known/oauth-protected-resource/mcp');
  assert.deepEqual((await response.json()).authorization_servers, [origin]);
});

test('a dodo-auth token gets the session props with its mode, and the worker client authenticates', async () => {
  const calls = fakeDodoAuth({ tok1: active({ mode: 'test' }) });
  const response = await call(dodoEnv, '/mcp', { authorization: 'Bearer tok1' });
  assert.equal(response.status, 200, await response.clone().text());
  const { expiresAt, ...dodoAuth } = (await response.json()).dodoAuth;
  assert.deepEqual(dodoAuth, {
    token: 'tok1',
    mode: 'test',
    subject: 'user-1',
    clientId: 'https://claude.ai/meta',
    businessId: 'bus_1',
    scopes: ['payments:read'],
  });
  assert.ok(expiresAt > Date.now() / 1000);
  assert.equal(calls[0].authorization, `Basic ${btoa(`mcp_worker:${'s'.repeat(43)}`)}`);
});

test('a grant with two modes needs the Dodo-Mode header, and a mode outside the grant is refused', async () => {
  fakeDodoAuth({ two: active(), one: active({ mode: 'test' }) });
  assert.equal((await call(dodoEnv, '/mcp', { authorization: 'Bearer two' })).status, 400);
  const live = await call(dodoEnv, '/mcp', { authorization: 'Bearer two', 'dodo-mode': 'live' });
  assert.equal((await live.json()).dodoAuth.mode, 'live');
  assert.equal(
    (await call(dodoEnv, '/mcp', { authorization: 'Bearer one', 'dodo-mode': 'live' })).status,
    400,
  );
});

test('an inactive token or a token for a different resource gets 401 with the challenge', async () => {
  fakeDodoAuth({ other: active({ aud: 'https://test.example.com' }) });
  for (const token of ['gone', 'other']) {
    const response = await call(dodoEnv, '/mcp', { authorization: `Bearer ${token}` });
    assert.equal(response.status, 401);
    assert.match(response.headers.get('www-authenticate') ?? '', /resource_metadata=/);
  }
});

test('a token of this Worker does not go to dodo-auth', async () => {
  const calls = fakeDodoAuth({});
  const response = await call(dodoEnv, '/mcp', { authorization: 'Bearer user:grant:secret' });
  assert.equal(response.status, 401);
  assert.equal(calls.length, 0);
});

test('dodo-auth down gives 503, not 401', async () => {
  globalThis.fetch = async () => new Response('', { status: 502 });
  const response = await call(dodoEnv, '/mcp', { authorization: 'Bearer down' });
  assert.equal(response.status, 503);
});

test('the exchange asks for the API resource of the mode and keeps the token', async () => {
  const calls = fakeDodoAuth({});
  const config = {
    issuer,
    mcpResource: `${origin}/mcp`,
    apiResources: { test: 'https://test.example.com', live: 'https://live.example.com' },
    clientSecret: 's'.repeat(43),
  };
  assert.equal(await apiTokenFor(config, 'mcp-1', 'live'), 'api-https://live.example.com');
  assert.equal(await apiTokenFor(config, 'mcp-1', 'live'), 'api-https://live.example.com');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].body.get('grant_type'), 'urn:ietf:params:oauth:grant-type:token-exchange');
  assert.equal(calls[0].body.get('subject_token'), 'mcp-1');
});

test('requestMode rejects a value that is not a mode', () => {
  assert.deepEqual(requestMode({ active: true, mode: 'test' }, 'TEST'), 'test');
  assert.equal(typeof requestMode({ active: true }, 'prod'), 'object');
});
