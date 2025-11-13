// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'disputes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/disputes',
  operationId: 'list_disputes',
};

export const tool: Tool = {
  name: 'list_disputes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/dispute_list_response'\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    dispute_list_response: {\n      type: 'object',\n      properties: {\n        amount: {\n          type: 'string',\n          description: 'The amount involved in the dispute, represented as a string to accommodate precision.'\n        },\n        business_id: {\n          type: 'string',\n          description: 'The unique identifier of the business involved in the dispute.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp of when the dispute was created, in UTC.',\n          format: 'date-time'\n        },\n        currency: {\n          type: 'string',\n          description: 'The currency of the disputed amount, represented as an ISO 4217 currency code.'\n        },\n        dispute_id: {\n          type: 'string',\n          description: 'The unique identifier of the dispute.'\n        },\n        dispute_stage: {\n          $ref: '#/$defs/dispute_stage'\n        },\n        dispute_status: {\n          $ref: '#/$defs/dispute_status'\n        },\n        payment_id: {\n          type: 'string',\n          description: 'The unique identifier of the payment associated with the dispute.'\n        }\n      },\n      required: [        'amount',\n        'business_id',\n        'created_at',\n        'currency',\n        'dispute_id',\n        'dispute_stage',\n        'dispute_status',\n        'payment_id'\n      ]\n    },\n    dispute_stage: {\n      type: 'string',\n      enum: [        'pre_dispute',\n        'dispute',\n        'pre_arbitration'\n      ]\n    },\n    dispute_status: {\n      type: 'string',\n      enum: [        'dispute_opened',\n        'dispute_expired',\n        'dispute_accepted',\n        'dispute_cancelled',\n        'dispute_challenged',\n        'dispute_won',\n        'dispute_lost'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      created_at_gte: {
        type: 'string',
        description: 'Get events after this created time',
        format: 'date-time',
      },
      created_at_lte: {
        type: 'string',
        description: 'Get events created before this time',
        format: 'date-time',
      },
      customer_id: {
        type: 'string',
        description: 'Filter by customer_id',
      },
      dispute_stage: {
        type: 'string',
        description: 'Filter by dispute stage',
        enum: ['pre_dispute', 'dispute', 'pre_arbitration'],
      },
      dispute_status: {
        type: 'string',
        description: 'Filter by dispute status',
        enum: [
          'dispute_opened',
          'dispute_expired',
          'dispute_accepted',
          'dispute_cancelled',
          'dispute_challenged',
          'dispute_won',
          'dispute_lost',
        ],
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
  const response = await client.disputes.list(body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
