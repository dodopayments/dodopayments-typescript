// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'refunds',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/refunds',
  operationId: 'create_refund_handler',
};

export const tool: Tool = {
  name: 'create_refunds',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      payment_id: {
        type: 'string',
        description: 'The unique identifier of the payment to be refunded.',
      },
      items: {
        type: 'array',
        description: 'Partially Refund an Individual Item',
        items: {
          type: 'object',
          properties: {
            item_id: {
              type: 'string',
              description: 'The id of the item (i.e. `product_id` or `addon_id`)',
            },
            amount: {
              type: 'integer',
              description: 'The amount to refund. if None the whole item is refunded',
            },
            tax_inclusive: {
              type: 'boolean',
              description: 'Specify if tax is inclusive of the refund. Default true.',
            },
          },
          required: ['item_id'],
        },
      },
      reason: {
        type: 'string',
        description: 'The reason for the refund, if any. Maximum length is 3000 characters. Optional.',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.refunds.create(body));
};

export default { metadata, tool, handler };
