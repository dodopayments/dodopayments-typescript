// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/subscriptions/{subscription_id}',
  operationId: 'get_subscription_handler',
};

export const tool: Tool = {
  name: 'retrieve_subscriptions',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
    },
    required: ['subscription_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  try {
    return asTextContentResult(await client.subscriptions.retrieve(subscription_id));
  } catch (error) {
    if (error instanceof DodoPayments.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
