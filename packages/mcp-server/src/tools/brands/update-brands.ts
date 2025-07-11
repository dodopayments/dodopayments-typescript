// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { asTextContentResult } from 'dodopayments-mcp/tools/types';

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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    brand_id: {\n      type: 'string'\n    },\n    business_id: {\n      type: 'string'\n    },\n    enabled: {\n      type: 'boolean'\n    },\n    statement_descriptor: {\n      type: 'string'\n    },\n    verification_enabled: {\n      type: 'boolean'\n    },\n    verification_status: {\n      type: 'string',\n      enum: [        'Success',\n        'Fail',\n        'Review',\n        'Hold'\n      ]\n    },\n    description: {\n      type: 'string'\n    },\n    image: {\n      type: 'string'\n    },\n    name: {\n      type: 'string'\n    },\n    reason_for_hold: {\n      type: 'string',\n      description: 'Incase the brand verification fails or is put on hold'\n    },\n    support_email: {\n      type: 'string'\n    },\n    url: {\n      type: 'string'\n    }\n  },\n  required: [    'brand_id',\n    'business_id',\n    'enabled',\n    'statement_descriptor',\n    'verification_enabled',\n    'verification_status'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.brands.update(id, body)));
};

export default { metadata, tool, handler };
