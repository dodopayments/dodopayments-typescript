// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/discounts',
  operationId: 'list_discounts_handler',
};

export const tool: Tool = {
  name: 'list_discounts',
  description: 'GET /discounts',
  inputSchema: {
    type: 'object',
    properties: {
      page_number: {
        type: 'integer',
        description: 'Page number (default = 0).',
      },
      page_size: {
        type: 'integer',
        description: 'Page size (default = 10, max = 100).',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.discounts.list(body));
};

export default { metadata, tool, handler };
