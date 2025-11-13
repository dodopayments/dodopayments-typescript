// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'licenses',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/licenses/activate',
  operationId: 'activate_license_key',
};

export const tool: Tool = {
  name: 'activate_licenses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\n\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/license_activate_response',\n  $defs: {\n    license_activate_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'License key instance ID'\n        },\n        business_id: {\n          type: 'string',\n          description: 'Business ID'\n        },\n        created_at: {\n          type: 'string',\n          description: 'Creation timestamp',\n          format: 'date-time'\n        },\n        customer: {\n          $ref: '#/$defs/customer_limited_details'\n        },\n        license_key_id: {\n          type: 'string',\n          description: 'Associated license key ID'\n        },\n        name: {\n          type: 'string',\n          description: 'Instance name'\n        },\n        product: {\n          type: 'object',\n          description: 'Related product info. Present if the license key is tied to a product.',\n          properties: {\n            product_id: {\n              type: 'string',\n              description: 'Unique identifier for the product.'\n            },\n            name: {\n              type: 'string',\n              description: 'Name of the product, if set by the merchant.'\n            }\n          },\n          required: [            'product_id'\n          ]\n        }\n      },\n      required: [        'id',\n        'business_id',\n        'created_at',\n        'customer',\n        'license_key_id',\n        'name',\n        'product'\n      ]\n    },\n    customer_limited_details: {\n      type: 'object',\n      properties: {\n        customer_id: {\n          type: 'string',\n          description: 'Unique identifier for the customer'\n        },\n        email: {\n          type: 'string',\n          description: 'Email address of the customer'\n        },\n        name: {\n          type: 'string',\n          description: 'Full name of the customer'\n        },\n        phone_number: {\n          type: 'string',\n          description: 'Phone number of the customer'\n        }\n      },\n      required: [        'customer_id',\n        'email',\n        'name'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      license_key: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['license_key', 'name'],
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.licenses.activate(body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
