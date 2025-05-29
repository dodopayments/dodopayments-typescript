// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_keys',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/license_keys/{id}',
  operationId: 'get_license_key_handler',
};

export const tool: Tool = {
  name: 'retrieve_license_keys',
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
  return client.licenseKeys.retrieve(id);
};

export default { metadata, tool, handler };
