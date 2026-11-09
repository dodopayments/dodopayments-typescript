import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { build } from 'esbuild';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
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
  // A file, not a data: URL. A data: URL puts the full bundle in each stack frame of a logged
  // error, and GitHub Actions then takes minutes to write the log.
  const dir = mkdtempSync(join(tmpdir(), 'worker-test-'));
  const file = join(dir, 'worker.mjs');
  writeFileSync(file, bundled.outputFiles[0].text);
  process.on('exit', () => rmSync(dir, { recursive: true, force: true }));
  return import(pathToFileURL(file).href);
}

const { serveMcp, scopeForCall, ExchangeRefusedError, redact } = await loadBundle(
  "export * from './src/mcp.ts'; export { ExchangeRefusedError } from './src/dodo-auth.ts'; export { redact } from './src/feedback.ts';",
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

const offline = { fetch: async () => new Response('offline', { status: 503 }) };

function deps(loader = fakeLoader({ is_error: false, result: 'ok', log_lines: [], err_lines: [] })) {
  return {
    loader,
    clientOptions: async () => ({ bearerToken: 'api-token', environment: 'test_mode' }),
    profileUrl: 'https://app.example.com/profile',
    allowedHosts: ['mcp.example.com'],
    knowledge: offline,
    docs: offline,
  };
}

const TOOL_NAMES = ['search', 'search_docs', 'read_docs_page', 'execute', 'feedback'];

/** A Worker Loader that fails the test if the Worker runs code for the caller. */
const noLoader = {
  get: () => {
    throw new Error('the Worker must not run code without sign-in');
  },
};

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

const challengeHeader = `Bearer realm="OAuth", resource_metadata="${origin}/.well-known/oauth-protected-resource/mcp"`;

/** A POST /mcp?auth=optional of the Worker without a token: the opt-in docs tier. */
function unsignedPost(body, headers = {}, query = '?auth=optional') {
  const request = legacyPost(body, { 'mcp-protocol-version': '2025-06-18', ...headers });
  return worker.fetch(
    new Request(`${request.url}${query}`, request),
    { ...dodoEnv, LOADER: noLoader, KNOWLEDGE: offline },
    ctx,
  );
}

test('POST /mcp without a token gets 401 with the resource metadata URL by default', async () => {
  for (const query of ['', '?auth=required', '?auth=OPTIONAL']) {
    const response = await unsignedPost(initialize, {}, query);
    assert.equal(response.status, 401, query);
    assert.equal(response.headers.get('www-authenticate'), challengeHeader, query);
  }
});

test('POST /mcp?auth=optional without a token gets a session with the five tools, and no token check', async () => {
  let fetches = 0;
  globalThis.fetch = async () => {
    fetches += 1;
    return new Response('offline', { status: 503 });
  };
  const init = await unsignedPost(initialize);
  assert.equal(init.status, 200, await init.clone().text());
  const { result } = await message(init);
  assert.match(result.instructions, /execute.*Needs sign-in/);
  const list = await unsignedPost({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
  assert.equal(list.status, 200);
  const { tools } = (await message(list)).result;
  assert.deepEqual(
    tools.map((tool) => tool.name),
    TOOL_NAMES,
  );
  assert.match(tools.find((tool) => tool.name === 'execute').description, /Needs sign-in/);
  assert.equal(fetches, 0);
});

test('a 2026-07-28 client without a token lists the five tools', async () => {
  const { client } = await modernClient(null);
  const { tools } = await client.listTools();
  assert.deepEqual(
    tools.map((tool) => tool.name),
    TOOL_NAMES,
  );
  await client.close();
});

test('execute with auth=optional and no token gets 401 with the resource metadata URL, and runs no code', async () => {
  const call = {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: { name: 'execute', arguments: { code: 'x' } },
  };
  for (const body of [call, [call]]) {
    const response = await unsignedPost(body);
    assert.equal(response.status, 401);
    assert.equal(response.headers.get('www-authenticate'), challengeHeader);
    assert.equal(response.headers.get('access-control-expose-headers'), 'www-authenticate');
  }
});

test('POST /mcp with an invalid token still gets 401', async () => {
  globalThis.fetch = async () => Response.json({ active: false });
  const response = await unsignedPost(initialize, { authorization: 'Bearer not-active' });
  assert.equal(response.status, 401);
  assert.match(response.headers.get('www-authenticate') ?? '', /resource_metadata=/);
});

test('a signed-in execute through the Worker runs the code with the exchanged API token', async () => {
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    const body = new URLSearchParams(String(init?.body ?? ''));
    if (url === `${issuer}/oauth2/introspect`) {
      return Response.json({
        active: true,
        aud: `${origin}/mcp`,
        exp: Math.floor(Date.now() / 1000) + 3600,
        sub: 'user-1',
        client_id: 'https://claude.ai/meta',
        business_id: 'bus_1',
        scope: 'payments:read',
        mode: 'test',
      });
    }
    if (url === `${issuer}/oauth2/token` && body.get('subject_token') === 'signed-tok') {
      return Response.json({ access_token: 'exchanged-api-token', expires_in: 300 });
    }
    return new Response('offline', { status: 503 });
  };
  const loader = fakeLoader({ is_error: false, result: 'ran', log_lines: [], err_lines: [] });
  const response = await worker.fetch(
    legacyPost(
      { jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'execute', arguments: { code: 'x' } } },
      { authorization: 'Bearer signed-tok', 'mcp-protocol-version': '2025-06-18' },
    ),
    { ...dodoEnv, LOADER: loader, KNOWLEDGE: offline },
    ctx,
  );
  assert.equal(response.status, 200, await response.clone().text());
  const { result } = await message(response);
  assert.notEqual(result.isError, true);
  assert.ok(result.content[0].text.includes('ran'));
  const options = JSON.parse(loader.runs[0].DODO_CLIENT_OPTIONS);
  assert.equal(options.bearerToken, 'exchanged-api-token');
  assert.equal(options.environment, 'test_mode');
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
    TOOL_NAMES,
  );
});

test('a 2026-07-28 client gets the modern era with no session', async () => {
  const { client, bodies } = await modernClient(readGrant);
  assert.equal(client.getProtocolEra(), 'modern');
  const { tools } = await client.listTools();
  assert.deepEqual(
    tools.map((tool) => tool.name),
    TOOL_NAMES,
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
  assert.equal(read.search.annotations.readOnlyHint, true);
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

test('search answers from the embedded SDK index', async () => {
  const result = await legacyCall(null, 'tools/call', {
    name: 'search',
    arguments: { query: 'create a refund', language: 'typescript' },
  });
  assert.notEqual(result.isError, true);
  assert.match(result.content[0].text, /refund/i);
});

/** A fetcher that records each request and answers with `answer`. */
function recorder(answer) {
  const requests = [];
  return {
    requests,
    fetch: async (request) => {
      requests.push(request);
      return answer(request);
    },
  };
}

test('search_docs asks dodo-knowledge through the binding, with the limit capped at 10', async () => {
  const knowledge = recorder(
    () => new Response('## Webhooks\nSource: https://docs.dodopayments.com/developer-resources/webhooks\n'),
  );
  const result = await legacyCall(
    null,
    'tools/call',
    { name: 'search_docs', arguments: { query: 'verify webhook signature', limit: 50 } },
    { ...deps(noLoader), knowledge },
  );
  assert.notEqual(result.isError, true);
  assert.match(
    result.content[0].text,
    /Source: https:\/\/docs\.dodopayments\.com\/developer-resources\/webhooks/,
  );
  const url = new URL(knowledge.requests[0].url);
  assert.equal(url.pathname, '/search');
  assert.equal(url.searchParams.get('query'), 'verify webhook signature');
  assert.equal(url.searchParams.get('limit'), '10');
});

test('search_docs uses 5 results by default and cuts a long answer at a result boundary', async () => {
  const separator = '\n----------------------------------------\n';
  const section = `## Page\nSource: https://docs.dodopayments.com/x\n${'word '.repeat(600)}`;
  const knowledge = recorder(() => new Response(Array.from({ length: 5 }, () => section).join(separator)));
  const result = await legacyCall(
    null,
    'tools/call',
    { name: 'search_docs', arguments: { query: 'checkout' } },
    { ...deps(noLoader), knowledge },
  );
  assert.equal(new URL(knowledge.requests[0].url).searchParams.get('limit'), '5');
  const { text } = result.content[0];
  assert.ok(text.length <= 8_200, `${text.length}`);
  assert.match(text, /More results were cut/);
  assert.ok(!text.includes(`${separator}\n\n(More`));
});

test('search_docs falls back to a short message when dodo-knowledge fails', async () => {
  const failures = [
    {
      fetch: async () => {
        throw new Error('binding down');
      },
    },
    { fetch: async () => new Response('error', { status: 500 }) },
  ];
  for (const knowledge of failures) {
    const result = await legacyCall(
      null,
      'tools/call',
      { name: 'search_docs', arguments: { query: 'refund' } },
      { ...deps(noLoader), knowledge },
    );
    assert.equal(result.isError, true);
    assert.match(result.content[0].text, /Use `search`.*docs\.dodopayments\.com/);
  }
});

test('read_docs_page reads the markdown of a docs path or docs URL only', async () => {
  const docs = recorder(
    () =>
      new Response(
        '> ## Documentation Index\n> Fetch the complete documentation index at: https://docs.dodopayments.com/llms.txt\n\n# Webhooks\nBody',
      ),
  );
  const read = (path) =>
    legacyCall(
      null,
      'tools/call',
      { name: 'read_docs_page', arguments: { path } },
      { ...deps(noLoader), docs },
    );
  for (const path of [
    '/developer-resources/webhooks',
    'developer-resources/webhooks.md',
    'https://docs.dodopayments.com/developer-resources/webhooks#verify',
  ]) {
    const result = await read(path);
    assert.equal(result.content[0].text, '# Webhooks\nBody', path);
    assert.equal(docs.requests.at(-1).url, 'https://docs.dodopayments.com/developer-resources/webhooks.md');
  }
  const before = docs.requests.length;
  for (const path of [
    'https://evil.example.com/x',
    'https://user@docs.dodopayments.com/x',
    'file:///etc/passwd',
    '',
  ]) {
    assert.equal((await read(path)).isError, true, path);
  }
  assert.equal(docs.requests.length, before);
});

test('read_docs_page returns a long page in parts with the next offset', async () => {
  const page = Array.from({ length: 400 }, (_, i) => `line ${i} ${'x'.repeat(40)}`).join('\n');
  const docs = recorder(() => new Response(page));
  const read = (offset) =>
    legacyCall(
      null,
      'tools/call',
      { name: 'read_docs_page', arguments: { path: '/p', offset } },
      { ...deps(noLoader), docs },
    );
  const first = (await read(undefined)).content[0].text;
  const next = Number(first.match(/again with offset (\d+)/)[1]);
  assert.ok(next > 0 && next <= 8_000);
  const second = (await read(next)).content[0].text;
  assert.ok(second.startsWith('\nline') || second.startsWith('line'), second.slice(0, 20));
  assert.equal(first.slice(0, next) + second.slice(0, 10), page.slice(0, next + 10));
});

test('feedback logs a redacted message and thanks the caller', async () => {
  const logged = [];
  const realLog = console.log;
  console.log = (line) => logged.push(line);
  try {
    const result = await legacyCall(null, 'tools/call', {
      name: 'feedback',
      arguments: {
        message: 'search_docs missed refunds for jane@acme.io on pay_gr4RizvMOXFJ6xca3y2tU',
        tool: 'search_docs',
      },
    });
    assert.notEqual(result.isError, true);
    assert.match(result.content[0].text, /Thank you/);
  } finally {
    console.log = realLog;
  }
  const entry = JSON.parse(logged[0]);
  assert.equal(entry.event, 'mcp_feedback');
  assert.equal(entry.message, 'search_docs missed refunds for <redacted> on <redacted>');
  assert.equal(entry.tool, 'search_docs');
  assert.equal(entry.signed_in, false);
});

test('redact removes emails, Dodo IDs, keys, tokens and card numbers', () => {
  const cases = [
    ['mail me at jane.doe+x@example.co.uk now', 'mail me at <redacted> now'],
    [
      'customer cus_TV52uJWWXt2yIoBBxpjaa and sub_Iuaq622bbmmfOGrVTqdXv',
      'customer <redacted> and <redacted>',
    ],
    ['product pdt_R8AWMPiV8RyJElcCKvAID failed', 'product <redacted> failed'],
    ['Authorization: Bearer abc.def-ghi', 'Authorization: <redacted>'],
    ['secret whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw', 'secret <redacted>'],
    ['key sk_live_51Habcdef', 'key <redacted>'],
    ['jwt eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.c2lnbmF0dXJl', 'jwt <redacted>'],
    ['api key Xk3sP0qLm9Zr7Vt2Wn8Yb1Hc.Fd6Gj4Kl5Mp0Qr2St9Uv', 'api key <redacted>'],
    ['card 4242 4242 4242 4242 declined', 'card <redacted> declined'],
    ['card 4000-0000-0000-0002', 'card <redacted>'],
    ['see https://example.com/cb?token=abc', 'see https://example.com/<redacted>'],
    ['proxy https://jane:hunter2@host.example.com/x failed', 'proxy <redacted> failed'],
  ];
  for (const [input, expected] of cases) assert.equal(redact(input), expected, input);
  // Words and tool names stay.
  const plain = 'search_docs and payment_succeeded webhooks in test_mode with 3 retries';
  assert.equal(redact(plain), plain);
  assert.equal(redact('x'.repeat(5000)).length <= 2000, true);
});

test('read_docs_page follows a redirect within the docs, and refuses one to another host', async () => {
  const docs = recorder((request) => {
    const { pathname } = new URL(request.url);
    if (pathname === '/old.md') return new Response(null, { status: 301, headers: { location: '/new' } });
    if (pathname === '/away.md') {
      return new Response(null, { status: 302, headers: { location: 'https://evil.example.com/x' } });
    }
    return new Response(`# ${pathname}`);
  });
  const read = (path) =>
    legacyCall(
      null,
      'tools/call',
      { name: 'read_docs_page', arguments: { path } },
      { ...deps(noLoader), docs },
    );
  assert.equal((await read('/old')).content[0].text, '# /new.md');
  assert.equal(docs.requests[0].redirect, 'manual');
  const away = await read('/away');
  assert.equal(away.isError, true);
  assert.match(away.content[0].text, /redirects outside docs\.dodopayments\.com/);
  assert.ok(docs.requests.every((request) => new URL(request.url).host === 'docs.dodopayments.com'));
});

test('a request without a token and a body over 4 MiB gets 413', async () => {
  const big = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: { pad: 'x'.repeat(4 * 1024 * 1024) },
  });
  const response = await worker.fetch(
    new Request(`${origin}/mcp?auth=optional`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: big,
    }),
    { ...dodoEnv, LOADER: noLoader, KNOWLEDGE: offline },
    ctx,
  );
  assert.equal(response.status, 413);
});

test('a request without a token and a body that is not JSON gets the parse error of the handler', async () => {
  const response = await worker.fetch(
    new Request(`${origin}/mcp?auth=optional`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: '{not json',
    }),
    { ...dodoEnv, LOADER: noLoader, KNOWLEDGE: offline },
    ctx,
  );
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, -32700);
});
