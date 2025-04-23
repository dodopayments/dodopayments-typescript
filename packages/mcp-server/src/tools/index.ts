// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

import create_payments from './payments/create-payments';
import retrieve_payments from './payments/retrieve-payments';
import list_payments from './payments/list-payments';
import create_subscriptions from './subscriptions/create-subscriptions';
import retrieve_subscriptions from './subscriptions/retrieve-subscriptions';
import update_subscriptions from './subscriptions/update-subscriptions';
import list_subscriptions from './subscriptions/list-subscriptions';
import change_plan_subscriptions from './subscriptions/change-plan-subscriptions';
import charge_subscriptions from './subscriptions/charge-subscriptions';
import retrieve_invoices_payments from './invoices/payments/retrieve-invoices-payments';
import activate_licenses from './licenses/activate-licenses';
import deactivate_licenses from './licenses/deactivate-licenses';
import validate_licenses from './licenses/validate-licenses';
import retrieve_license_keys from './license-keys/retrieve-license-keys';
import update_license_keys from './license-keys/update-license-keys';
import list_license_keys from './license-keys/list-license-keys';
import retrieve_license_key_instances from './license-key-instances/retrieve-license-key-instances';
import update_license_key_instances from './license-key-instances/update-license-key-instances';
import list_license_key_instances from './license-key-instances/list-license-key-instances';
import create_customers from './customers/create-customers';
import retrieve_customers from './customers/retrieve-customers';
import update_customers from './customers/update-customers';
import list_customers from './customers/list-customers';
import create_customers_customer_portal from './customers/customer-portal/create-customers-customer-portal';
import create_refunds from './refunds/create-refunds';
import retrieve_refunds from './refunds/retrieve-refunds';
import list_refunds from './refunds/list-refunds';
import retrieve_disputes from './disputes/retrieve-disputes';
import list_disputes from './disputes/list-disputes';
import list_payouts from './payouts/list-payouts';
import retrieve_webhook_events from './webhook-events/retrieve-webhook-events';
import list_webhook_events from './webhook-events/list-webhook-events';
import create_products from './products/create-products';
import retrieve_products from './products/retrieve-products';
import update_products from './products/update-products';
import list_products from './products/list-products';
import delete_products from './products/delete-products';
import unarchive_products from './products/unarchive-products';
import update_products_images from './products/images/update-products-images';
import list_supported_countries_misc from './misc/list-supported-countries-misc';
import create_discounts from './discounts/create-discounts';
import retrieve_discounts from './discounts/retrieve-discounts';
import update_discounts from './discounts/update-discounts';
import list_discounts from './discounts/list-discounts';
import delete_discounts from './discounts/delete-discounts';

export type HandlerFunction = (client: DodoPayments, args: any) => Promise<any>;

export type Metadata = {
  resource: string;
  operation: 'read' | 'write';
  tags: string[];
};

export type Endpoint = {
  metadata: Metadata;
  tool: Tool;
  handler: HandlerFunction;
};

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_payments);
addEndpoint(retrieve_payments);
addEndpoint(list_payments);
addEndpoint(create_subscriptions);
addEndpoint(retrieve_subscriptions);
addEndpoint(update_subscriptions);
addEndpoint(list_subscriptions);
addEndpoint(change_plan_subscriptions);
addEndpoint(charge_subscriptions);
addEndpoint(retrieve_invoices_payments);
addEndpoint(activate_licenses);
addEndpoint(deactivate_licenses);
addEndpoint(validate_licenses);
addEndpoint(retrieve_license_keys);
addEndpoint(update_license_keys);
addEndpoint(list_license_keys);
addEndpoint(retrieve_license_key_instances);
addEndpoint(update_license_key_instances);
addEndpoint(list_license_key_instances);
addEndpoint(create_customers);
addEndpoint(retrieve_customers);
addEndpoint(update_customers);
addEndpoint(list_customers);
addEndpoint(create_customers_customer_portal);
addEndpoint(create_refunds);
addEndpoint(retrieve_refunds);
addEndpoint(list_refunds);
addEndpoint(retrieve_disputes);
addEndpoint(list_disputes);
addEndpoint(list_payouts);
addEndpoint(retrieve_webhook_events);
addEndpoint(list_webhook_events);
addEndpoint(create_products);
addEndpoint(retrieve_products);
addEndpoint(update_products);
addEndpoint(list_products);
addEndpoint(delete_products);
addEndpoint(unarchive_products);
addEndpoint(update_products_images);
addEndpoint(list_supported_countries_misc);
addEndpoint(create_discounts);
addEndpoint(retrieve_discounts);
addEndpoint(update_discounts);
addEndpoint(list_discounts);
addEndpoint(delete_discounts);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  if (filters.length === 0) {
    return endpoints;
  }
  const allExcludes = filters.every((filter) => filter.op === 'exclude');

  return endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        included = filter.op === 'include';
      }
    }

    return included;
  });
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
