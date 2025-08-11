// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhooks',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/webhooks/{webhook_id}',
  operationId: 'delete_webhook',
};

export const tool: Tool = {
  name: 'delete_webhooks',
  description: 'Delete a webhook by id',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
      },
    },
    required: ['webhook_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { webhook_id, ...body } = args as any;
  const response = await client.webhooks.delete(webhook_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
