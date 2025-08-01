// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'discounts',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/discounts/{discount_id}',
  operationId: 'delete_discount_handler',
};

export const tool: Tool = {
  name: 'delete_discounts',
  description: 'DELETE /discounts/{discount_id}',
  inputSchema: {
    type: 'object',
    properties: {
      discount_id: {
        type: 'string',
      },
    },
    required: ['discount_id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { discount_id, ...body } = args as any;
  const response = await client.discounts.delete(discount_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
