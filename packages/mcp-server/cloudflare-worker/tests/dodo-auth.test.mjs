import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { build } from 'esbuild';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Bundle the Worker modules for Node: no Workers runtime or production credentials needed.
async function loadBundle(entry) {
  const bundled = await build({
    stdin: { contents: entry, resolveDir: process.cwd(), loader: 'ts' },
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    alias: { '@valtown/deno-http-worker': './src/stubs/deno-http-worker.ts' },
    plugins: [
      {
        name: 'workers-runtime',
        setup(plugin) {
          plugin.onResolve({ filter: /^cloudflare:workers$/ }, () => ({
            path: 'workers',
            namespace: 'fixture',
          }));
          plugin.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({
            contents: 'export class WorkerEntrypoint {}\nexport const env = {};',
          }));
        },
      },
    ],
  });
  // A file, not a data: URL. A data: URL puts the full bundle in each stack frame of a logged
  // error, and GitHub Actions then takes minutes to write the log.
  const dir = mkdtempSync(join(tmpdir(), 'worker-test-'));
  const file = join(dir, 'worker.mjs');
  writeFileSync(file, bundled.outputFiles[0].text);
  process.on('exit', () => rmSync(dir, { recursive: true, force: true }));
  return import(pathToFileURL(file).href);
}
const { apiTokenFor, dodoAuthConfig, requestMode, authenticate } = await loadBundle(
  "export * from './src/dodo-auth.ts'; export { authenticate } from './src/oauth.ts';",
);

const origin = 'https://mcp.example.com';
const issuer = 'https://auth.example.com';
const dodoEnv = {
  DODO_AUTH_ISSUER: issuer,
  DODO_AUTH_MCP_RESOURCE: `${origin}/mcp`,
  DODO_AUTH_API_RESOURCE_TEST: 'https://test.example.com',
  DODO_AUTH_API_RESOURCE_LIVE: 'https://live.example.com',
  MCP_WORKER_CLIENT_SECRET: 's'.repeat(43),
};
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
/** The session for a POST /mcp request, as `{ dodoAuth }`, or the error response. */
async function call(env, path, headers = {}) {
  const result = await authenticate(
    new Request(origin + path, { method: 'POST', headers }),
    dodoAuthConfig(env),
  );
  return result instanceof Response ? result : Response.json({ dodoAuth: result });
}

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

test('a token of the removed Worker server gets 401 and does not go to dodo-auth', async () => {
  const calls = fakeDodoAuth({});
  const response = await call(dodoEnv, '/mcp', { authorization: 'Bearer user:grant:secret' });
  assert.equal(response.status, 401);
  assert.match(response.headers.get('www-authenticate') ?? '', /error="invalid_token"/);
  assert.match((await response.json()).error_description, /Connect again/);
  assert.equal(calls.length, 0);
});

test('the introspection of a token is kept for 60 seconds', async () => {
  const calls = fakeDodoAuth({ cached: active({ mode: 'test' }) });
  const realNow = Date.now;
  try {
    assert.equal((await call(dodoEnv, '/mcp', { authorization: 'Bearer cached' })).status, 200);
    assert.equal((await call(dodoEnv, '/mcp', { authorization: 'Bearer cached' })).status, 200);
    assert.equal(calls.length, 1);
    const start = realNow();
    Date.now = () => start + 59_000;
    await call(dodoEnv, '/mcp', { authorization: 'Bearer cached' });
    assert.equal(calls.length, 1);
    Date.now = () => start + 61_000;
    await call(dodoEnv, '/mcp', { authorization: 'Bearer cached' });
    assert.equal(calls.length, 2);
  } finally {
    Date.now = realNow;
  }
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
