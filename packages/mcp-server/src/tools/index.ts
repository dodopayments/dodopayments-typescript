// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import create_payments from './payments/create-payments';
import retrieve_payments from './payments/retrieve-payments';
import list_payments from './payments/list-payments';
import retrieve_line_items_payments from './payments/retrieve-line-items-payments';
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
import create_products from './products/create-products';
import retrieve_products from './products/retrieve-products';
import update_products from './products/update-products';
import list_products from './products/list-products';
import delete_products from './products/delete-products';
import unarchive_products from './products/unarchive-products';
import update_files_products from './products/update-files-products';
import update_products_images from './products/images/update-products-images';
import list_supported_countries_misc from './misc/list-supported-countries-misc';
import create_discounts from './discounts/create-discounts';
import retrieve_discounts from './discounts/retrieve-discounts';
import update_discounts from './discounts/update-discounts';
import list_discounts from './discounts/list-discounts';
import delete_discounts from './discounts/delete-discounts';
import create_addons from './addons/create-addons';
import retrieve_addons from './addons/retrieve-addons';
import update_addons from './addons/update-addons';
import list_addons from './addons/list-addons';
import update_images_addons from './addons/update-images-addons';
import create_brands from './brands/create-brands';
import retrieve_brands from './brands/retrieve-brands';
import update_brands from './brands/update-brands';
import list_brands from './brands/list-brands';
import update_images_brands from './brands/update-images-brands';
import create_webhooks from './webhooks/create-webhooks';
import retrieve_webhooks from './webhooks/retrieve-webhooks';
import update_webhooks from './webhooks/update-webhooks';
import list_webhooks from './webhooks/list-webhooks';
import delete_webhooks from './webhooks/delete-webhooks';
import retrieve_secret_webhooks from './webhooks/retrieve-secret-webhooks';
import retrieve_webhooks_headers from './webhooks/headers/retrieve-webhooks-headers';
import update_webhooks_headers from './webhooks/headers/update-webhooks-headers';
import create_your_webhook_url from './your-webhook-url/create-your-webhook-url';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(create_payments);
addEndpoint(retrieve_payments);
addEndpoint(list_payments);
addEndpoint(retrieve_line_items_payments);
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
addEndpoint(create_products);
addEndpoint(retrieve_products);
addEndpoint(update_products);
addEndpoint(list_products);
addEndpoint(delete_products);
addEndpoint(unarchive_products);
addEndpoint(update_files_products);
addEndpoint(update_products_images);
addEndpoint(list_supported_countries_misc);
addEndpoint(create_discounts);
addEndpoint(retrieve_discounts);
addEndpoint(update_discounts);
addEndpoint(list_discounts);
addEndpoint(delete_discounts);
addEndpoint(create_addons);
addEndpoint(retrieve_addons);
addEndpoint(update_addons);
addEndpoint(list_addons);
addEndpoint(update_images_addons);
addEndpoint(create_brands);
addEndpoint(retrieve_brands);
addEndpoint(update_brands);
addEndpoint(list_brands);
addEndpoint(update_images_brands);
addEndpoint(create_webhooks);
addEndpoint(retrieve_webhooks);
addEndpoint(update_webhooks);
addEndpoint(list_webhooks);
addEndpoint(delete_webhooks);
addEndpoint(retrieve_secret_webhooks);
addEndpoint(retrieve_webhooks_headers);
addEndpoint(update_webhooks_headers);
addEndpoint(create_your_webhook_url);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
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
