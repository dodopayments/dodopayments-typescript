// Optional dodo-auth settings. Set them as Worker variables and secrets to accept dodo-auth tokens.
interface Env {
  DODO_AUTH_ISSUER?: string;
  DODO_AUTH_MCP_RESOURCE?: string;
  DODO_AUTH_API_RESOURCE_TEST?: string;
  DODO_AUTH_API_RESOURCE_LIVE?: string;
  MCP_WORKER_CLIENT_SECRET?: string;
  /** The dashboard page where a user changes the scopes of a connection. */
  DODO_PROFILE_SETTINGS_URL?: string;
}
