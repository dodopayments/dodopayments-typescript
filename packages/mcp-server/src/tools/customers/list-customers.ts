// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'customers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/customers',
  operationId: 'list_customers',
};

export const tool: Tool = {
  name: 'list_customers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/customer'\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    customer: {\n      type: 'object',\n      properties: {\n        business_id: {\n          type: 'string'\n        },\n        created_at: {\n          type: 'string',\n          format: 'date-time'\n        },\n        customer_id: {\n          type: 'string'\n        },\n        email: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        metadata: {\n          type: 'object',\n          description: 'Additional metadata for the customer',\n          additionalProperties: true\n        },\n        phone_number: {\n          type: 'string'\n        }\n      },\n      required: [        'business_id',\n        'created_at',\n        'customer_id',\n        'email',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Filter by customer email',
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
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.customers.list(body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (error instanceof DodoPayments.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
