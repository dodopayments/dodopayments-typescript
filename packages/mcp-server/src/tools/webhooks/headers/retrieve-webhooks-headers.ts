// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'webhooks.headers',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/webhooks/{webhook_id}/headers',
  operationId: 'get_webhook_headers',
};

export const tool: Tool = {
  name: 'retrieve_webhooks_headers',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a webhook by id\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/header_retrieve_response',\n  $defs: {\n    header_retrieve_response: {\n      type: 'object',\n      description: 'The value of the headers is returned in the `headers` field.\\n\\nSensitive headers that have been redacted are returned in the sensitive\\nfield.',\n      properties: {\n        headers: {\n          type: 'object',\n          description: 'List of headers configured',\n          additionalProperties: true\n        },\n        sensitive: {\n          type: 'array',\n          description: 'Sensitive headers without the value',\n          items: {\n            type: 'string'\n          }\n        }\n      },\n      required: [        'headers',\n        'sensitive'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['webhook_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { webhook_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.webhooks.headers.retrieve(webhook_id)),
  );
};

export default { metadata, tool, handler };
