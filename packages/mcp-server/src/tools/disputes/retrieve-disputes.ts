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
  httpPath: '/disputes/{dispute_id}',
  operationId: 'get_dispute_handler',
};

export const tool: Tool = {
  name: 'retrieve_disputes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/get_dispute',\n  $defs: {\n    get_dispute: {\n      type: 'object',\n      properties: {\n        amount: {\n          type: 'string',\n          description: 'The amount involved in the dispute, represented as a string to accommodate precision.'\n        },\n        business_id: {\n          type: 'string',\n          description: 'The unique identifier of the business involved in the dispute.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp of when the dispute was created, in UTC.',\n          format: 'date-time'\n        },\n        currency: {\n          type: 'string',\n          description: 'The currency of the disputed amount, represented as an ISO 4217 currency code.'\n        },\n        customer: {\n          $ref: '#/$defs/customer_limited_details'\n        },\n        dispute_id: {\n          type: 'string',\n          description: 'The unique identifier of the dispute.'\n        },\n        dispute_stage: {\n          $ref: '#/$defs/dispute_stage'\n        },\n        dispute_status: {\n          $ref: '#/$defs/dispute_status'\n        },\n        payment_id: {\n          type: 'string',\n          description: 'The unique identifier of the payment associated with the dispute.'\n        },\n        reason: {\n          type: 'string',\n          description: 'Reason for the dispute'\n        },\n        remarks: {\n          type: 'string',\n          description: 'Remarks'\n        }\n      },\n      required: [        'amount',\n        'business_id',\n        'created_at',\n        'currency',\n        'customer',\n        'dispute_id',\n        'dispute_stage',\n        'dispute_status',\n        'payment_id'\n      ]\n    },\n    customer_limited_details: {\n      type: 'object',\n      properties: {\n        customer_id: {\n          type: 'string',\n          description: 'Unique identifier for the customer'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address of the customer'\n        },\n        name: {\n          type: 'string',\n          description: 'Full name of the customer'\n        },\n        metadata: {\n          type: 'object',\n          description: 'Additional metadata associated with the customer',\n          additionalProperties: true\n        },\n        phone_number: {\n          type: 'string',\n          description: 'Phone number of the customer'\n        }\n      },\n      required: [        'customer_id',\n        'email',\n        'name'\n      ]\n    },\n    dispute_stage: {\n      type: 'string',\n      enum: [        'pre_dispute',\n        'dispute',\n        'pre_arbitration'\n      ]\n    },\n    dispute_status: {\n      type: 'string',\n      enum: [        'dispute_opened',\n        'dispute_expired',\n        'dispute_accepted',\n        'dispute_cancelled',\n        'dispute_challenged',\n        'dispute_won',\n        'dispute_lost'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      dispute_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['dispute_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { dispute_id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.disputes.retrieve(dispute_id)));
  } catch (error) {
    if (error instanceof DodoPayments.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
