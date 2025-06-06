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
  httpPath: '/discounts/{discount_id}',
  operationId: 'get_discount_handler',
};

export const tool: Tool = {
  name: 'retrieve_discounts',
  description: 'GET /discounts/{discount_id}',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { discount_id, ...body } = args as any;
  return asTextContentResult(await client.discounts.retrieve(discount_id));
};

export default { metadata, tool, handler };
