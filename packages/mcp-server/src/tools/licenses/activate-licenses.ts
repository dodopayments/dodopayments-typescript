// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'licenses',
  operation: 'write',
  tags: [],
};

export const tool: Tool = {
  name: 'activate_licenses',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      license_key: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.licenses.activate(body);
};

export default { metadata, tool, handler };
