// Helper to generate the layout
import { html, raw } from 'hono/html';
import type { HtmlEscapedString } from 'hono/utils/html';
import { marked } from 'marked';
import { env } from 'cloudflare:workers';

const ORG_NAME = 'Dodo Payments';

export const layout = (content: HtmlEscapedString | string, title: string) => html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title} - ${ORG_NAME} MCP server</title>
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

        .markdown ul > li {
          list-style-type: disc;
        }

        .markdown ol > li {
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
          <p>&copy; ${new Date().getFullYear()} ${ORG_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </body>
  </html>
`;

export const homeContent = async (req: Request): Promise<HtmlEscapedString> => {
  // `static/home.md` is the source of the page. `{{origin}}` gives the URLs of the host that serves it.
  const origin = new URL(req.url).origin;
  const res = await env.ASSETS.fetch(`${origin}/home.md`);
  const markdown = (await res.text()).replaceAll('{{origin}}', origin);
  const content = await marked(markdown);
  return html` <div class="max-w-4xl mx-auto markdown">${raw(content)}</div> `;
};
