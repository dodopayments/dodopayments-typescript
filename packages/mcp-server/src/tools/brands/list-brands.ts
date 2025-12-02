// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'brands',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/brands',
  operationId: 'list_brands_handler',
};

export const tool: Tool = {
  name: 'list_brands',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/brand_list_response',\n  $defs: {\n    brand_list_response: {\n      type: 'object',\n      properties: {\n        items: {\n          type: 'array',\n          description: 'List of brands for this business',\n          items: {\n            $ref: '#/$defs/brand'\n          }\n        }\n      },\n      required: [        'items'\n      ]\n    },\n    brand: {\n      type: 'object',\n      properties: {\n        brand_id: {\n          type: 'string'\n        },\n        business_id: {\n          type: 'string'\n        },\n        enabled: {\n          type: 'boolean'\n        },\n        statement_descriptor: {\n          type: 'string'\n        },\n        verification_enabled: {\n          type: 'boolean'\n        },\n        verification_status: {\n          type: 'string',\n          enum: [            'Success',\n            'Fail',\n            'Review',\n            'Hold'\n          ]\n        },\n        description: {\n          type: 'string'\n        },\n        image: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        reason_for_hold: {\n          type: 'string',\n          description: 'Incase the brand verification fails or is put on hold'\n        },\n        support_email: {\n          type: 'string'\n        },\n        url: {\n          type: 'string'\n        }\n      },\n      required: [        'brand_id',\n        'business_id',\n        'enabled',\n        'statement_descriptor',\n        'verification_enabled',\n        'verification_status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.brands.list()));
  } catch (error) {
    if (error instanceof DodoPayments.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
