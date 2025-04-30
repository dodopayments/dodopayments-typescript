// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'refunds',
  operation: 'write',
  tags: [],
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
      reason: {
        type: 'string',
        description: 'The reason for the refund, if any. Maximum length is 3000 characters. Optional.',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.refunds.create(body);
};

export default { metadata, tool, handler };
