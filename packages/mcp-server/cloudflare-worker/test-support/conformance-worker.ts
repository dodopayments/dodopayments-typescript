// Local test entry for the MCP conformance suite. It serves POST /mcp with a fixed read-only
// session and no token check. Only `wrangler.conformance.jsonc` in this folder uses it as `main`:
// the production config (`../wrangler.jsonc`) builds `src/index.ts`, which does not import this
// file, so no production setting can turn the bypass on.
import { ExchangeRefusedError } from '../src/dodo-auth';
import { serveMcp, type McpSession } from '../src/mcp';

interface ConformanceEnv {
  LOADER: WorkerLoader;
}

const session: McpSession = {
  token: 'conformance',
  mode: 'test',
  scopes: ['payments:read'],
  subject: 'conformance',
  clientId: 'conformance',
  businessId: 'conformance',
};

export default {
  fetch(request: Request, env: ConformanceEnv): Promise<Response> | Response {
    if (new URL(request.url).pathname !== '/mcp') {
      return new Response('Not found', { status: 404 });
    }
    return serveMcp(request, session, {
      loader: env.LOADER,
      clientOptions: async () => {
        throw new ExchangeRefusedError('the conformance server has no API access');
      },
      profileUrl: 'https://app.dodopayments.com',
      allowedHosts: [],
      knowledge: { fetch: async () => new Response('offline', { status: 503 }) },
      docs: { fetch: async () => new Response('offline', { status: 503 }) },
    });
  },
};
