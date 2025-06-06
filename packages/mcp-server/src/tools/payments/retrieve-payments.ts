// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'payments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/payments/{payment_id}',
  operationId: 'get_payment_handler',
};

export const tool: Tool = {
  name: 'retrieve_payments',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      payment_id: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { payment_id, ...body } = args as any;
  return asTextContentResult(await client.payments.retrieve(payment_id));
};

export default { metadata, tool, handler };
