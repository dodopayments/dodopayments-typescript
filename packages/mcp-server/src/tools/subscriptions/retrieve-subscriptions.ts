// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n",
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
    },
    required: ['subscription_id'],
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  return asTextContentResult(await client.subscriptions.retrieve(subscription_id));
};

export default { metadata, tool, handler };
