// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_keys',
  operation: 'read',
  tags: [],
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

export const handler = (client: DodoPayments, args: any) => {
  const { id } = args;
  return client.licenseKeys.retrieve(id);
};

export default { metadata, tool, handler };
