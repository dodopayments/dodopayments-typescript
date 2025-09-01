// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'dodopayments-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import DodoPayments from 'dodopayments';

export const metadata: Metadata = {
  resource: 'meters',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/meters',
  operationId: 'create_meter',
};

export const tool: Tool = {
  name: 'create_meters',
  description: '',
  inputSchema: {
    type: 'object',
    properties: {
      aggregation: {
        $ref: '#/$defs/meter_aggregation',
      },
      event_name: {
        type: 'string',
        description: 'Event name to track',
      },
      measurement_unit: {
        type: 'string',
        description: 'measurement unit',
      },
      name: {
        type: 'string',
        description: 'Name of the meter',
      },
      description: {
        type: 'string',
        description: 'Optional description of the meter',
      },
      filter: {
        $ref: '#/$defs/meter_filter',
      },
    },
    required: ['aggregation', 'event_name', 'measurement_unit', 'name'],
    $defs: {
      meter_aggregation: {
        type: 'object',
        title: 'Meter Aggregation',
        properties: {
          type: {
            type: 'string',
            description: 'Aggregation type for the meter',
            enum: ['count', 'sum', 'unique_count', 'max', 'last'],
          },
          key: {
            type: 'string',
            description: 'Required when type is not COUNT',
          },
        },
        required: ['type'],
      },
      meter_filter: {
        type: 'object',
        title: 'Meter Filter',
        description:
          'A filter structure that combines multiple conditions with logical conjunctions (AND/OR).\n\nSupports up to 3 levels of nesting to create complex filter expressions.\nEach filter has a conjunction (and/or) and clauses that can be either direct conditions or nested filters.',
        properties: {
          clauses: {
            anyOf: [
              {
                type: 'array',
                title: 'Direct Filter Conditions',
                description:
                  'Direct filter conditions - array of condition objects with key, operator, and value',
                items: {
                  type: 'object',
                  title: 'MeterFilterCondition',
                  description: 'Filter condition with key, operator, and value',
                  properties: {
                    key: {
                      type: 'string',
                      description: 'Filter key to apply',
                    },
                    operator: {
                      type: 'string',
                      enum: [
                        'equals',
                        'not_equals',
                        'greater_than',
                        'greater_than_or_equals',
                        'less_than',
                        'less_than_or_equals',
                        'contains',
                        'does_not_contain',
                      ],
                    },
                    value: {
                      anyOf: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'number',
                        },
                        {
                          type: 'boolean',
                        },
                      ],
                      title: 'Filter Value',
                      description: 'Filter value - can be string, number, or boolean',
                    },
                  },
                  required: ['key', 'operator', 'value'],
                },
              },
              {
                type: 'array',
                title: 'Nested Meter Filters',
                description: 'Nested filters - supports up to 3 levels deep',
                items: {
                  type: 'object',
                  title: 'MeterFilter',
                  description: 'Level 1 nested filter - can contain Level 2 filters',
                  properties: {
                    clauses: {
                      anyOf: [
                        {
                          type: 'array',
                          title: 'Level 1 Filter Conditions',
                          description: 'Array of filter conditions',
                          items: {
                            type: 'object',
                            title: 'MeterFilterCondition',
                            description: 'Filter condition with key, operator, and value',
                            properties: {
                              key: {
                                type: 'string',
                                description: 'Filter key to apply',
                              },
                              operator: {
                                type: 'string',
                                enum: [
                                  'equals',
                                  'not_equals',
                                  'greater_than',
                                  'greater_than_or_equals',
                                  'less_than',
                                  'less_than_or_equals',
                                  'contains',
                                  'does_not_contain',
                                ],
                              },
                              value: {
                                anyOf: [
                                  {
                                    type: 'string',
                                  },
                                  {
                                    type: 'number',
                                  },
                                  {
                                    type: 'boolean',
                                  },
                                ],
                                title: 'Filter Value',
                                description: 'Filter value - can be string, number, or boolean',
                              },
                            },
                            required: ['key', 'operator', 'value'],
                          },
                        },
                        {
                          type: 'array',
                          title: 'Level 1 Nested Filters',
                          description: 'Array of level 2 nested filters',
                          items: {
                            type: 'object',
                            title: 'MeterFilter',
                            description: 'Level 2 nested filter',
                            properties: {
                              clauses: {
                                anyOf: [
                                  {
                                    type: 'array',
                                    title: 'Level 2 Filter Conditions',
                                    description: 'Array of filter conditions',
                                    items: {
                                      type: 'object',
                                      title: 'MeterFilterCondition',
                                      description: 'Filter condition with key, operator, and value',
                                      properties: {
                                        key: {
                                          type: 'string',
                                          description: 'Filter key to apply',
                                        },
                                        operator: {
                                          type: 'string',
                                          enum: [
                                            'equals',
                                            'not_equals',
                                            'greater_than',
                                            'greater_than_or_equals',
                                            'less_than',
                                            'less_than_or_equals',
                                            'contains',
                                            'does_not_contain',
                                          ],
                                        },
                                        value: {
                                          anyOf: [
                                            {
                                              type: 'string',
                                            },
                                            {
                                              type: 'number',
                                            },
                                            {
                                              type: 'boolean',
                                            },
                                          ],
                                          title: 'Filter Value',
                                          description: 'Filter value - can be string, number, or boolean',
                                        },
                                      },
                                      required: ['key', 'operator', 'value'],
                                    },
                                  },
                                  {
                                    type: 'array',
                                    title: 'Level 2 Nested Filters',
                                    description: 'Array of level 3 nested filters (final level)',
                                    items: {
                                      type: 'object',
                                      title: 'MeterFilter',
                                      description: 'Level 3 nested filter (final nesting level)',
                                      properties: {
                                        clauses: {
                                          type: 'array',
                                          title: 'Level 3 Filter Conditions',
                                          description: 'Level 3: Filter conditions only (max depth reached)',
                                          items: {
                                            type: 'object',
                                            title: 'MeterFilterCondition',
                                            description: 'Filter condition with key, operator, and value',
                                            properties: {
                                              key: {
                                                type: 'string',
                                                description: 'Filter key to apply',
                                              },
                                              operator: {
                                                type: 'string',
                                                enum: [
                                                  'equals',
                                                  'not_equals',
                                                  'greater_than',
                                                  'greater_than_or_equals',
                                                  'less_than',
                                                  'less_than_or_equals',
                                                  'contains',
                                                  'does_not_contain',
                                                ],
                                              },
                                              value: {
                                                anyOf: [
                                                  {
                                                    type: 'string',
                                                  },
                                                  {
                                                    type: 'number',
                                                  },
                                                  {
                                                    type: 'boolean',
                                                  },
                                                ],
                                                title: 'Filter Value',
                                                description:
                                                  'Filter value - can be string, number, or boolean',
                                              },
                                            },
                                            required: ['key', 'operator', 'value'],
                                          },
                                        },
                                        conjunction: {
                                          type: 'string',
                                          enum: ['and', 'or'],
                                        },
                                      },
                                      required: ['clauses', 'conjunction'],
                                    },
                                  },
                                ],
                                title: 'Level 2 Clause',
                                description:
                                  'Level 2: Can be conditions or nested filters (1 more level allowed)',
                              },
                              conjunction: {
                                type: 'string',
                                enum: ['and', 'or'],
                              },
                            },
                            required: ['clauses', 'conjunction'],
                          },
                        },
                      ],
                      title: 'Level 1 Clause',
                      description: 'Level 1: Can be conditions or nested filters (2 more levels allowed)',
                    },
                    conjunction: {
                      type: 'string',
                      enum: ['and', 'or'],
                    },
                  },
                  required: ['clauses', 'conjunction'],
                },
              },
            ],
            title: 'FilterType',
            description: 'Filter clauses - can be direct conditions or nested filters (up to 3 levels deep)',
          },
          conjunction: {
            type: 'string',
            description: 'Logical conjunction to apply between clauses (and/or)',
            enum: ['and', 'or'],
          },
        },
        required: ['clauses', 'conjunction'],
      },
    },
  },
  annotations: {},
};

export const handler = async (client: DodoPayments, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.meters.create(body));
};

export default { metadata, tool, handler };
