// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'brands',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/brands/{id}',
  operationId: 'patch_brand_handler',
};

export const tool: Tool = {
  name: 'update_brands',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      image_id: {
        type: 'string',
        description: 'The UUID you got back from the presigned‐upload call',
      },
      name: {
        type: 'string',
      },
      statement_descriptor: {
        type: 'string',
      },
      support_email: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.brands.update(id, body);
};

export default { metadata, tool, handler };
