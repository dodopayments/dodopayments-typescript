import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.checkoutSessions.create',
    fullyQualifiedName: 'checkoutSessions.create',
    httpMethod: 'post',
    httpPath: '/checkouts',
  },
  {
    clientCallName: 'client.checkoutSessions.retrieve',
    fullyQualifiedName: 'checkoutSessions.retrieve',
    httpMethod: 'get',
    httpPath: '/checkouts/{id}',
  },
  {
    clientCallName: 'client.checkoutSessions.preview',
    fullyQualifiedName: 'checkoutSessions.preview',
    httpMethod: 'post',
    httpPath: '/checkouts/preview',
  },
  {
    clientCallName: 'client.payments.create',
    fullyQualifiedName: 'payments.create',
    httpMethod: 'post',
    httpPath: '/payments',
  },
  {
    clientCallName: 'client.payments.retrieve',
    fullyQualifiedName: 'payments.retrieve',
    httpMethod: 'get',
    httpPath: '/payments/{payment_id}',
  },
  {
    clientCallName: 'client.payments.list',
    fullyQualifiedName: 'payments.list',
    httpMethod: 'get',
    httpPath: '/payments',
  },
  {
    clientCallName: 'client.payments.retrieveLineItems',
    fullyQualifiedName: 'payments.retrieveLineItems',
    httpMethod: 'get',
    httpPath: '/payments/{payment_id}/line-items',
  },
  {
    clientCallName: 'client.subscriptions.create',
    fullyQualifiedName: 'subscriptions.create',
    httpMethod: 'post',
    httpPath: '/subscriptions',
  },
  {
    clientCallName: 'client.subscriptions.retrieve',
    fullyQualifiedName: 'subscriptions.retrieve',
    httpMethod: 'get',
    httpPath: '/subscriptions/{subscription_id}',
  },
  {
    clientCallName: 'client.subscriptions.update',
    fullyQualifiedName: 'subscriptions.update',
    httpMethod: 'patch',
    httpPath: '/subscriptions/{subscription_id}',
  },
  {
    clientCallName: 'client.subscriptions.list',
    fullyQualifiedName: 'subscriptions.list',
    httpMethod: 'get',
    httpPath: '/subscriptions',
  },
  {
    clientCallName: 'client.subscriptions.changePlan',
    fullyQualifiedName: 'subscriptions.changePlan',
    httpMethod: 'post',
    httpPath: '/subscriptions/{subscription_id}/change-plan',
  },
  {
    clientCallName: 'client.subscriptions.charge',
    fullyQualifiedName: 'subscriptions.charge',
    httpMethod: 'post',
    httpPath: '/subscriptions/{subscription_id}/charge',
  },
  {
    clientCallName: 'client.subscriptions.previewChangePlan',
    fullyQualifiedName: 'subscriptions.previewChangePlan',
    httpMethod: 'post',
    httpPath: '/subscriptions/{subscription_id}/change-plan/preview',
  },
  {
    clientCallName: 'client.subscriptions.retrieveUsageHistory',
    fullyQualifiedName: 'subscriptions.retrieveUsageHistory',
    httpMethod: 'get',
    httpPath: '/subscriptions/{subscription_id}/usage-history',
  },
  {
    clientCallName: 'client.subscriptions.updatePaymentMethod',
    fullyQualifiedName: 'subscriptions.updatePaymentMethod',
    httpMethod: 'post',
    httpPath: '/subscriptions/{subscription_id}/update-payment-method',
  },
  {
    clientCallName: 'client.invoices.payments.retrieve',
    fullyQualifiedName: 'invoices.payments.retrieve',
    httpMethod: 'get',
    httpPath: '/invoices/payments/{payment_id}',
  },
  {
    clientCallName: 'client.invoices.payments.retrieveRefund',
    fullyQualifiedName: 'invoices.payments.retrieveRefund',
    httpMethod: 'get',
    httpPath: '/invoices/refunds/{refund_id}',
  },
  {
    clientCallName: 'client.licenses.activate',
    fullyQualifiedName: 'licenses.activate',
    httpMethod: 'post',
    httpPath: '/licenses/activate',
  },
  {
    clientCallName: 'client.licenses.deactivate',
    fullyQualifiedName: 'licenses.deactivate',
    httpMethod: 'post',
    httpPath: '/licenses/deactivate',
  },
  {
    clientCallName: 'client.licenses.validate',
    fullyQualifiedName: 'licenses.validate',
    httpMethod: 'post',
    httpPath: '/licenses/validate',
  },
  {
    clientCallName: 'client.licenseKeys.retrieve',
    fullyQualifiedName: 'licenseKeys.retrieve',
    httpMethod: 'get',
    httpPath: '/license_keys/{id}',
  },
  {
    clientCallName: 'client.licenseKeys.update',
    fullyQualifiedName: 'licenseKeys.update',
    httpMethod: 'patch',
    httpPath: '/license_keys/{id}',
  },
  {
    clientCallName: 'client.licenseKeys.list',
    fullyQualifiedName: 'licenseKeys.list',
    httpMethod: 'get',
    httpPath: '/license_keys',
  },
  {
    clientCallName: 'client.licenseKeyInstances.retrieve',
    fullyQualifiedName: 'licenseKeyInstances.retrieve',
    httpMethod: 'get',
    httpPath: '/license_key_instances/{id}',
  },
  {
    clientCallName: 'client.licenseKeyInstances.update',
    fullyQualifiedName: 'licenseKeyInstances.update',
    httpMethod: 'patch',
    httpPath: '/license_key_instances/{id}',
  },
  {
    clientCallName: 'client.licenseKeyInstances.list',
    fullyQualifiedName: 'licenseKeyInstances.list',
    httpMethod: 'get',
    httpPath: '/license_key_instances',
  },
  {
    clientCallName: 'client.customers.create',
    fullyQualifiedName: 'customers.create',
    httpMethod: 'post',
    httpPath: '/customers',
  },
  {
    clientCallName: 'client.customers.retrieve',
    fullyQualifiedName: 'customers.retrieve',
    httpMethod: 'get',
    httpPath: '/customers/{customer_id}',
  },
  {
    clientCallName: 'client.customers.update',
    fullyQualifiedName: 'customers.update',
    httpMethod: 'patch',
    httpPath: '/customers/{customer_id}',
  },
  {
    clientCallName: 'client.customers.list',
    fullyQualifiedName: 'customers.list',
    httpMethod: 'get',
    httpPath: '/customers',
  },
  {
    clientCallName: 'client.customers.retrievePaymentMethods',
    fullyQualifiedName: 'customers.retrievePaymentMethods',
    httpMethod: 'get',
    httpPath: '/customers/{customer_id}/payment-methods',
  },
  {
    clientCallName: 'client.customers.customerPortal.create',
    fullyQualifiedName: 'customers.customerPortal.create',
    httpMethod: 'post',
    httpPath: '/customers/{customer_id}/customer-portal/session',
  },
  {
    clientCallName: 'client.customers.wallets.list',
    fullyQualifiedName: 'customers.wallets.list',
    httpMethod: 'get',
    httpPath: '/customers/{customer_id}/wallets',
  },
  {
    clientCallName: 'client.customers.wallets.ledgerEntries.create',
    fullyQualifiedName: 'customers.wallets.ledgerEntries.create',
    httpMethod: 'post',
    httpPath: '/customers/{customer_id}/wallets/ledger-entries',
  },
  {
    clientCallName: 'client.customers.wallets.ledgerEntries.list',
    fullyQualifiedName: 'customers.wallets.ledgerEntries.list',
    httpMethod: 'get',
    httpPath: '/customers/{customer_id}/wallets/ledger-entries',
  },
  {
    clientCallName: 'client.refunds.create',
    fullyQualifiedName: 'refunds.create',
    httpMethod: 'post',
    httpPath: '/refunds',
  },
  {
    clientCallName: 'client.refunds.retrieve',
    fullyQualifiedName: 'refunds.retrieve',
    httpMethod: 'get',
    httpPath: '/refunds/{refund_id}',
  },
  {
    clientCallName: 'client.refunds.list',
    fullyQualifiedName: 'refunds.list',
    httpMethod: 'get',
    httpPath: '/refunds',
  },
  {
    clientCallName: 'client.disputes.retrieve',
    fullyQualifiedName: 'disputes.retrieve',
    httpMethod: 'get',
    httpPath: '/disputes/{dispute_id}',
  },
  {
    clientCallName: 'client.disputes.list',
    fullyQualifiedName: 'disputes.list',
    httpMethod: 'get',
    httpPath: '/disputes',
  },
  {
    clientCallName: 'client.payouts.list',
    fullyQualifiedName: 'payouts.list',
    httpMethod: 'get',
    httpPath: '/payouts',
  },
  {
    clientCallName: 'client.products.create',
    fullyQualifiedName: 'products.create',
    httpMethod: 'post',
    httpPath: '/products',
  },
  {
    clientCallName: 'client.products.retrieve',
    fullyQualifiedName: 'products.retrieve',
    httpMethod: 'get',
    httpPath: '/products/{id}',
  },
  {
    clientCallName: 'client.products.update',
    fullyQualifiedName: 'products.update',
    httpMethod: 'patch',
    httpPath: '/products/{id}',
  },
  {
    clientCallName: 'client.products.list',
    fullyQualifiedName: 'products.list',
    httpMethod: 'get',
    httpPath: '/products',
  },
  {
    clientCallName: 'client.products.archive',
    fullyQualifiedName: 'products.archive',
    httpMethod: 'delete',
    httpPath: '/products/{id}',
  },
  {
    clientCallName: 'client.products.unarchive',
    fullyQualifiedName: 'products.unarchive',
    httpMethod: 'post',
    httpPath: '/products/{id}/unarchive',
  },
  {
    clientCallName: 'client.products.updateFiles',
    fullyQualifiedName: 'products.updateFiles',
    httpMethod: 'put',
    httpPath: '/products/{id}/files',
  },
  {
    clientCallName: 'client.products.images.update',
    fullyQualifiedName: 'products.images.update',
    httpMethod: 'put',
    httpPath: '/products/{id}/images',
  },
  {
    clientCallName: 'client.products.shortLinks.create',
    fullyQualifiedName: 'products.shortLinks.create',
    httpMethod: 'post',
    httpPath: '/products/{id}/short_links',
  },
  {
    clientCallName: 'client.products.shortLinks.list',
    fullyQualifiedName: 'products.shortLinks.list',
    httpMethod: 'get',
    httpPath: '/products/short_links',
  },
  {
    clientCallName: 'client.misc.listSupportedCountries',
    fullyQualifiedName: 'misc.listSupportedCountries',
    httpMethod: 'get',
    httpPath: '/checkout/supported_countries',
  },
  {
    clientCallName: 'client.discounts.create',
    fullyQualifiedName: 'discounts.create',
    httpMethod: 'post',
    httpPath: '/discounts',
  },
  {
    clientCallName: 'client.discounts.retrieve',
    fullyQualifiedName: 'discounts.retrieve',
    httpMethod: 'get',
    httpPath: '/discounts/{discount_id}',
  },
  {
    clientCallName: 'client.discounts.update',
    fullyQualifiedName: 'discounts.update',
    httpMethod: 'patch',
    httpPath: '/discounts/{discount_id}',
  },
  {
    clientCallName: 'client.discounts.list',
    fullyQualifiedName: 'discounts.list',
    httpMethod: 'get',
    httpPath: '/discounts',
  },
  {
    clientCallName: 'client.discounts.delete',
    fullyQualifiedName: 'discounts.delete',
    httpMethod: 'delete',
    httpPath: '/discounts/{discount_id}',
  },
  {
    clientCallName: 'client.discounts.retrieveByCode',
    fullyQualifiedName: 'discounts.retrieveByCode',
    httpMethod: 'get',
    httpPath: '/discounts/code/{code}',
  },
  {
    clientCallName: 'client.addons.create',
    fullyQualifiedName: 'addons.create',
    httpMethod: 'post',
    httpPath: '/addons',
  },
  {
    clientCallName: 'client.addons.retrieve',
    fullyQualifiedName: 'addons.retrieve',
    httpMethod: 'get',
    httpPath: '/addons/{id}',
  },
  {
    clientCallName: 'client.addons.update',
    fullyQualifiedName: 'addons.update',
    httpMethod: 'patch',
    httpPath: '/addons/{id}',
  },
  {
    clientCallName: 'client.addons.list',
    fullyQualifiedName: 'addons.list',
    httpMethod: 'get',
    httpPath: '/addons',
  },
  {
    clientCallName: 'client.addons.updateImages',
    fullyQualifiedName: 'addons.updateImages',
    httpMethod: 'put',
    httpPath: '/addons/{id}/images',
  },
  {
    clientCallName: 'client.brands.create',
    fullyQualifiedName: 'brands.create',
    httpMethod: 'post',
    httpPath: '/brands',
  },
  {
    clientCallName: 'client.brands.retrieve',
    fullyQualifiedName: 'brands.retrieve',
    httpMethod: 'get',
    httpPath: '/brands/{id}',
  },
  {
    clientCallName: 'client.brands.update',
    fullyQualifiedName: 'brands.update',
    httpMethod: 'patch',
    httpPath: '/brands/{id}',
  },
  {
    clientCallName: 'client.brands.list',
    fullyQualifiedName: 'brands.list',
    httpMethod: 'get',
    httpPath: '/brands',
  },
  {
    clientCallName: 'client.brands.updateImages',
    fullyQualifiedName: 'brands.updateImages',
    httpMethod: 'put',
    httpPath: '/brands/{id}/images',
  },
  {
    clientCallName: 'client.webhooks.create',
    fullyQualifiedName: 'webhooks.create',
    httpMethod: 'post',
    httpPath: '/webhooks',
  },
  {
    clientCallName: 'client.webhooks.retrieve',
    fullyQualifiedName: 'webhooks.retrieve',
    httpMethod: 'get',
    httpPath: '/webhooks/{webhook_id}',
  },
  {
    clientCallName: 'client.webhooks.update',
    fullyQualifiedName: 'webhooks.update',
    httpMethod: 'patch',
    httpPath: '/webhooks/{webhook_id}',
  },
  {
    clientCallName: 'client.webhooks.list',
    fullyQualifiedName: 'webhooks.list',
    httpMethod: 'get',
    httpPath: '/webhooks',
  },
  {
    clientCallName: 'client.webhooks.delete',
    fullyQualifiedName: 'webhooks.delete',
    httpMethod: 'delete',
    httpPath: '/webhooks/{webhook_id}',
  },
  {
    clientCallName: 'client.webhooks.retrieveSecret',
    fullyQualifiedName: 'webhooks.retrieveSecret',
    httpMethod: 'get',
    httpPath: '/webhooks/{webhook_id}/secret',
  },
  { clientCallName: 'client.webhooks.unsafeUnwrap', fullyQualifiedName: 'webhooks.unsafeUnwrap' },
  { clientCallName: 'client.webhooks.unwrap', fullyQualifiedName: 'webhooks.unwrap' },
  {
    clientCallName: 'client.webhooks.headers.retrieve',
    fullyQualifiedName: 'webhooks.headers.retrieve',
    httpMethod: 'get',
    httpPath: '/webhooks/{webhook_id}/headers',
  },
  {
    clientCallName: 'client.webhooks.headers.update',
    fullyQualifiedName: 'webhooks.headers.update',
    httpMethod: 'patch',
    httpPath: '/webhooks/{webhook_id}/headers',
  },
  {
    clientCallName: 'client.usageEvents.retrieve',
    fullyQualifiedName: 'usageEvents.retrieve',
    httpMethod: 'get',
    httpPath: '/events/{event_id}',
  },
  {
    clientCallName: 'client.usageEvents.list',
    fullyQualifiedName: 'usageEvents.list',
    httpMethod: 'get',
    httpPath: '/events',
  },
  {
    clientCallName: 'client.usageEvents.ingest',
    fullyQualifiedName: 'usageEvents.ingest',
    httpMethod: 'post',
    httpPath: '/events/ingest',
  },
  {
    clientCallName: 'client.meters.create',
    fullyQualifiedName: 'meters.create',
    httpMethod: 'post',
    httpPath: '/meters',
  },
  {
    clientCallName: 'client.meters.retrieve',
    fullyQualifiedName: 'meters.retrieve',
    httpMethod: 'get',
    httpPath: '/meters/{id}',
  },
  {
    clientCallName: 'client.meters.list',
    fullyQualifiedName: 'meters.list',
    httpMethod: 'get',
    httpPath: '/meters',
  },
  {
    clientCallName: 'client.meters.archive',
    fullyQualifiedName: 'meters.archive',
    httpMethod: 'delete',
    httpPath: '/meters/{id}',
  },
  {
    clientCallName: 'client.meters.unarchive',
    fullyQualifiedName: 'meters.unarchive',
    httpMethod: 'post',
    httpPath: '/meters/{id}/unarchive',
  },
  {
    clientCallName: 'client.balances.retrieveLedger',
    fullyQualifiedName: 'balances.retrieveLedger',
    httpMethod: 'get',
    httpPath: '/balances/ledger',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
