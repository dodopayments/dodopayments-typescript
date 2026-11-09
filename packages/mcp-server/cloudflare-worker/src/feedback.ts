// The `feedback` tool. It needs sign-in. The message is redacted (the approach of the Polar CLI
// telemetry: an ordered list of patterns, each replaced with a marker, on a message of bounded
// length), then stored in Sentinel (`POST /api/public/mcp-feedback`), where the team reads and
// triages it on the Agents dashboard (`/agents/feedback`). If Sentinel cannot take it, the
// redacted record goes to the Worker logs, so the message is not lost.
import type { CallToolResult, Tool } from '@modelcontextprotocol/server';
import type { DodoAuthProps } from './dodo-auth';

const MAX_MESSAGE_CHARS = 2_000;
const MAX_FIELD_CHARS = 200;
const REDACTED = '<redacted>';

/** The order matters: a pattern that matches a larger secret runs before a pattern of its parts. */
const REDACTIONS: readonly RegExp[] = [
  // Bearer and Basic credentials.
  /\b(?:Bearer|Basic)\s+[^\s"',;]+/gi,
  // JWTs.
  /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  // URLs with credentials: before the email pattern, which would leave the user name.
  /\b[a-z][a-z0-9+.-]*:\/\/[^\s/@]*@\S+/gi,
  // Email addresses.
  /[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[A-Za-z]{2,}/g,
  // URLs with a query string or anchor can carry secrets: keep the host only.
  /(\bhttps?:\/\/[^\s/?#]+)[^\s?#]*[?#]\S*/gi,
  // Prefixed keys and secrets.
  /\b(?:sk|pk|rk)_(?:live|test)_[A-Za-z0-9]+/g,
  /\b(?:whsec_|ghp_|gho_|ghu_|ghs_|ghr_|github_pat_|glpat-|xox[baprs]-|AIza|ya29\.)[A-Za-z0-9_.-]+/g,
  /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g,
  // Dodo Payments IDs: a short lowercase prefix, then a mixed-case identifier (pay_, sub_, cus_, pdt_...).
  /\b[a-z]{2,6}_(?=[A-Za-z0-9]*[A-Z0-9])[A-Za-z0-9]{8,}\b/g,
  // Card-like numbers: 13 to 19 digits, with optional spaces or dashes.
  /\b(?:\d[ -]?){12,18}\d\b/g,
  // UUIDs.
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
  // IPv4 addresses.
  /\b\d{1,3}(?:\.\d{1,3}){3}\b/g,
  // Dotted API keys and other long opaque tokens.
  /\b[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\b/g,
  /\b[A-Za-z0-9_-]{32,}\b/g,
];

/** The text with emails, IDs, keys, tokens and card-like numbers replaced with `<redacted>`. */
export function redact(input: string, maxChars = MAX_MESSAGE_CHARS): string {
  return REDACTIONS.reduce(
    (result, pattern) =>
      result.replace(pattern, (match: string, host: unknown) =>
        typeof host === 'string' && match.startsWith(host) ? `${host}/${REDACTED}` : REDACTED,
      ),
    input.slice(0, maxChars * 2),
  ).slice(0, maxChars);
}

const TOOLS = ['search', 'search_docs', 'read_docs_page', 'execute', 'other'] as const;
type FeedbackAbout = (typeof TOOLS)[number];

/** How long the tool waits for Sentinel before it falls back to the log. */
const SEND_TIMEOUT_MS = 5_000;

/** The body of `POST /api/public/mcp-feedback` in Sentinel. */
export interface FeedbackRecord {
  message: string;
  tool?: FeedbackAbout;
  intent?: string;
  business_id: string;
  user_id: string;
  mode: 'test' | 'live';
  client?: { name: string };
}

/** Where feedback is stored. `send` resolves to the id of the stored record. */
export interface FeedbackSink {
  send(record: FeedbackRecord): Promise<string>;
}

/** A per-caller limit: the Workers rate limiting binding, or anything with the same `limit`. */
export interface FeedbackLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

/** The Sentinel ingest API. Sentinel answers 201 with `{ id }`. */
export function sentinelSink(url: string, secret: string, fetcher: typeof fetch = fetch): FeedbackSink {
  return {
    async send(record) {
      const response = await fetcher(url, {
        method: 'POST',
        headers: { authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
      });
      if (response.status !== 201) {
        throw new Error(`Sentinel answered ${response.status}: ${(await response.text()).slice(0, 200)}`);
      }
      const body: unknown = await response.json();
      const id = typeof body === 'object' && body !== null ? (body as { id?: unknown }).id : undefined;
      if (typeof id !== 'string') throw new Error('Sentinel answered 201 without an id');
      return id;
    },
  };
}

export const feedbackTool: Tool = {
  name: 'feedback',
  description:
    'Tell the Dodo Payments team about a problem with these tools or the docs: a wrong or missing answer, a confusing error, a missing feature. The team reads each message. Needs sign-in. Do not include personal data or secrets; emails, IDs and keys are removed before the message is stored.',
  inputSchema: {
    type: 'object',
    properties: {
      message: { type: 'string', description: 'What went wrong or what is missing.' },
      tool: {
        type: 'string',
        description: 'The tool that the feedback is about.',
        enum: [...TOOLS],
      },
      intent: { type: 'string', description: 'The task you were trying to do.' },
    },
    required: ['message'],
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
};

function text(message: string, isError = false): CallToolResult {
  return { content: [{ type: 'text', text: message }], ...(isError && { isError: true }) };
}

/**
 * Stores one feedback message of a signed-in caller. The caller's business, user, mode and OAuth
 * client come from the checked token, never from the arguments.
 */
export async function callFeedback(
  args: Record<string, unknown> | undefined,
  session: DodoAuthProps,
  sink: FeedbackSink | undefined,
  limiter?: FeedbackLimiter,
): Promise<CallToolResult> {
  const raw = typeof args?.['message'] === 'string' ? args['message'].trim() : '';
  if (raw === '') return text('Pass a `message`.', true);
  if (limiter && !(await limiter.limit({ key: `${session.businessId}:${session.subject}` })).success) {
    return text(
      'Too much feedback from this connection in the last minute. Wait a minute, then send it again.',
      true,
    );
  }
  const about = args?.['tool'];
  const intent = typeof args?.['intent'] === 'string' ? redact(args['intent'], MAX_FIELD_CHARS).trim() : '';
  const record: FeedbackRecord = {
    message: redact(raw),
    ...(TOOLS.includes(about as FeedbackAbout) && { tool: about as FeedbackAbout }),
    ...(intent !== '' && { intent }),
    business_id: session.businessId,
    user_id: session.subject,
    mode: session.mode,
    ...(session.clientId !== '' && { client: { name: session.clientId.slice(0, 100) } }),
  };
  if (sink) {
    try {
      const id = await sink.send(record);
      console.log(JSON.stringify({ event: 'mcp_feedback', stored: true, id }));
      return text(`Thank you. Your feedback is stored as ${id}, and the Dodo Payments team will review it.`);
    } catch (error) {
      console.error(
        'mcp_feedback: Sentinel did not store the feedback',
        error instanceof Error ? error.message : error,
      );
    }
  }
  // The log keeps the redacted record, so no message is lost when Sentinel is down or not set up.
  console.log(JSON.stringify({ event: 'mcp_feedback', stored: false, ...record }));
  return text('Thank you. Your feedback is recorded, and the Dodo Payments team will review it.');
}
