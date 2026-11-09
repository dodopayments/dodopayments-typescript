// Optional dodo-auth settings. Set them as Worker variables and secrets to accept dodo-auth tokens.
interface Env {
  DODO_AUTH_ISSUER?: string;
  DODO_AUTH_MCP_RESOURCE?: string;
  DODO_AUTH_API_RESOURCE_TEST?: string;
  DODO_AUTH_API_RESOURCE_LIVE?: string;
  MCP_WORKER_CLIENT_SECRET?: string;
  /** The dashboard page where a user changes the scopes of a connection. */
  DODO_PROFILE_SETTINGS_URL?: string;
  /** The dodo-knowledge Worker (`search_docs`). Declared in wrangler.jsonc `services`. */
  KNOWLEDGE: Fetcher;
  /** Sentinel's feedback ingest URL (`/api/public/mcp-feedback`). A Worker variable. */
  MCP_FEEDBACK_URL?: string;
  /** The bearer secret of that URL (Sentinel's `MCP_FEEDBACK_SECRET`). A Worker secret. */
  MCP_FEEDBACK_SECRET?: string;
  /** 10 `feedback` calls a minute per connection. Declared in wrangler.jsonc `ratelimits`. */
  FEEDBACK_LIMITER?: RateLimit;
}
