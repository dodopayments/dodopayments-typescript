// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhooks.headers',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/webhooks/{webhook_id}/headers',
  operationId: 'patch_webhook_headers',
};

export const tool: Tool = {
  name: 'update_webhooks_headers',
  description: 'Patch a webhook by id',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
      },
      headers: {
        type: 'object',
        description: 'Object of header-value pair to update or add',
        additionalProperties: true,
      },
    },
    required: ['webhook_id', 'headers'],
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { webhook_id, ...body } = args as any;
  const response = await client.webhooks.headers.update(webhook_id, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
