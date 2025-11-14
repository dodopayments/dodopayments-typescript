// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'products',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/products',
  operationId: 'create_product',
};

export const tool: Tool = {
  name: 'create_products',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the product',
      },
      price: {
        $ref: '#/$defs/price',
      },
      tax_category: {
        $ref: '#/$defs/tax_category',
      },
      addons: {
        type: 'array',
        description: 'Addons available for subscription product',
        items: {
          type: 'string',
        },
      },
      brand_id: {
        type: 'string',
        description: 'Brand id for the product, if not provided will default to primary brand',
      },
      description: {
        type: 'string',
        description: 'Optional description of the product',
      },
      digital_product_delivery: {
        type: 'object',
        title: 'Create Digital Product Delivery Request',
        description: 'Choose how you would like you digital product delivered',
        properties: {
          external_url: {
            type: 'string',
            description: 'External URL to digital product',
          },
          instructions: {
            type: 'string',
            description: 'Instructions to download and use the digital product',
          },
        },
      },
      license_key_activation_message: {
        type: 'string',
        description: 'Optional message displayed during license key activation',
      },
      license_key_activations_limit: {
        type: 'integer',
        description: 'The number of times the license key can be activated.\nMust be 0 or greater',
      },
      license_key_duration: {
        $ref: '#/$defs/license_key_duration',
      },
      license_key_enabled: {
        type: 'boolean',
        description: 'When true, generates and sends a license key to your customer.\nDefaults to false',
      },
      metadata: {
        type: 'object',
        description: 'Additional metadata for the product',
        additionalProperties: true,
      },
    },
    required: ['name', 'price', 'tax_category'],
    $defs: {
      price: {
        anyOf: [
          {
            type: 'object',
            title: 'One Time Price',
            description: 'One-time price details.',
            properties: {
              currency: {
                $ref: '#/$defs/currency',
              },
              discount: {
                type: 'integer',
                description: 'Discount applied to the price, represented as a percentage (0 to 100).',
              },
              price: {
                type: 'integer',
                description:
                  'The payment amount, in the smallest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.\n\nIf [`pay_what_you_want`](Self::pay_what_you_want) is set to `true`, this field represents\nthe **minimum** amount the customer must pay.',
              },
              purchasing_power_parity: {
                type: 'boolean',
                description:
                  'Indicates if purchasing power parity adjustments are applied to the price.\nPurchasing power parity feature is not available as of now.',
              },
              type: {
                type: 'string',
                enum: ['one_time_price'],
              },
              pay_what_you_want: {
                type: 'boolean',
                description:
                  'Indicates whether the customer can pay any amount they choose.\nIf set to `true`, the [`price`](Self::price) field is the minimum amount.',
              },
              suggested_price: {
                type: 'integer',
                description:
                  'A suggested price for the user to pay. This value is only considered if\n[`pay_what_you_want`](Self::pay_what_you_want) is `true`. Otherwise, it is ignored.',
              },
              tax_inclusive: {
                type: 'boolean',
                description: 'Indicates if the price is tax inclusive.',
              },
            },
            required: ['currency', 'discount', 'price', 'purchasing_power_parity', 'type'],
          },
          {
            type: 'object',
            title: 'Recurring Price',
            description: 'Recurring price details.',
            properties: {
              currency: {
                $ref: '#/$defs/currency',
              },
              discount: {
                type: 'integer',
                description: 'Discount applied to the price, represented as a percentage (0 to 100).',
              },
              payment_frequency_count: {
                type: 'integer',
                description:
                  'Number of units for the payment frequency.\nFor example, a value of `1` with a `payment_frequency_interval` of `month` represents monthly payments.',
              },
              payment_frequency_interval: {
                $ref: '#/$defs/time_interval',
              },
              price: {
                type: 'integer',
                description:
                  'The payment amount. Represented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.',
              },
              purchasing_power_parity: {
                type: 'boolean',
                description:
                  'Indicates if purchasing power parity adjustments are applied to the price.\nPurchasing power parity feature is not available as of now',
              },
              subscription_period_count: {
                type: 'integer',
                description:
                  'Number of units for the subscription period.\nFor example, a value of `12` with a `subscription_period_interval` of `month` represents a one-year subscription.',
              },
              subscription_period_interval: {
                $ref: '#/$defs/time_interval',
              },
              type: {
                type: 'string',
                enum: ['recurring_price'],
              },
              tax_inclusive: {
                type: 'boolean',
                description: 'Indicates if the price is tax inclusive',
              },
              trial_period_days: {
                type: 'integer',
                description: 'Number of days for the trial period. A value of `0` indicates no trial period.',
              },
            },
            required: [
              'currency',
              'discount',
              'payment_frequency_count',
              'payment_frequency_interval',
              'price',
              'purchasing_power_parity',
              'subscription_period_count',
              'subscription_period_interval',
              'type',
            ],
          },
          {
            type: 'object',
            title: 'Usage Based Price',
            description: 'Usage Based price details.',
            properties: {
              currency: {
                $ref: '#/$defs/currency',
              },
              discount: {
                type: 'integer',
                description: 'Discount applied to the price, represented as a percentage (0 to 100).',
              },
              fixed_price: {
                type: 'integer',
                description:
                  'The fixed payment amount. Represented in the lowest denomination of the currency (e.g., cents for USD).\nFor example, to charge $1.00, pass `100`.',
              },
              payment_frequency_count: {
                type: 'integer',
                description:
                  'Number of units for the payment frequency.\nFor example, a value of `1` with a `payment_frequency_interval` of `month` represents monthly payments.',
              },
              payment_frequency_interval: {
                $ref: '#/$defs/time_interval',
              },
              purchasing_power_parity: {
                type: 'boolean',
                description:
                  'Indicates if purchasing power parity adjustments are applied to the price.\nPurchasing power parity feature is not available as of now',
              },
              subscription_period_count: {
                type: 'integer',
                description:
                  'Number of units for the subscription period.\nFor example, a value of `12` with a `subscription_period_interval` of `month` represents a one-year subscription.',
              },
              subscription_period_interval: {
                $ref: '#/$defs/time_interval',
              },
              type: {
                type: 'string',
                enum: ['usage_based_price'],
              },
              meters: {
                type: 'array',
                items: {
                  $ref: '#/$defs/add_meter_to_price',
                },
              },
              tax_inclusive: {
                type: 'boolean',
                description: 'Indicates if the price is tax inclusive',
              },
            },
            required: [
              'currency',
              'discount',
              'fixed_price',
              'payment_frequency_count',
              'payment_frequency_interval',
              'purchasing_power_parity',
              'subscription_period_count',
              'subscription_period_interval',
              'type',
            ],
          },
        ],
        description: 'One-time price details.',
      },
      currency: {
        type: 'string',
        enum: [
          'AED',
          'ALL',
          'AMD',
          'ANG',
          'AOA',
          'ARS',
          'AUD',
          'AWG',
          'AZN',
          'BAM',
          'BBD',
          'BDT',
          'BGN',
          'BHD',
          'BIF',
          'BMD',
          'BND',
          'BOB',
          'BRL',
          'BSD',
          'BWP',
          'BYN',
          'BZD',
          'CAD',
          'CHF',
          'CLP',
          'CNY',
          'COP',
          'CRC',
          'CUP',
          'CVE',
          'CZK',
          'DJF',
          'DKK',
          'DOP',
          'DZD',
          'EGP',
          'ETB',
          'EUR',
          'FJD',
          'FKP',
          'GBP',
          'GEL',
          'GHS',
          'GIP',
          'GMD',
          'GNF',
          'GTQ',
          'GYD',
          'HKD',
          'HNL',
          'HRK',
          'HTG',
          'HUF',
          'IDR',
          'ILS',
          'INR',
          'IQD',
          'JMD',
          'JOD',
          'JPY',
          'KES',
          'KGS',
          'KHR',
          'KMF',
          'KRW',
          'KWD',
          'KYD',
          'KZT',
          'LAK',
          'LBP',
          'LKR',
          'LRD',
          'LSL',
          'LYD',
          'MAD',
          'MDL',
          'MGA',
          'MKD',
          'MMK',
          'MNT',
          'MOP',
          'MRU',
          'MUR',
          'MVR',
          'MWK',
          'MXN',
          'MYR',
          'MZN',
          'NAD',
          'NGN',
          'NIO',
          'NOK',
          'NPR',
          'NZD',
          'OMR',
          'PAB',
          'PEN',
          'PGK',
          'PHP',
          'PKR',
          'PLN',
          'PYG',
          'QAR',
          'RON',
          'RSD',
          'RUB',
          'RWF',
          'SAR',
          'SBD',
          'SCR',
          'SEK',
          'SGD',
          'SHP',
          'SLE',
          'SLL',
          'SOS',
          'SRD',
          'SSP',
          'STN',
          'SVC',
          'SZL',
          'THB',
          'TND',
          'TOP',
          'TRY',
          'TTD',
          'TWD',
          'TZS',
          'UAH',
          'UGX',
          'USD',
          'UYU',
          'UZS',
          'VES',
          'VND',
          'VUV',
          'WST',
          'XAF',
          'XCD',
          'XOF',
          'XPF',
          'YER',
          'ZAR',
          'ZMW',
        ],
      },
      time_interval: {
        type: 'string',
        enum: ['Day', 'Week', 'Month', 'Year'],
      },
      add_meter_to_price: {
        type: 'object',
        title: 'Add Meter To Price',
        properties: {
          meter_id: {
            type: 'string',
          },
          price_per_unit: {
            type: 'string',
            description:
              'The price per unit in lowest denomination. Must be greater than zero. Supports up to 5 digits before decimal point and 12 decimal places.',
          },
          description: {
            type: 'string',
            description: 'Meter description. Will ignored on Request, but will be shown in response',
          },
          free_threshold: {
            type: 'integer',
          },
          measurement_unit: {
            type: 'string',
            description: 'Meter measurement unit. Will ignored on Request, but will be shown in response',
          },
          name: {
            type: 'string',
            description: 'Meter name. Will ignored on Request, but will be shown in response',
          },
        },
        required: ['meter_id', 'price_per_unit'],
      },
      tax_category: {
        type: 'string',
        description:
          'Represents the different categories of taxation applicable to various products and services.',
        enum: ['digital_products', 'saas', 'e_book', 'edtech'],
      },
      license_key_duration: {
        type: 'object',
        title: 'License Key Duration',
        properties: {
          count: {
            type: 'integer',
          },
          interval: {
            $ref: '#/$defs/time_interval',
          },
        },
        required: ['count', 'interval'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.products.create(body));
};

export default { metadata, tool, handler };
