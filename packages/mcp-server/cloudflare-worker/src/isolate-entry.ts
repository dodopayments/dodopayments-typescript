import DodoPayments, { type ClientOptions } from 'dodopayments';
// `./user-code.js` is not bundled: it is supplied at isolate-load time through the
// Worker Loader `modules` map and marked external in scripts/build-isolate.mjs.
// @ts-expect-error resolved at runtime inside the loaded isolate, not at build time
import userRun from './user-code.js';

type IsolateEnv = {
  DODO_CLIENT_OPTIONS?: string;
};

type ForbiddenCall = { method: string; path: string; message?: string };

type ExecutionResult = {
  is_error: boolean;
  result: unknown;
  log_lines: string[];
  err_lines: string[];
  forbidden?: ForbiddenCall;
};

const MESSAGE_LIMIT = 500;

/** The API message of a 403 body, if the body has one. */
async function forbiddenMessage(response: Response): Promise<string | undefined> {
  try {
    const body: unknown = await response.clone().json();
    if (typeof body === 'object' && body !== null) {
      const message = (body as Record<string, unknown>)['message'];
      if (typeof message === 'string') return message.slice(0, MESSAGE_LIMIT);
    }
  } catch {
    // A body that is not JSON has no message to show.
  }
  return undefined;
}

function formatArg(arg: unknown): string {
  if (typeof arg === 'string') return arg;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

const MISSING_RUN =
  'The code is missing a top-level `run` function. Write code within this template:\n\n' +
  '```\nasync function run(client) {\n  // Fill this out\n}\n```';

export default {
  async fetch(_request: Request, env: IsolateEnv): Promise<Response> {
    const log_lines: string[] = [];
    // The Worker turns a 403 into a scope error, also if the code catches the SDK error.
    let forbidden: ForbiddenCall | undefined;
    const err_lines: string[] = [];
    const consoleHost = globalThis as unknown as { console: Console };
    const originalConsole = consoleHost.console;
    consoleHost.console = {
      ...originalConsole,
      log: (...args: unknown[]) => log_lines.push(args.map(formatArg).join(' ')),
      error: (...args: unknown[]) => err_lines.push(args.map(formatArg).join(' ')),
    };

    try {
      if (typeof userRun !== 'function') {
        return Response.json(
          { is_error: true, result: MISSING_RUN, log_lines, err_lines } satisfies ExecutionResult,
          { status: 400 },
        );
      }

      const clientOptions = (
        env.DODO_CLIENT_OPTIONS ?
          JSON.parse(env.DODO_CLIENT_OPTIONS)
        : {}) as ClientOptions;
      const client = new DodoPayments({
        ...clientOptions,
        fetch: async (input: string | URL | Request, init?: RequestInit) => {
          const response = await fetch(input, init);
          if (response.status === 403) {
            const url = new URL(input instanceof Request ? input.url : String(input));
            const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();
            const message = await forbiddenMessage(response);
            forbidden = { method, path: url.pathname, ...(message !== undefined && { message }) };
          }
          return response;
        },
      });
      const result = await (userRun as (client: DodoPayments) => Promise<unknown>)(client);
      return Response.json({
        is_error: false,
        result,
        log_lines,
        err_lines,
        ...(forbidden && { forbidden }),
      } satisfies ExecutionResult);
    } catch (e) {
      const message = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      return Response.json(
        {
          is_error: true,
          result: message,
          log_lines,
          err_lines,
          ...(forbidden && { forbidden }),
        } satisfies ExecutionResult,
        { status: 400 },
      );
    } finally {
      consoleHost.console = originalConsole;
    }
  },
};
