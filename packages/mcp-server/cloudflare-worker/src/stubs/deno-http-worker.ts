// Stub for @valtown/deno-http-worker which is not compatible with Cloudflare Workers.
// The CF Worker runs the `execute` tool in a Worker Loader isolate (see
// src/execute-tool.ts), so the local Deno path that imports this module is never
// taken at runtime. This stub exists only so the module graph resolves at build
// time (dodopayments-mcp's code-tool still references it); reaching it means the
// package's `local` Deno execution path was unexpectedly invoked.
export function newDenoHTTPWorker(): never {
  throw new Error(
    'Local Deno code execution is not available in Cloudflare Workers. ' +
      'The execute tool runs in a Worker Loader isolate (see src/execute-tool.ts).',
  );
}
