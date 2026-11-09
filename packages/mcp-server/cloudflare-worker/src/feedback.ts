// The `feedback` tool. The message goes to the Worker logs (Workers observability) after the
// redaction below, which follows the approach of the Polar CLI telemetry: an ordered list of
// patterns, each replaced with a marker, on a message of bounded length.
import type { CallToolResult, Tool } from '@modelcontextprotocol/server';

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

export const feedbackTool: Tool = {
  name: 'feedback',
  description:
    'Tell the Dodo Payments team about a problem with these tools or the docs: a wrong or missing answer, a confusing error, a missing feature. Do not include personal data or secrets; IDs, emails and keys are removed before logging. No sign-in needed.',
  inputSchema: {
    type: 'object',
    properties: {
      message: { type: 'string', description: 'What went wrong or what is missing.' },
      tool: {
        type: 'string',
        description: 'The tool that the feedback is about.',
        enum: ['search', 'search_docs', 'read_docs_page', 'execute', 'other'],
      },
      intent: { type: 'string', description: 'The task you were trying to do.' },
    },
    required: ['message'],
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
};

export function callFeedback(args: Record<string, unknown> | undefined, signedIn: boolean): CallToolResult {
  const message = typeof args?.['message'] === 'string' ? args['message'].trim() : '';
  if (message === '') {
    return { content: [{ type: 'text', text: 'Pass a `message`.' }], isError: true };
  }
  const tool = typeof args?.['tool'] === 'string' ? redact(args['tool'], MAX_FIELD_CHARS) : undefined;
  const intent = typeof args?.['intent'] === 'string' ? redact(args['intent'], MAX_FIELD_CHARS) : undefined;
  console.log(
    JSON.stringify({
      event: 'mcp_feedback',
      message: redact(message),
      ...(tool !== undefined && { tool }),
      ...(intent !== undefined && { intent }),
      signed_in: signedIn,
    }),
  );
  return { content: [{ type: 'text', text: 'Thank you. The Dodo Payments team reads every message.' }] };
}
