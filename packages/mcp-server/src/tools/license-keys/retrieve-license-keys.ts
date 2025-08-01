// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'license_keys',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/license_keys/{id}',
  operationId: 'get_license_key_handler',
};

export const tool: Tool = {
  name: 'retrieve_license_keys',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/license_key',\n  $defs: {\n    license_key: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier of the license key.'\n        },\n        business_id: {\n          type: 'string',\n          description: 'The unique identifier of the business associated with the license key.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The timestamp indicating when the license key was created, in UTC.',\n          format: 'date-time'\n        },\n        customer_id: {\n          type: 'string',\n          description: 'The unique identifier of the customer associated with the license key.'\n        },\n        instances_count: {\n          type: 'integer',\n          description: 'The current number of instances activated for this license key.'\n        },\n        key: {\n          type: 'string',\n          description: 'The license key string.'\n        },\n        payment_id: {\n          type: 'string',\n          description: 'The unique identifier of the payment associated with the license key.'\n        },\n        product_id: {\n          type: 'string',\n          description: 'The unique identifier of the product associated with the license key.'\n        },\n        status: {\n          $ref: '#/$defs/license_key_status'\n        },\n        activations_limit: {\n          type: 'integer',\n          description: 'The maximum number of activations allowed for this license key.'\n        },\n        expires_at: {\n          type: 'string',\n          description: 'The timestamp indicating when the license key expires, in UTC.',\n          format: 'date-time'\n        },\n        subscription_id: {\n          type: 'string',\n          description: 'The unique identifier of the subscription associated with the license key, if any.'\n        }\n      },\n      required: [        'id',\n        'business_id',\n        'created_at',\n        'customer_id',\n        'instances_count',\n        'key',\n        'payment_id',\n        'product_id',\n        'status'\n      ]\n    },\n    license_key_status: {\n      type: 'string',\n      enum: [        'active',\n        'expired',\n        'disabled'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.licenseKeys.retrieve(id)));
};

export default { metadata, tool, handler };
