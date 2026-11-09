import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { build } from 'esbuild';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Bundle the Worker for Node: no Workers runtime or production credentials needed.
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
const { default: worker } = await loadBundle("export { default } from './src/index.ts';");

const origin = 'https://mcp.example.com';
const ctx = { waitUntil() {}, passThroughOnException() {} };
const realFetch = globalThis.fetch;
const realNow = Date.now;
afterEach(() => {
  globalThis.fetch = realFetch;
  Date.now = realNow;
});

// The Worker keeps one metadata copy for each issuer, so each test uses its own issuer.
let issuerCount = 0;
function newIssuer() {
  issuerCount += 1;
  return `https://auth${issuerCount}.example.com`;
}

function envFor(issuer) {
  return {
    DODO_AUTH_ISSUER: issuer,
    DODO_AUTH_MCP_RESOURCE: `${origin}/mcp`,
    DODO_AUTH_API_RESOURCE_TEST: 'https://test.example.com',
    DODO_AUTH_API_RESOURCE_LIVE: 'https://live.example.com',
    MCP_WORKER_CLIENT_SECRET: 's'.repeat(43),
  };
}

function metadataOf(issuer) {
  return {
    issuer,
    authorization_endpoint: `${issuer}/oauth2/authorize`,
    token_endpoint: `${issuer}/oauth2/token`,
    registration_endpoint: `${issuer}/oauth2/register`,
    token_endpoint_auth_methods_supported: ['none', 'client_secret_basic'],
    client_id_metadata_document_supported: true,
  };
}

/** Serves the metadata of dodo-auth. `state.down` makes it fail. `state.calls` counts the fetches. */
function fakeIssuer(issuer, metadata = metadataOf(issuer)) {
  const state = { calls: 0, down: false };
  globalThis.fetch = async (input) => {
    if (String(input) === `${issuer}/.well-known/oauth-authorization-server`) {
      state.calls += 1;
      return state.down ? new Response('down', { status: 502 }) : Response.json(metadata);
    }
    return new Response('offline', { status: 503 });
  };
  return state;
}

const get = (env, path, init = {}) => worker.fetch(new Request(origin + path, init), env, ctx);

test('the root PRM and the /mcp PRM name the /mcp resource and dodo-auth', async () => {
  const issuer = newIssuer();
  for (const path of ['/.well-known/oauth-protected-resource', '/.well-known/oauth-protected-resource/mcp']) {
    const response = await get(envFor(issuer), path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
    const metadata = await response.json();
    assert.equal(metadata.resource, `${origin}/mcp`, path);
    assert.deepEqual(metadata.authorization_servers, [issuer], path);
    assert.equal(metadata.scopes_supported, undefined, path);
  }
});

test('the AS metadata is a copy of the dodo-auth metadata, with the dodo-auth issuer', async () => {
  const issuer = newIssuer();
  fakeIssuer(issuer);
  const response = await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), metadataOf(issuer));
  assert.equal(response.headers.get('cache-control'), 'public, max-age=3600');
});

test('the metadata copy is kept for one hour', async () => {
  const issuer = newIssuer();
  const state = fakeIssuer(issuer);
  const start = realNow();
  await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  Date.now = () => start + 3_500_000;
  await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  assert.equal(state.calls, 1);
  Date.now = () => start + 3_700_000;
  await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  assert.equal(state.calls, 2);
});

test('if dodo-auth is down, the stale copy is served, and with no copy the answer is 502', async () => {
  const issuer = newIssuer();
  const state = fakeIssuer(issuer);
  const start = realNow();
  await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  state.down = true;
  Date.now = () => start + 3_700_000;
  const stale = await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  assert.equal(stale.status, 200);
  assert.equal((await stale.json()).issuer, issuer);
  assert.equal(stale.headers.get('cache-control'), 'public, max-age=60');

  const other = newIssuer();
  fakeIssuer(other).down = true;
  const missing = await get(envFor(other), '/.well-known/oauth-authorization-server');
  assert.equal(missing.status, 502);
  assert.equal((await missing.json()).error, 'temporarily_unavailable');
});

test('a metadata document with a different issuer is not copied', async () => {
  const issuer = newIssuer();
  fakeIssuer(issuer, { ...metadataOf(issuer), issuer: 'https://evil.example.com' });
  const response = await get(envFor(issuer), '/.well-known/oauth-authorization-server');
  assert.equal(response.status, 502);
});

test('/authorize, /token and /register redirect to the dodo-auth endpoints with 307', async () => {
  const issuer = newIssuer();
  fakeIssuer(issuer);
  const env = envFor(issuer);
  const authorize = await get(env, '/authorize?response_type=code&client_id=c1&state=s');
  assert.equal(authorize.status, 307);
  assert.equal(
    authorize.headers.get('location'),
    `${issuer}/oauth2/authorize?response_type=code&client_id=c1&state=s`,
  );
  const token = await get(env, '/token', { method: 'POST', body: 'grant_type=refresh_token' });
  assert.equal(token.status, 307);
  assert.equal(token.headers.get('location'), `${issuer}/oauth2/token`);
  const register = await get(env, '/register', { method: 'POST', body: '{}' });
  assert.equal(register.status, 307);
  assert.equal(register.headers.get('location'), `${issuer}/oauth2/register`);
});

test('the consent screen of the removed Worker server is gone', async () => {
  const env = envFor(newIssuer());
  for (const [method, path] of [
    ['POST', '/approve'],
    ['GET', '/approve'],
    ['GET', '/demo'],
    ['GET', '/.well-known/openid-configuration'],
  ]) {
    const response = await get(env, path, { method });
    assert.equal(response.status, 404, `${method} ${path}`);
  }
});

// A request without an Authorization header gets the no-sign-in tier (tests/mcp.test.mjs).
test('POST /mcp with an Authorization header but no bearer token gets 401 with the PRM URL of /mcp', async () => {
  const response = await get(envFor(newIssuer()), '/mcp', {
    method: 'POST',
    headers: { authorization: 'Basic dXNlcjpwYXNz' },
  });
  assert.equal(response.status, 401);
  assert.equal(
    response.headers.get('www-authenticate'),
    `Bearer realm="OAuth", resource_metadata="${origin}/.well-known/oauth-protected-resource/mcp"`,
  );
  assert.equal(response.headers.get('access-control-expose-headers'), 'www-authenticate');
});

test('without the dodo-auth settings, /mcp and the discovery documents get 503', async () => {
  const { DODO_AUTH_ISSUER: _unused, ...env } = envFor(newIssuer());
  for (const path of [
    '/.well-known/oauth-protected-resource',
    '/.well-known/oauth-authorization-server',
    '/authorize',
  ]) {
    assert.equal((await get(env, path)).status, 503, path);
  }
  assert.equal((await get(env, '/mcp', { method: 'POST' })).status, 503);
});

test('the discovery documents answer a CORS preflight', async () => {
  const response = await get(envFor(newIssuer()), '/.well-known/oauth-protected-resource', {
    method: 'OPTIONS',
  });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), '*');
});
