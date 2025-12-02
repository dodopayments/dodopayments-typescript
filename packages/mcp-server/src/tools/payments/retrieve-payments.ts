// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
    required: ['payment_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { payment_id, ...body } = args as any;
  try {
    return asTextContentResult(await client.payments.retrieve(payment_id));
  } catch (error) {
    if (error instanceof DodoPayments.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
