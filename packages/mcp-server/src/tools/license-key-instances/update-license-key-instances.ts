// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_key_instances',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/license_key_instances/{id}',
  operationId: 'update_license_key_instance',
};

export const tool: Tool = {
  name: 'update_license_key_instances',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.licenseKeyInstances.update(id, body));
};

export default { metadata, tool, handler };
