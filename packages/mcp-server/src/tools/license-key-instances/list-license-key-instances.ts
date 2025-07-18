// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/license_key_instance'\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    license_key_instance: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        business_id: {\n          type: 'string'\n        },\n        created_at: {\n          type: 'string',\n          format: 'date-time'\n        },\n        license_key_id: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        }\n      },\n      required: [        'id',\n        'business_id',\n        'created_at',\n        'license_key_id',\n        'name'\n      ]\n    }\n  }\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.licenseKeyInstances.list(body).asResponse();
  return asTextContentResult(await maybeFilter(args, await response.json()));
};

export default { metadata, tool, handler };
