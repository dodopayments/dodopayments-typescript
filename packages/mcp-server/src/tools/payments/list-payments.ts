// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'payments',
  operation: 'read',
  tags: [],
};

export const tool: Tool = {
  name: 'list_payments',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      created_at_gte: {
        type: 'string',
        description: 'Get events after this created time',
        format: 'date-time',
      },
      created_at_lte: {
        type: 'string',
        description: 'Get events created before this time',
        format: 'date-time',
      },
      customer_id: {
        type: 'string',
        description: 'Filter by customer id',
      },
      page_number: {
        type: 'integer',
        description: 'Page number default is 0',
      },
      page_size: {
        type: 'integer',
        description: 'Page size default is 10 max is 100',
      },
      status: {
        type: 'string',
        enum: [
          'succeeded',
          'failed',
          'cancelled',
          'processing',
          'requires_customer_action',
          'requires_merchant_action',
          'requires_payment_method',
          'requires_confirmation',
          'requires_capture',
          'partially_captured',
          'partially_captured_and_capturable',
        ],
      },
      subscription_id: {
        type: 'string',
        description: 'Filter by subscription id',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: any) => {
  const { ...body } = args;
  return client.payments.list(body);
};

export default { metadata, tool, handler };
