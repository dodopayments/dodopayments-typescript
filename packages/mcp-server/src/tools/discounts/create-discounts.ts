// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'create_discounts',
  description: 'If `code` is omitted or empty, a random 16-char uppercase code is generated.',
  inputSchema: {
    type: 'object',
    properties: {
      amount: {
        type: 'integer',
        description:
          'The discount amount.\n\n- If `discount_type` is **not** `percentage`, `amount` is in **USD cents**. For example, `100` means `$1.00`.\nOnly USD is allowed.\n- If `discount_type` **is** `percentage`, `amount` is in **basis points**. For example, `540` means `5.4%`.\n\nMust be at least 1.',
      },
      type: {
        $ref: '#/$defs/discount_type',
      },
      code: {
        type: 'string',
        description:
          'Optionally supply a code (will be uppercased).\n- Must be at least 3 characters if provided.\n- If omitted, a random 16-character code is generated.',
      },
      expires_at: {
        type: 'string',
        description: 'When the discount expires, if ever.',
        format: 'date-time',
      },
      name: {
        type: 'string',
      },
      restricted_to: {
        type: 'array',
        description: 'List of product IDs to restrict usage (if any).',
        items: {
          type: 'string',
        },
      },
      usage_limit: {
        type: 'integer',
        description: 'How many times this discount can be used (if any).\nMust be >= 1 if provided.',
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
  const body = args as any;
  return client.discounts.create(body);
};

export default { metadata, tool, handler };
