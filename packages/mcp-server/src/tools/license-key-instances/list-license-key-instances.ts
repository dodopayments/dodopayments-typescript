// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_key_instances',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/license_key_instances',
  operationId: 'list_license_key_instances',
};

export const tool: Tool = {
  name: 'list_license_key_instances',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      license_key_id: {
        type: 'string',
        description: 'Filter by license key ID',
      },
      page_number: {
        type: 'integer',
        description: 'Page number default is 0',
      },
      page_size: {
        type: 'integer',
        description: 'Page size default is 10 max is 100',
      },
    },
  },
};

export const handler = (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return client.licenseKeyInstances.list(body);
};

export default { metadata, tool, handler };
