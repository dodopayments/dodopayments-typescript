// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'addons',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/addons/{id}',
  operationId: 'get_addon_handler',
};

export const tool: Tool = {
  name: 'retrieve_addons',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return client.addons.retrieve(id);
};

export default { metadata, tool, handler };
