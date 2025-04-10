// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { endpoints, HandlerFunction } from './tools';
import { CallToolRequestSchema, ListToolsRequestSchema, Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';
export { endpoints } from './tools';

// Create server instance
export const server = new McpServer(
  {
    name: 'dodopayments_api',
    version: '1.13.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

/**
 * Initializes the provided MCP Server with the given tools and handlers.
 * If not provided, the default client, tools and handlers will be used.
 */
export function init(params: {
  server: Server | McpServer;
  client?: DodoPayments;
  endpoints?: { tool: Tool; handler: HandlerFunction }[];
}) {
  const server = params.server instanceof McpServer ? params.server.server : params.server;
  const providedEndpoints = params.endpoints || endpoints;
  const tools = providedEndpoints.map((endpoint) => endpoint.tool);
  const handlers = Object.fromEntries(
    providedEndpoints.map((endpoint) => [endpoint.tool.name, endpoint.handler]),
  );

  const client = params.client || new DodoPayments({});

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools,
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    const handler = handlers[name];
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }

    return executeHandler(handler, client, args);
  });
}

/**
 * Runs the provided handler with the given client and arguments.
 */
export async function executeHandler(
  handler: HandlerFunction,
  client: DodoPayments,
  args: Record<string, unknown> | undefined,
) {
  const result = await handler(client, args || {});
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}

export const readEnv = (env: string): string | undefined => {
  if (typeof (globalThis as any).process !== 'undefined') {
    return (globalThis as any).process.env?.[env]?.trim();
  } else if (typeof (globalThis as any).Deno !== 'undefined') {
    return (globalThis as any).Deno.env?.get?.(env)?.trim();
  }
};

export const readEnvOrError = (env: string): string => {
  let envValue = readEnv(env);
  if (envValue === undefined) {
    throw new Error(`Environment variable ${env} is not set`);
  }
  return envValue;
};
