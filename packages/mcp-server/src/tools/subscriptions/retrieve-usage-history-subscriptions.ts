// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'dodopayments-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'subscriptions',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/subscriptions/{subscription_id}/usage-history',
  operationId: 'list_usage_history_handler',
};

export const tool: Tool = {
  name: 'retrieve_usage_history_subscriptions',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet detailed usage history for a subscription that includes usage-based billing (metered components).\nThis endpoint provides insights into customer usage patterns and billing calculations over time.\n\n## What You'll Get:\n- **Billing periods**: Each item represents a billing cycle with start and end dates\n- **Meter usage**: Detailed breakdown of usage for each meter configured on the subscription\n- **Usage calculations**: Total units consumed, free threshold units, and chargeable units\n- **Historical tracking**: Complete audit trail of usage-based charges\n\n## Use Cases:\n- **Customer support**: Investigate billing questions and usage discrepancies\n- **Usage analytics**: Analyze customer consumption patterns over time\n- **Billing transparency**: Provide customers with detailed usage breakdowns\n- **Revenue optimization**: Identify usage trends to optimize pricing strategies\n\n## Filtering Options:\n- **Date range filtering**: Get usage history for specific time periods\n- **Meter-specific filtering**: Focus on usage for a particular meter\n- **Pagination**: Navigate through large usage histories efficiently\n\n## Important Notes:\n- Only returns data for subscriptions with usage-based (metered) components\n- Usage history is organized by billing periods (subscription cycles)\n- Free threshold units are calculated and displayed separately from chargeable units\n- Historical data is preserved even if meter configurations change\n\n## Example Query Patterns:\n- Get last 3 months: `?start_date=2024-01-01T00:00:00Z&end_date=2024-03-31T23:59:59Z`\n- Filter by meter: `?meter_id=mtr_api_requests`\n- Paginate results: `?page_size=20&page_number=1`\n- Recent usage: `?start_date=2024-03-01T00:00:00Z` (from March 1st to now)\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    items: {\n      type: 'array',\n      description: 'List of usage history items',\n      items: {\n        $ref: '#/$defs/subscription_retrieve_usage_history_response'\n      }\n    }\n  },\n  required: [    'items'\n  ],\n  $defs: {\n    subscription_retrieve_usage_history_response: {\n      type: 'object',\n      properties: {\n        end_date: {\n          type: 'string',\n          description: 'End date of the billing period',\n          format: 'date-time'\n        },\n        meters: {\n          type: 'array',\n          description: 'List of meters and their usage for this billing period',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Meter identifier'\n              },\n              chargeable_units: {\n                type: 'string',\n                description: 'Chargeable units (after free threshold) as string for precision'\n              },\n              consumed_units: {\n                type: 'string',\n                description: 'Total units consumed as string for precision'\n              },\n              currency: {\n                $ref: '#/$defs/currency'\n              },\n              free_threshold: {\n                type: 'integer',\n                description: 'Free threshold units for this meter'\n              },\n              name: {\n                type: 'string',\n                description: 'Meter name'\n              },\n              price_per_unit: {\n                type: 'string',\n                description: 'Price per unit in string format for precision'\n              },\n              total_price: {\n                type: 'integer',\n                description: 'Total price charged for this meter in smallest currency unit (cents)'\n              }\n            },\n            required: [              'id',\n              'chargeable_units',\n              'consumed_units',\n              'currency',\n              'free_threshold',\n              'name',\n              'price_per_unit',\n              'total_price'\n            ]\n          }\n        },\n        start_date: {\n          type: 'string',\n          description: 'Start date of the billing period',\n          format: 'date-time'\n        }\n      },\n      required: [        'end_date',\n        'meters',\n        'start_date'\n      ]\n    },\n    currency: {\n      type: 'string',\n      enum: [        'AED',\n        'ALL',\n        'AMD',\n        'ANG',\n        'AOA',\n        'ARS',\n        'AUD',\n        'AWG',\n        'AZN',\n        'BAM',\n        'BBD',\n        'BDT',\n        'BGN',\n        'BHD',\n        'BIF',\n        'BMD',\n        'BND',\n        'BOB',\n        'BRL',\n        'BSD',\n        'BWP',\n        'BYN',\n        'BZD',\n        'CAD',\n        'CHF',\n        'CLP',\n        'CNY',\n        'COP',\n        'CRC',\n        'CUP',\n        'CVE',\n        'CZK',\n        'DJF',\n        'DKK',\n        'DOP',\n        'DZD',\n        'EGP',\n        'ETB',\n        'EUR',\n        'FJD',\n        'FKP',\n        'GBP',\n        'GEL',\n        'GHS',\n        'GIP',\n        'GMD',\n        'GNF',\n        'GTQ',\n        'GYD',\n        'HKD',\n        'HNL',\n        'HRK',\n        'HTG',\n        'HUF',\n        'IDR',\n        'ILS',\n        'INR',\n        'IQD',\n        'JMD',\n        'JOD',\n        'JPY',\n        'KES',\n        'KGS',\n        'KHR',\n        'KMF',\n        'KRW',\n        'KWD',\n        'KYD',\n        'KZT',\n        'LAK',\n        'LBP',\n        'LKR',\n        'LRD',\n        'LSL',\n        'LYD',\n        'MAD',\n        'MDL',\n        'MGA',\n        'MKD',\n        'MMK',\n        'MNT',\n        'MOP',\n        'MRU',\n        'MUR',\n        'MVR',\n        'MWK',\n        'MXN',\n        'MYR',\n        'MZN',\n        'NAD',\n        'NGN',\n        'NIO',\n        'NOK',\n        'NPR',\n        'NZD',\n        'OMR',\n        'PAB',\n        'PEN',\n        'PGK',\n        'PHP',\n        'PKR',\n        'PLN',\n        'PYG',\n        'QAR',\n        'RON',\n        'RSD',\n        'RUB',\n        'RWF',\n        'SAR',\n        'SBD',\n        'SCR',\n        'SEK',\n        'SGD',\n        'SHP',\n        'SLE',\n        'SLL',\n        'SOS',\n        'SRD',\n        'SSP',\n        'STN',\n        'SVC',\n        'SZL',\n        'THB',\n        'TND',\n        'TOP',\n        'TRY',\n        'TTD',\n        'TWD',\n        'TZS',\n        'UAH',\n        'UGX',\n        'USD',\n        'UYU',\n        'UZS',\n        'VES',\n        'VND',\n        'VUV',\n        'WST',\n        'XAF',\n        'XCD',\n        'XOF',\n        'XPF',\n        'YER',\n        'ZAR',\n        'ZMW'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      subscription_id: {
        type: 'string',
      },
      end_date: {
        type: 'string',
        description: 'Filter by end date (inclusive)',
        format: 'date-time',
      },
      meter_id: {
        type: 'string',
        description: 'Filter by specific meter ID',
      },
      page_number: {
        type: 'integer',
        description: 'Page number (default: 0)',
      },
      page_size: {
        type: 'integer',
        description: 'Page size (default: 10, max: 100)',
      },
      start_date: {
        type: 'string',
        description: 'Filter by start date (inclusive)',
        format: 'date-time',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['subscription_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const { subscription_id, jq_filter, ...body } = args as any;
  const response = await client.subscriptions.retrieveUsageHistory(subscription_id, body).asResponse();
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
