// The guide tools: `search_docs` (dodo-knowledge, through the KNOWLEDGE service binding) and
// `read_docs_page` (the markdown of a page of docs.dodopayments.com). Both work without sign-in
// and never create an API client.
import type { CallToolResult, Tool } from '@modelcontextprotocol/server';

/** The part of a service binding (or of the global `fetch`) that the tools use. */
export interface DocsFetcher {
  fetch(request: Request): Promise<Response>;
}

/** About 2k tokens. Each answer of the two tools stays under this size. */
export const MAX_RESPONSE_CHARS = 8_000;
const SEARCH_TIMEOUT_MS = 8_000;
const PAGE_TIMEOUT_MS = 8_000;
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 10;
const MAX_QUERY_CHARS = 500;
/** The host name does not matter for a service binding. It is the public host of dodo-knowledge. */
const KNOWLEDGE_SEARCH_URL = 'https://knowledge.dodopayments.com/search';
const DOCS_HOST = 'docs.dodopayments.com';
/** dodo-knowledge separates its results with this line. */
const RESULT_SEPARATOR = '\n----------------------------------------\n';

export const searchDocsTool: Tool = {
  name: 'search_docs',
  description:
    'Search the Dodo Payments guides: integration steps, webhooks, checkout, subscriptions, billing concepts, framework adapters. Call it before you write integration code. Returns the best sections with their `Source:` page URL; read a full page with read_docs_page. No sign-in needed.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'What you want to do, in plain words.' },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: MAX_LIMIT,
        description: `Number of results. Default ${DEFAULT_LIMIT}.`,
      },
    },
    required: ['query'],
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
};

export const readDocsPageTool: Tool = {
  name: 'read_docs_page',
  description:
    'Read a page of docs.dodopayments.com as markdown. Pass a path such as `/developer-resources/webhooks` or a full docs URL from a `Source:` line. Long pages come in parts: call again with the `offset` given at the end. No sign-in needed.',
  inputSchema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'Docs path or https://docs.dodopayments.com URL.' },
      offset: {
        type: 'integer',
        minimum: 0,
        description: 'Character offset to start from. Default 0.',
      },
    },
    required: ['path'],
  },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
};

function text(value: string, isError = false): CallToolResult {
  return { content: [{ type: 'text', text: value }], ...(isError && { isError: true }) };
}

function integerArg(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

/** Cuts `body` to the size cap at a boundary before the cap, and says that it was cut. */
function capAt(body: string, boundary: string, note: string): string {
  if (body.length <= MAX_RESPONSE_CHARS) return body;
  const cut = body.lastIndexOf(boundary, MAX_RESPONSE_CHARS);
  const end = cut > 0 ? cut : MAX_RESPONSE_CHARS;
  return `${body.slice(0, end)}\n\n${note}`;
}

const SEARCH_UNAVAILABLE =
  'Guide search is not available right now. Use `search` for SDK methods and parameters, read a page with read_docs_page, or browse https://docs.dodopayments.com.';

export async function callSearchDocs(
  args: Record<string, unknown> | undefined,
  knowledge: DocsFetcher,
): Promise<CallToolResult> {
  const query = typeof args?.['query'] === 'string' ? args['query'].trim().slice(0, MAX_QUERY_CHARS) : '';
  if (query === '') return text('Pass a `query`.', true);
  const limit = integerArg(args?.['limit'], DEFAULT_LIMIT, 1, MAX_LIMIT);
  const url = new URL(KNOWLEDGE_SEARCH_URL);
  url.searchParams.set('query', query);
  url.searchParams.set('limit', String(limit));
  try {
    const response = await knowledge.fetch(
      new Request(url, { signal: AbortSignal.timeout(SEARCH_TIMEOUT_MS) }),
    );
    if (!response.ok) {
      console.error('dodo-knowledge search failed', response.status);
      return text(SEARCH_UNAVAILABLE, true);
    }
    const body = await response.text();
    return text(
      capAt(
        body,
        RESULT_SEPARATOR,
        '(More results were cut. Ask a narrower query, or read a page with read_docs_page.)',
      ),
    );
  } catch (error) {
    console.error('dodo-knowledge search failed', error);
    return text(SEARCH_UNAVAILABLE, true);
  }
}

/**
 * The docs URL of a path or of a full docs URL, without anchor, query or `.md`. Undefined for
 * another host or a path that is not a docs page.
 */
export function docsPageUrl(input: string): URL | undefined {
  const trimmed = input.trim();
  if (trimmed === '') return undefined;
  let url: URL;
  try {
    url = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? new URL(trimmed) : new URL(trimmed, `https://${DOCS_HOST}/`);
  } catch {
    return undefined;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
  if (url.hostname !== DOCS_HOST || url.username !== '' || url.password !== '' || url.port !== '')
    return undefined;
  const path = url.pathname.replace(/\/+$/, '').replace(/\.mdx?$/, '');
  if (path === '') return undefined;
  return new URL(`https://${DOCS_HOST}${path}`);
}

/** Mintlify puts a pointer to llms.txt at the top of each page. It costs tokens and says nothing. */
function withoutIndexPreamble(markdown: string): string {
  return markdown.replace(/^(?:> [^\n]*\n)*> [^\n]*llms\.txt[^\n]*\n(?:> [^\n]*\n)*\n*/, '');
}

export async function callReadDocsPage(
  args: Record<string, unknown> | undefined,
  fetcher: DocsFetcher,
): Promise<CallToolResult> {
  const page = typeof args?.['path'] === 'string' ? docsPageUrl(args['path']) : undefined;
  if (!page) {
    return text(
      `Pass a docs path such as /developer-resources/webhooks, or a https://${DOCS_HOST} URL.`,
      true,
    );
  }
  let response: Response;
  try {
    response = await fetcher.fetch(
      new Request(`${page.href}.md`, {
        headers: { accept: 'text/markdown' },
        signal: AbortSignal.timeout(PAGE_TIMEOUT_MS),
      }),
    );
  } catch (error) {
    console.error('docs page fetch failed', error);
    return text(`Could not read ${page.href} right now. Try again, or open it in a browser.`, true);
  }
  if (response.status === 404) {
    return text(`No docs page at ${page.href}. Find the right page with search_docs.`, true);
  }
  if (!response.ok) {
    return text(`Could not read ${page.href} (HTTP ${response.status}). Try again later.`, true);
  }
  const markdown = withoutIndexPreamble(await response.text());
  const offset = integerArg(args?.['offset'], 0, 0, markdown.length);
  const rest = markdown.slice(offset);
  if (rest.length <= MAX_RESPONSE_CHARS) return text(rest);
  const cut = rest.lastIndexOf('\n', MAX_RESPONSE_CHARS);
  const end = cut > 0 ? cut : MAX_RESPONSE_CHARS;
  const next = offset + end;
  return text(
    `${rest.slice(0, end)}\n\n(Characters ${offset}-${next} of ${markdown.length}. Call read_docs_page again with offset ${next} for more.)`,
  );
}
