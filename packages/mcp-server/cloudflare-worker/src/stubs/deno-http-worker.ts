// Stub for @valtown/deno-http-worker which is not compatible with Cloudflare Workers.
// The local Deno code execution mode is not used in the CF Worker environment;
// code execution is handled via the remote Stainless sandbox instead.
export function newDenoHTTPWorker() {
  throw new Error(
    'Local Deno code execution is not available in Cloudflare Workers. Use stainless-sandbox mode.',
  );
}
