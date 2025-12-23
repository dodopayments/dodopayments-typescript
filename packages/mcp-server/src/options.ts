import qs from 'qs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import z from 'zod';

export type CLIOptions = McpOptions & {
  transport: 'stdio' | 'http';
  port: number | undefined;
  socket: string | undefined;
};

export type McpOptions = {};

export function parseCLIOptions(): CLIOptions {
  const opts = yargs(hideBin(process.argv))
    .option('tools', {
      type: 'string',
      array: true,
      choices: ['code'],
      description: 'Use dynamic tools or all tools',
    })
    .option('no-tools', {
      type: 'string',
      array: true,
      choices: ['code'],
      description: 'Do not use any dynamic or all tools',
    })
    .option('transport', {
      type: 'string',
      choices: ['stdio', 'http'],
      default: 'stdio',
      description: 'What transport to use; stdio for local servers or http for remote servers',
    })
    .option('port', {
      type: 'number',
      description: 'Port to serve on if using http transport',
    })
    .option('socket', {
      type: 'string',
      description: 'Unix socket to serve on if using http transport',
    })
    .help();

  const argv = opts.parseSync();

  const shouldIncludeToolType = (toolType: 'code') =>
    argv.noTools?.includes(toolType) ? false
    : argv.tools?.includes(toolType) ? true
    : undefined;

  const transport = argv.transport as 'stdio' | 'http';

  return {
    transport,
    port: argv.port,
    socket: argv.socket,
  };
}

const coerceArray = <T extends z.ZodTypeAny>(zodType: T) =>
  z.preprocess(
    (val) =>
      Array.isArray(val) ? val
      : val ? [val]
      : val,
    z.array(zodType).optional(),
  );

const QueryOptions = z.object({
  tools: coerceArray(z.enum(['code'])).describe('Specify which MCP tools to use'),
  no_tools: coerceArray(z.enum(['code'])).describe('Specify which MCP tools to not use.'),
  tool: coerceArray(z.string()).describe('Include tools matching the specified names'),
});

export function parseQueryOptions(defaultOptions: McpOptions, query: unknown): McpOptions {
  const queryObject = typeof query === 'string' ? qs.parse(query) : query;
  const queryOptions = QueryOptions.parse(queryObject);

  return {};
}
