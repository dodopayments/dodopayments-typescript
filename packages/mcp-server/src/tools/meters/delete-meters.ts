// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'meters',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/meters/{id}',
  operationId: 'delete_meter',
};

export const tool: Tool = {
  name: 'delete_meters',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  annotations: {
    idempotentHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  const response = await client.meters.delete(id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
