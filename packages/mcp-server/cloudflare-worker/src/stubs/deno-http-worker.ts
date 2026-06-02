// Stub for @valtown/deno-http-worker which is not compatible with Cloudflare Workers.
// The CF Worker runs the `execute` tool in `stainless-sandbox` mode (see src/index.ts),
// so the local Deno path that imports this module is never taken at runtime. This stub
// exists only so the module graph resolves at build time; reaching it means the worker
// was misconfigured to `local` code execution.
export function newDenoHTTPWorker(): never {
  throw new Error(
    'Local Deno code execution is not available in Cloudflare Workers. ' +
      'The execute tool must run in stainless-sandbox mode (set codeExecutionMode in src/index.ts).',
  );
}
