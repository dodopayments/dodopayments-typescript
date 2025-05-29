// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/discounts/{discount_id}',
  operationId: 'patch_discount_handler',
};

export const tool: Tool = {
  name: 'update_discounts',
  description: 'PATCH /discounts/{discount_id}',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
      },
      amount: {
        type: 'integer',
        description:
          'If present, update the discount amount:\n- If `discount_type` is `percentage`, this represents **basis points** (e.g., `540` = `5.4%`).\n- Otherwise, this represents **USD cents** (e.g., `100` = `$1.00`).\n\nMust be at least 1 if provided.',
      },
      code: {
        type: 'string',
        description: 'If present, update the discount code (uppercase).',
      },
      expires_at: {
        type: 'string',
        format: 'date-time',
      },
      name: {
        type: 'string',
      },
      restricted_to: {
        type: 'array',
        description:
          'If present, replaces all restricted product IDs with this new set.\nTo remove all restrictions, send empty array',
        items: {
          type: 'string',
        },
      },
      type: {
        $ref: '#/$defs/discount_type',
      },
      usage_limit: {
        type: 'integer',
      },
    },
    $defs: {
      discount_type: {
        type: 'string',
        enum: ['percentage'],
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { discount_id, ...body } = args as any;
  return client.discounts.update(discount_id, body);
};

export default { metadata, tool, handler };
