import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { build } from 'esbuild';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';

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
  return import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
}

const { serveMcp, scopeForCall, ExchangeRefusedError } = await loadBundle(
  "export * from './src/mcp.ts'; export { ExchangeRefusedError } from './src/dodo-auth.ts';",
);
const { default: worker } = await loadBundle("export { default } from './src/index.ts';");

const origin = 'https://mcp.example.com';
const issuer = 'https://auth.example.com';
const ctx = { waitUntil() {}, passThroughOnException() {} };
const dodoEnv = {
  DODO_AUTH_ISSUER: issuer,
  DODO_AUTH_MCP_RESOURCE: `${origin}/mcp`,
  DODO_AUTH_API_RESOURCE_TEST: 'https://test.example.com',
  DODO_AUTH_API_RESOURCE_LIVE: 'https://live.example.com',
  MCP_WORKER_CLIENT_SECRET: 's'.repeat(43),
};

const readGrant = {
  token: 'mcp-token',
  mode: 'test',
  scopes: ['payments:read', 'refunds:read'],
  subject: 'user-1',
  clientId: 'https://claude.ai/meta',
  businessId: 'bus_1',
};
const writeGrant = { ...readGrant, scopes: ['payments:read', 'refunds:write'] };

const realFetch = globalThis.fetch;
beforeEach(() => {
  // The server instructions come from the Stainless API. The tests must not use the network.
  globalThis.fetch = async () => new Response('offline', { status: 503 });
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

/** A Worker Loader that answers each run with `output` and records the isolate env. */
function fakeLoader(output) {
  const runs = [];
  return {
    runs,
    get: (_id, factory) => {
      runs.push(factory().env);
      return { getEntrypoint: () => ({ fetch: async () => Response.json(output) }) };
    },
  };
}

function deps(loader = fakeLoader({ is_error: false, result: 'ok', log_lines: [], err_lines: [] })) {
  return {
    loader,
    clientOptions: async () => ({ bearerToken: 'api-token', environment: 'test_mode' }),
    profileUrl: 'https://app.example.com/profile',
    allowedHosts: ['mcp.example.com'],
  };
}

/** The JSON-RPC message of a JSON or SSE response. */
async function message(response) {
  const text = await response.text();
  if (!(response.headers.get('content-type') ?? '').includes('text/event-stream')) return JSON.parse(text);
  const data = text
    .split('\n')
    .filter((line) => line.startsWith('data: '))
    .map((line) => line.slice(6));
  return JSON.parse(data.at(-1));
}

function legacyPost(body, headers = {}) {
  return new Request(`${origin}/mcp`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

const initialize = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'legacy', version: '1' } },
};

async function legacyCall(session, method, params, d = deps(), headers = {}) {
  const response = await serveMcp(
    legacyPost(
      { jsonrpc: '2.0', id: 2, method, params },
      { 'mcp-protocol-version': '2025-06-18', ...headers },
    ),
    session,
    d,
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(response.headers.get('mcp-session-id'), null);
  return (await message(response)).result;
}

/** A 2026-07-28 client that talks to `serveMcp` in memory. `bodies` gets each raw response body. */
async function modernClient(session, d = deps()) {
  const bodies = [];
  const transport = new StreamableHTTPClientTransport(new URL(`${origin}/mcp`), {
    fetch: async (input, init) => {
      const response = await serveMcp(new Request(input, init), session, d);
      bodies.push(await response.clone().text());
      return response;
    },
  });
  const client = new Client(
    { name: 'modern', version: '1' },
    { versionNegotiation: { mode: { pin: '2026-07-28' } } },
  );
  await client.connect(transport);
  return { client, bodies };
}

test('GET and DELETE /mcp get 405, before the token check', async () => {
  for (const method of ['GET', 'DELETE']) {
    const response = await worker.fetch(new Request(`${origin}/mcp`, { method }), dodoEnv, ctx);
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'POST');
  }
});

test('the SSE transport is removed', async () => {
  for (const path of ['/sse', '/sse/message', '/.well-known/oauth-protected-resource/sse']) {
    const response = await worker.fetch(new Request(origin + path), dodoEnv, ctx);
    assert.equal(response.status, 404, path);
  }
});

test('POST /mcp without a token gets 401 with the resource metadata URL', async () => {
  const response = await worker.fetch(new Request(`${origin}/mcp`, { method: 'POST' }), dodoEnv, ctx);
  assert.equal(response.status, 401);
  assert.equal(
    response.headers.get('www-authenticate'),
    `Bearer realm="OAuth", resource_metadata="${origin}/.well-known/oauth-protected-resource/mcp"`,
  );
});

test('the /mcp resource metadata names dodo-auth', async () => {
  const response = await worker.fetch(
    new Request(`${origin}/.well-known/oauth-protected-resource/mcp`),
    dodoEnv,
    ctx,
  );
  assert.equal(response.status, 200);
  const metadata = await response.json();
  assert.equal(metadata.resource, `${origin}/mcp`);
  assert.deepEqual(metadata.authorization_servers, [issuer]);
});

test('a legacy initialize gets an answer and no session', async () => {
  const response = await serveMcp(legacyPost(initialize), readGrant, deps());
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(response.headers.get('mcp-session-id'), null);
  const { result } = await message(response);
  assert.equal(result.serverInfo.name, 'dodopayments_api');
  assert.deepEqual(Object.keys(result.capabilities), ['tools']);
  // A later request without a session ID works too: each request is independent.
  const { tools } = await legacyCall(readGrant, 'tools/list', {});
  assert.deepEqual(
    tools.map((tool) => tool.name),
    ['execute', 'search_docs'],
  );
});

test('a 2026-07-28 client gets the modern era with no session', async () => {
  const { client, bodies } = await modernClient(readGrant);
  assert.equal(client.getProtocolEra(), 'modern');
  const { tools } = await client.listTools();
  assert.deepEqual(
    tools.map((tool) => tool.name),
    ['execute', 'search_docs'],
  );
  const listed = JSON.parse(bodies.at(-1)).result;
  assert.equal(listed.ttlMs, 300000);
  assert.equal(listed.cacheScope, 'private');
  await client.close();
});

test('tools/list annotations follow the grant', async () => {
  const annotationsOf = async (session) => {
    const { client } = await modernClient(session);
    const { tools } = await client.listTools();
    await client.close();
    return Object.fromEntries(tools.map((tool) => [tool.name, tool]));
  };
  const read = await annotationsOf(readGrant);
  assert.equal(read.execute.annotations.readOnlyHint, true);
  assert.equal(read.execute.annotations.destructiveHint, false);
  assert.match(read.execute.description, /payments:read, refunds:read/);
  assert.equal(read.search_docs.annotations.readOnlyHint, true);

  const write = await annotationsOf(writeGrant);
  assert.equal(write.execute.annotations.readOnlyHint, false);
  assert.equal(write.execute.annotations.destructiveHint, true);

  const none = await annotationsOf({ ...readGrant, scopes: [] });
  assert.equal(none.execute.annotations.readOnlyHint, true);
  assert.match(none.execute.description, /scopes: none\./);
});

test('an API 403 becomes a tool error with the missing scope', async () => {
  const loader = fakeLoader({
    is_error: true,
    result: 'PermissionDeniedError: 403',
    log_lines: [],
    err_lines: [],
    forbidden: { method: 'POST', path: '/refunds', message: 'Forbidden' },
  });
  const result = await legacyCall(
    readGrant,
    'tools/call',
    { name: 'execute', arguments: { code: 'x' } },
    deps(loader),
  );
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /refunds:write/);
  assert.equal(
    result.content[0].text.split('\n')[2],
    'To add the scope, change this connection in Settings, Connected apps: https://app.example.com/profile. Then call the tool again.',
  );
  const [challenge] = result._meta['mcp/www_authenticate'];
  assert.match(challenge, /error="insufficient_scope"/);
  assert.match(challenge, /scope="refunds:write"/);
  assert.match(
    challenge,
    /resource_metadata="https:\/\/mcp\.example\.com\/\.well-known\/oauth-protected-resource\/mcp"/,
  );
});

test('a 403 keeps the API result for a caught 403 and for a path with no MCP scope', async () => {
  const forbidden = { method: 'POST', path: '/refunds', message: 'Forbidden' };
  const call = (session, run) =>
    legacyCall(session, 'tools/call', { name: 'execute', arguments: { code: 'x' } }, deps(fakeLoader(run)));

  const caught = await call(readGrant, {
    is_error: false,
    result: 'own data',
    log_lines: [],
    err_lines: [],
    forbidden,
  });
  assert.notEqual(caught.isError, true);
  assert.ok(JSON.stringify(caught.content).includes('own data'));

  const unscoped = await call(readGrant, {
    is_error: true,
    result: 'PermissionDeniedError: 403',
    log_lines: [],
    err_lines: [],
    forbidden: { method: 'GET', path: '/webhooks/wh_1', message: 'Forbidden' },
  });
  assert.equal(unscoped._meta?.['mcp/www_authenticate'], undefined);
});

test('the scope of an API call comes from its method and path', () => {
  assert.equal(scopeForCall({ method: 'GET', path: '/payments/pay_1' }), 'payments:read');
  assert.equal(scopeForCall({ method: 'POST', path: '/checkouts' }), 'checkout_sessions:write');
  assert.equal(
    scopeForCall({ method: 'PATCH', path: '/credit-entitlements/ce_1' }),
    'credit_entitlements:write',
  );
  assert.equal(scopeForCall({ method: 'GET', path: '/invoices/refunds/ref_1' }), 'refunds:read');
  assert.equal(scopeForCall({ method: 'POST', path: '/addons' }), 'products:write');
  assert.equal(scopeForCall({ method: 'GET', path: '/webhooks/wh_1' }), undefined);
  assert.equal(scopeForCall({ method: 'GET', path: '/' }), undefined);
});

test('traceparent from _meta goes to the API calls of execute', async () => {
  const loader = fakeLoader({ is_error: false, result: 1, log_lines: [], err_lines: [] });
  const traceparent = '00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01';
  await legacyCall(
    readGrant,
    'tools/call',
    { name: 'execute', arguments: { code: 'x' }, _meta: { traceparent } },
    deps(loader),
  );
  const options = JSON.parse(loader.runs[0].DODO_CLIENT_OPTIONS);
  assert.equal(options.defaultHeaders.traceparent, traceparent);
  assert.equal(options.bearerToken, 'api-token');
});

test('a refused token exchange is a tool error that asks the user to connect again', async () => {
  const refused = {
    ...deps(),
    clientOptions: async () => {
      throw new ExchangeRefusedError('grant revoked');
    },
  };
  const result = await legacyCall(
    readGrant,
    'tools/call',
    { name: 'execute', arguments: { code: 'x' } },
    refused,
  );
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /grant revoked\. .*Connect again\./);
});

test('a request for a host that the Worker does not serve gets 403', async () => {
  const request = new Request('https://evil.example.net/mcp', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify(initialize),
  });
  assert.equal((await serveMcp(request, readGrant, deps())).status, 403);
  const local = new Request('http://127.0.0.1:8787/mcp', {
    method: 'POST',
    headers: {
      origin: 'https://evil.example.net',
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify(initialize),
  });
  assert.equal((await serveMcp(local, readGrant, deps())).status, 403);
});

test('search_docs answers from the embedded index', async () => {
  const result = await legacyCall(readGrant, 'tools/call', {
    name: 'search_docs',
    arguments: { query: 'create a refund', language: 'typescript' },
  });
  assert.notEqual(result.isError, true);
  assert.match(result.content[0].text, /refund/i);
});
