// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/subscriptions/{subscription_id}/change-plan',
  operationId: 'update_subscription_plan_handler',
};

export const tool: Tool = {
  name: 'change_plan_subscriptions',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, ...body } = args as any;
  return client.subscriptions.changePlan(subscription_id);
};

export default { metadata, tool, handler };
