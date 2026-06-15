// Helper to generate the layout
import { html, raw } from 'hono/html';
import type { HtmlEscapedString } from 'hono/utils/html';
import { marked } from 'marked';
import type { AuthRequest } from '@cloudflare/workers-oauth-provider';
import { env } from 'cloudflare:workers';
import { ServerConfig, ClientProperty } from '.';

// Mirrors the `environment` → base URL mapping in the dodopayments SDK. A bearer
// token only authenticates against its own environment's host, so a test key sent
// to live_mode (or vice versa) yields a 401 — the mismatch we probe for below.
const ENVIRONMENT_BASE_URLS: Record<string, string> = {
  live_mode: 'https://live.dodopayments.com',
  test_mode: 'https://test.dodopayments.com',
};

export const ALLOWED_ENVIRONMENTS = Object.keys(ENVIRONMENT_BASE_URLS);

const PROBE_TIMEOUT_MS = 5000;

export type ProbeOutcome = 'ok' | 'rejected' | 'unverified';

// Validates a bearer token against the selected environment BEFORE the OAuth grant
// is stored, so a key/environment mismatch surfaces on the consent page instead of
// as an opaque 401 hours later inside the `execute` tool. Only a definitive 401
// blocks (returns 'rejected'); network errors, timeouts, rate limits, and 5xx are
// treated as 'unverified' so transient issues never reject a valid key. Uses raw
// `fetch` (no SDK retries/long timeouts) and never logs the token.
export const probeApiKey = async (environment: string, bearerToken: string): Promise<ProbeOutcome> => {
  const baseURL = ENVIRONMENT_BASE_URLS[environment];
  if (!baseURL || !bearerToken) {
    return 'unverified';
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(`${baseURL}/customers?page_size=1`, {
      headers: { Authorization: `Bearer ${bearerToken}` },
      signal: controller.signal,
    });
    // Release the response stream eagerly; on Cloudflare Workers an unconsumed
    // body keeps the underlying socket open until the request is GC'd.
    await res.body?.cancel();
    if (res.status === 401) {
      return 'rejected';
    }
    return res.ok ? 'ok' : 'unverified';
  } catch {
    return 'unverified';
  } finally {
    clearTimeout(timer);
  }
};

// OAuthProvider keys every grant/token under `userId` and (since 0.8.0) revokes a
// user's prior grants for the same client on re-auth. A stable id is therefore
// required: a random id per authorization orphans grants and defeats that cleanup,
// causing unbounded KV growth. Derive it as a SHA-256 hex digest of (environment,
// key) so the same credentials always map to the same owner. The digest is one-way
// (the raw key is never embedded), the NUL separator stops env/key boundary
// collisions, and hex output guarantees no ':' — the character OAuthProvider uses
// internally as a token field separator.
export const stableUserId = async (environment: string, bearerToken: string): Promise<string> => {
  const data = new TextEncoder().encode(`${environment}\u0000${bearerToken}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `dodo_${hex}`;
};

export const layout = (content: HtmlEscapedString | string, title: string, config: ServerConfig) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title} - ${config.orgName} MCP server</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        // Dodo Payments brand tokens, mirrored from the dashboard design system
        // (frontend globals.css) so this standalone consent page matches it.
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                brand: '#c6fe1e',
                'brand-border': '#a6e500',
                ink: '#0d0d0d',
                'bg-secondary': '#f6f7f9',
                'border-primary': '#d0d5dd',
                'border-secondary': '#e4e4e7',
                'text-primary': '#30313d',
                'text-secondary': '#6a7383',
                'text-tertiary': '#424e62',
                'text-placeholder': '#9d9ea4',
                'error-bg': '#fef3f2',
                'error-border': '#fda29b',
                'error-text': '#b42318',
              },
              fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['"Hanken Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
              },
              borderRadius: { lg: '0.5rem' },
            },
          },
        };
      </script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

        /* Dodo-themed markdown content (tokens mirror frontend globals.css) */
        .markdown {
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 0.75rem;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
          padding: 2.5rem;
        }

        .markdown h1 {
          font-size: 2rem;
          font-weight: 700;
          font-family: 'Hanken Grotesk', 'Inter', system-ui, sans-serif;
          color: #0d0d0d;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .markdown h2 {
          font-size: 1.375rem;
          font-weight: 600;
          font-family: 'Hanken Grotesk', 'Inter', system-ui, sans-serif;
          color: #30313d;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .markdown h3 {
          font-size: 1.125rem;
          font-weight: 600;
          font-family: 'Hanken Grotesk', 'Inter', system-ui, sans-serif;
          color: #30313d;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .markdown p {
          font-size: 0.975rem;
          color: #6a7383;
          margin-bottom: 1rem;
          line-height: 1.65;
        }

        .markdown a {
          color: #0a4ceb;
          font-weight: 500;
          text-decoration: none;
        }

        .markdown a:hover {
          color: #0f3ebe;
          text-decoration: underline;
        }

        .markdown blockquote {
          border-left: 3px solid #c6fe1e;
          padding: 0.75rem 1rem;
          margin: 1.5rem 0;
          background-color: #f6f7f9;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #424e62;
        }

        .markdown blockquote p {
          margin-bottom: 0.25rem;
        }

        .markdown ul,
        .markdown ol {
          margin: 1rem 0 1rem 1.5rem;
          font-size: 0.975rem;
          color: #6a7383;
        }

        .markdown li {
          margin-bottom: 0.5rem;
        }

        .markdown ul li {
          list-style-type: disc;
        }

        .markdown ol li {
          list-style-type: decimal;
        }

        .markdown pre {
          background-color: #0d0d0d;
          color: #f6f7f9;
          padding: 1rem 1.25rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .markdown code {
          font-family: ui-monospace, 'SF Mono', Menlo, monospace;
          font-size: 0.85rem;
          background-color: #f2f4f7;
          color: #30313d;
          padding: 0.125rem 0.375rem;
          border-radius: 0.375rem;
        }

        .markdown pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
      </style>
    </head>
    <body class="bg-bg-secondary text-text-primary font-sans leading-relaxed flex flex-col min-h-screen">
      <main class="container mx-auto px-4 pt-10 flex-grow">${content}</main>
      <footer class="py-6">
        <div class="container mx-auto px-4 text-center text-sm text-text-secondary">
          <p>&copy; ${new Date().getFullYear()} ${config.orgName}. All rights reserved.</p>
        </div>
      </footer>
    </body>
  </html>
`;

export const homeContent = async (req: Request): Promise<HtmlEscapedString> => {
  // We have the README symlinked into the static directory, so we can fetch it
  // and render it into HTML
  const origin = new URL(req.url).origin;
  const res = await env.ASSETS.fetch(`${origin}/home.md`);
  let markdown = await res.text();
  markdown = markdown.replaceAll('{{cloudflareWorkerUrl}}', origin + '/sse');
  const content = await marked(markdown);
  return html` <div class="max-w-4xl mx-auto markdown">${raw(content)}</div> `;
};

// Inlined Dodo Payments logo mark (frontend public/logo/logo.svg) so the consent
// page shows real branding without an external asset request. Lime circle (#C6FE1E)
// with the black Dodo mark; height is controlled by the wrapping container.
const DODO_LOGO_SVG = `<svg width="40" height="40" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dodo Payments">
  <path d="M21.0101 -0.00671387C9.40515 -0.00671387 -0.00317383 9.39863 -0.00317383 20.9998C-0.00317383 32.6011 9.40515 42.0064 21.0101 42.0064C32.615 42.0064 42.0233 32.6011 42.0233 20.9998C42.0233 9.39863 32.615 -0.00671387 21.0101 -0.00671387Z" fill="#C6FE1E"/>
  <mask id="dodo_logo_mask" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="6" y="9" width="32" height="27">
    <path d="M37.8206 9.44624H6.30078V35.7044H37.8206V9.44624Z" fill="white"/>
  </mask>
  <g mask="url(#dodo_logo_mask)">
    <path d="M18.5025 15.5044H18.4885C17.62 15.2551 16.701 15.7537 16.4068 16.5771C16.0818 17.4622 16.5973 18.4761 17.5079 18.7562C19.7381 19.3892 20.6963 16.1934 18.5025 15.5044Z" fill="#0D0D0D"/>
    <path d="M37.5098 20.0222C34.6379 13.7342 25.4762 16.3362 24.63 14.6893C22.1505 10.7989 17.522 8.61421 12.518 9.74016C11.7475 9.43207 9.09427 9.34804 7.37959 10.4264L8.41344 10.8829C8.49189 10.9165 8.46948 10.9081 8.58435 10.9501C9.05224 11.1266 8.97099 11.0762 8.63478 11.261C7.86429 11.712 6.90329 12.2357 6.30371 13.0228C6.32893 13.0592 7.62334 13.3701 7.62334 13.3701C7.64576 13.3757 7.88671 13.4009 7.83347 13.5073C3.60001 20.1902 10.7389 30.2762 14.2047 35.7043H24.2378C22.6884 32.9314 20.9177 29.1474 21.5229 26.579C21.6322 26.1141 21.7722 25.5231 22.3438 25.4447C23.7251 25.2234 25.5742 25.243 26.8911 25.0946C26.8911 25.0946 26.8976 25.0946 26.9107 25.0946C27.1909 25.0806 34.0496 24.2095 35.6914 28.4836C35.8315 28.8757 36.1537 28.6209 36.2826 28.3632C37.507 25.9292 38.2971 22.0976 37.5154 20.025L37.5098 20.0222ZM26.4372 17.9579C25.9553 18.8178 25.6275 19.9353 25.5434 20.9101C25.4986 21.529 25.563 22.1396 25.6247 22.7586C25.6583 23.1003 25.6611 23.5317 25.3865 23.7557C25.1484 23.9574 24.7533 23.977 24.3555 24.005C22.4026 23.9966 17.6396 24.005 15.8045 22.7558L15.7933 22.7474C13.1232 21.1201 11.6943 17.4454 13.2801 14.5913C13.7928 13.6222 14.737 12.992 15.8129 12.7539C17.197 12.4374 18.7211 12.6727 19.9567 13.3197C20.461 13.5746 21.0634 13.9107 21.5229 14.2972C22.4335 15.0926 23.2124 15.9189 24.4059 16.1738C24.9551 16.3306 25.5266 16.3082 26.0758 16.4202C27.104 16.6667 26.8462 17.2521 26.4344 17.9523L26.4372 17.9579Z" fill="#0D0D0D"/>
  </g>
</svg>`;

// `password` fields carry live credentials; their submitted values are never
// echoed back into the re-rendered form, so the user re-pastes them on retry.
const isSecretField = (field: ClientProperty) => field.type === 'password';

export type AuthorizeFormState = {
  values?: Record<string, string>;
  formError?: string;
};

export const renderLoggedOutAuthorizeScreen = async (
  config: ServerConfig,
  oauthReqInfo: AuthRequest,
  state: AuthorizeFormState = {},
) => {
  const submitted = state.values ?? {};

  const labelClass = 'block text-[13px] font-medium text-text-tertiary mb-1.5';
  const controlClass =
    'w-full h-10 px-3 py-2 text-sm text-text-primary bg-white border border-border-primary rounded-lg shadow-sm ' +
    'placeholder:text-text-placeholder transition-colors focus:outline-none focus:ring-2 focus:ring-brand-border focus:border-brand-border';

  const renderField = (field: ClientProperty) => {
    const submittedValue = isSecretField(field) ? undefined : submitted[field.key];
    if (field.type === 'radio' && field.options) {
      const activeValue = submittedValue ?? (field.default as string | undefined);
      return html`
        <div>
          <span class="${labelClass}"
            >${field.label}${field.required ? html`<span class="text-error-text ml-0.5">*</span>` : ''}</span
          >
          <div class="grid grid-cols-2 gap-2.5">
            ${field.options.map(
              (opt: { label: string; value: string; description?: string }) => html`
                <label
                  class="group flex flex-col gap-0.5 px-3.5 py-2.5 rounded-lg border bg-white cursor-pointer transition-colors border-border-primary hover:bg-bg-secondary has-[:checked]:border-brand-border has-[:checked]:bg-bg-secondary has-[:checked]:ring-1 has-[:checked]:ring-brand-border focus-within:ring-2 focus-within:ring-brand-border"
                >
                  <span class="flex items-center gap-2">
                    <input
                      type="radio"
                      name="${`clientopt_${field.key}`}"
                      value="${opt.value}"
                      ${activeValue === opt.value ? 'checked' : ''}
                      class="h-4 w-4 accent-ink"
                    />
                    <span class="text-sm font-medium text-text-primary">${opt.label}</span>
                  </span>
                  ${opt.description ?
                    html`<span class="text-xs text-text-secondary pl-6">${opt.description}</span>`
                  : ''}
                </label>
              `,
            )}
          </div>
        </div>
      `;
    }
    if (field.type === 'select' && field.options) {
      const activeValue = submittedValue ?? (field.default as string | undefined);
      return html`
        <div>
          <label for="${`clientopt_${field.key}`}" class="${labelClass}"
            >${field.label}${field.required ? html`<span class="text-error-text ml-0.5">*</span>` : ''}</label
          >
          <select
            id="${`clientopt_${field.key}`}"
            name="${`clientopt_${field.key}`}"
            ${field.required ? 'required' : ''}
            class="${controlClass} cursor-pointer"
          >
            ${field.options.map(
              (opt: { label: string; value: string }) => html`
                <option value="${opt.value}" ${activeValue === opt.value ? 'selected' : ''}>
                  ${opt.label}
                </option>
              `,
            )}
          </select>
        </div>
      `;
    }
    return html`
      <div>
        <label for="${`clientopt_${field.key}`}" class="${labelClass}"
          >${field.label}${field.required ? html`<span class="text-error-text ml-0.5">*</span>` : ''}</label
        >
        <input
          type="${field.type}"
          id="${`clientopt_${field.key}`}"
          name="${`clientopt_${field.key}`}"
          ${field.required ? 'required' : ''}
          ${submittedValue ? html`value="${submittedValue}"` : ''}
          ${field.placeholder ? html`placeholder="${field.placeholder}"` : ''}
          class="${controlClass}"
        />
      </div>
    `;
  };

  return html`
    <div
      class="max-w-md mx-auto bg-white border border-border-secondary rounded-lg shadow-sm overflow-hidden"
    >
      <div class="px-8 pt-8 pb-6 border-b border-border-secondary">
        <div class="flex items-center justify-center mb-5">
          ${config.logoUrl ?
            html`<img src="${config.logoUrl}" class="h-10" alt="${config.orgName}" />`
          : raw(DODO_LOGO_SVG)}
        </div>
        <h1 class="text-xl font-heading font-semibold text-text-primary text-center">
          Authorize ${config.orgName} MCP server
        </h1>
        <p class="mt-2 text-sm text-text-secondary text-center">
          Enter your credentials to connect your MCP client.${' '}
          ${config.instructionsUrl ?
            html`<a
              href="${config.instructionsUrl}"
              class="text-text-primary font-medium underline underline-offset-2 hover:text-ink transition-colors"
              >View instructions</a
            >`
          : ''}
        </p>
      </div>

      <div class="px-8 py-6">
        ${state.formError ?
          html`<div
            role="alert"
            class="mb-5 flex items-start gap-2.5 px-4 py-3 bg-error-bg border border-error-border text-error-text rounded-lg text-sm"
          >
            <svg class="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
            <span>${state.formError}</span>
          </div>`
        : ''}
        <form action="/approve" method="POST" class="space-y-5">
          <input type="hidden" name="oauthReqInfo" value="${JSON.stringify(oauthReqInfo)}" />
          <div class="space-y-4">${config.clientProperties.map(renderField)}</div>

          <div class="space-y-2.5 pt-1">
            <button
              type="submit"
              name="action"
              value="login_approve"
              class="w-full h-10 px-4 inline-flex items-center justify-center font-heading font-medium text-sm rounded-lg border border-transparent bg-ink text-white transition-all duration-300 ease-in-out hover:bg-brand hover:text-ink hover:border-border-primary active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-border focus:ring-offset-2"
            >
              Approve &amp; connect
            </button>
            <button
              type="submit"
              name="action"
              value="reject"
              class="w-full h-10 px-4 inline-flex items-center justify-center font-heading font-medium text-sm rounded-lg bg-bg-secondary text-text-tertiary transition-colors hover:bg-border-secondary focus:outline-none focus:ring-2 focus:ring-brand-border focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
};

// The reject path passes a client-supplied redirect URL, so it must never reach a
// script sink. Accept only absolute http(s) URLs; this blocks `javascript:`/`data:`
// navigation and rejects anything unparseable.
const normalizeRedirectUrl = (input: string): string | null => {
  try {
    const url = new URL(input);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
};

export const renderApproveContent = async (message: string, status: string, redirectUrl: string) => {
  // Put the URL in an auto-escaped href and let a static script read it back, rather
  // than interpolating it into the script body (a `</script>` breakout would defeat
  // JSON-encoding, and string-escaping alone wouldn't stop `javascript:` URLs).
  const safeRedirectUrl = normalizeRedirectUrl(redirectUrl);
  return html`
    <div
      class="max-w-md mx-auto bg-white border border-border-secondary p-8 rounded-lg shadow-sm text-center"
    >
      <div class="mb-5">
        <span
          class="inline-flex items-center justify-center w-12 h-12 text-xl ${status === 'success' ?
            'bg-brand text-ink'
          : 'bg-error-bg text-error-text'} rounded-full"
        >
          ${status === 'success' ? '✓' : '✗'}
        </span>
      </div>
      <h1 class="text-xl font-heading font-semibold mb-2 text-text-primary">${message}</h1>
      <p class="mb-6 text-sm text-text-secondary">
        ${safeRedirectUrl ?
          'You will be redirected back to the application shortly.'
        : 'You can now close this window.'}
      </p>
      <a
        id="redirect-link"
        href="${safeRedirectUrl ?? '/'}"
        class="inline-flex items-center justify-center h-10 px-4 font-heading font-medium text-sm rounded-lg border border-transparent bg-ink text-white transition-all duration-300 hover:bg-brand hover:text-ink hover:border-border-primary focus:outline-none focus:ring-2 focus:ring-brand-border focus:ring-offset-2"
      >
        ${safeRedirectUrl ? 'Continue now' : 'Return to Home'}
      </a>
      ${safeRedirectUrl ?
        html`<script>
          setTimeout(() => {
            const link = document.getElementById('redirect-link');
            if (link instanceof HTMLAnchorElement) {
              window.location.assign(link.href);
            }
          }, 2000);
        </script>`
      : ''}
    </div>
  `;
};

export const renderAuthorizationApprovedContent = async (redirectUrl: string) => {
  return renderApproveContent('Authorization approved!', 'success', redirectUrl);
};

export const renderAuthorizationRejectedContent = async (redirectUrl: string) => {
  return renderApproveContent('Authorization rejected.', 'error', redirectUrl);
};

export const parseApproveFormBody = async (
  body: {
    [x: string]: string | File;
  },
  config: ServerConfig,
) => {
  const parsedClientProps = Object.fromEntries(
    config.clientProperties.map((prop: ClientProperty) => {
      const rawValue = body[`clientopt_${prop.key}`];
      // Trim string inputs so a pasted token/environment with stray whitespace
      // doesn't silently fail authentication later.
      const value =
        prop.type === 'number' ? Number(rawValue)
        : typeof rawValue === 'string' ? rawValue.trim()
        : rawValue;
      return [prop.key, value];
    }),
  );

  let oauthReqInfo: AuthRequest | null = null;
  try {
    oauthReqInfo = JSON.parse(body.oauthReqInfo as string) as AuthRequest;
    if (Object.keys(oauthReqInfo).length === 0) {
      oauthReqInfo = null;
    }
  } catch (e) {
    oauthReqInfo = null;
  }

  return { oauthReqInfo, clientProps: parsedClientProps, action: body.action };
};
