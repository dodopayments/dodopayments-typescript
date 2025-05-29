// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/discounts/{discount_id}',
  operationId: 'delete_discount_handler',
};

export const tool: Tool = {
  name: 'delete_discounts',
  description: 'DELETE /discounts/{discount_id}',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { discount_id, ...body } = args as any;
  return client.discounts.delete(discount_id);
};

export default { metadata, tool, handler };
