import type { ClientOptions } from 'dodopayments';
import { codeTool } from 'dodopayments-mcp/code-tool';
import { asTextContentResult, asErrorResult, type ToolCallResult } from 'dodopayments-mcp/types';
import { ISOLATE_BOOTSTRAP } from './isolate-bundle.generated';

export type ExecuteToolResult = ToolCallResult;

type IsolateOutput = {
  is_error: boolean;
  result: unknown;
  log_lines: string[];
  err_lines: string[];
};

// `cpuMs` is the authoritative hard stop for untrusted code: Cloudflare terminates
// the isolate when it is exceeded (enforced on the network, not in `wrangler dev
// --local`). The wall-clock race is only a UX bound for slow async work and does
// not preempt CPU-bound code, so it must be larger than the CPU budget.
const ISOLATE_CPU_LIMIT_MS = 10_000;
const ISOLATE_SUBREQUEST_LIMIT = 50;
const WALL_CLOCK_TIMEOUT_MS = 30_000;
const ISOLATE_COMPAT_DATE = '2025-10-01';

const { tool } = codeTool({ blockedMethods: undefined, codeExecutionMode: 'local' });

export const executeToolDescriptor = tool;

function buildUserModule(code: string): string {
  return `${code}\nexport default typeof run === 'function' ? run : undefined;`;
}

function toMcpResult(output: IsolateOutput): ExecuteToolResult {
  const hasLogs = output.log_lines.length > 0 || output.err_lines.length > 0;
  const payload = {
    result: output.result,
    ...(output.log_lines.length > 0 && { log_lines: output.log_lines }),
    ...(output.err_lines.length > 0 && { err_lines: output.err_lines }),
  };
  if (output.is_error) {
    return asErrorResult(
      typeof output.result === 'string' && !hasLogs ? output.result : JSON.stringify(payload, null, 2),
    );
  }
  return asTextContentResult(payload);
}

export async function runExecute(args: {
  code: string;
  loader: WorkerLoader;
  clientOptions: ClientOptions;
}): Promise<ExecuteToolResult> {
  const { code, loader, clientOptions } = args;

  // A unique key per call gives every execution a fresh isolate with no shared
  // state — required because the code is untrusted. Reusing a stable key would be
  // cheaper/warmer but could leak state between unrelated callers' code.
  const stub = loader.get(crypto.randomUUID(), () => ({
    compatibilityDate: ISOLATE_COMPAT_DATE,
    compatibilityFlags: ['nodejs_compat'],
    mainModule: 'bootstrap.js',
    modules: {
      'bootstrap.js': ISOLATE_BOOTSTRAP,
      'user-code.js': buildUserModule(code),
    },
    env: { DODO_CLIENT_OPTIONS: JSON.stringify(clientOptions) },
    limits: { cpuMs: ISOLATE_CPU_LIMIT_MS, subRequests: ISOLATE_SUBREQUEST_LIMIT },
  }));

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`Code execution exceeded the ${WALL_CLOCK_TIMEOUT_MS / 1000}s time limit.`)),
      WALL_CLOCK_TIMEOUT_MS,
    ),
  );

  let response: Response;
  try {
    response = await Promise.race([stub.getEntrypoint().fetch(new Request('https://isolate/')), timeout]);
  } catch (e) {
    return asErrorResult(e instanceof Error ? e.message : String(e));
  }

  let output: IsolateOutput;
  try {
    output = (await response.json()) as IsolateOutput;
  } catch {
    return asErrorResult('Code execution returned an unreadable response.');
  }

  return toMcpResult(output);
}
