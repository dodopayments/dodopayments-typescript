// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'payments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/payments',
  operationId: 'list_payments_handler',
};

export const tool: Tool = {
  name: 'list_payments',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      brand_id: {
        type: 'string',
        description: 'filter by Brand id',
      },
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
        $ref: '#/$defs/intent_status',
      },
      subscription_id: {
        type: 'string',
        description: 'Filter by subscription id',
      },
    },
    $defs: {
      intent_status: {
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
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.payments.list(body);
};

export default { metadata, tool, handler };
