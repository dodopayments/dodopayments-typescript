// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as MiscAPI from './misc';
import * as PaymentsAPI from './payments';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Subscriptions extends APIResource {
  create(
    body: SubscriptionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionCreateResponse> {
    return this._client.post('/subscriptions', { body, ...options });
  }

  retrieve(subscriptionId: string, options?: Core.RequestOptions): Core.APIPromise<Subscription> {
    return this._client.get(`/subscriptions/${subscriptionId}`, options);
  }

  update(
    subscriptionId: string,
    body: SubscriptionUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Subscription> {
    return this._client.patch(`/subscriptions/${subscriptionId}`, { body, ...options });
  }

  list(
    query?: SubscriptionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionListResponsesDefaultPageNumberPagination, SubscriptionListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionListResponsesDefaultPageNumberPagination, SubscriptionListResponse>;
  list(
    query: SubscriptionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<SubscriptionListResponsesDefaultPageNumberPagination, SubscriptionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/subscriptions', SubscriptionListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }

  changePlan(
    subscriptionId: string,
    body: SubscriptionChangePlanParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post(`/subscriptions/${subscriptionId}/change-plan`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  charge(
    subscriptionId: string,
    body: SubscriptionChargeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SubscriptionChargeResponse> {
    return this._client.post(`/subscriptions/${subscriptionId}/charge`, { body, ...options });
  }

  /**
   * Get detailed usage history for a subscription that includes usage-based billing
   * (metered components). This endpoint provides insights into customer usage
   * patterns and billing calculations over time.
   *
   * ## What You'll Get:
   *
   * - **Billing periods**: Each item represents a billing cycle with start and end
   *   dates
   * - **Meter usage**: Detailed breakdown of usage for each meter configured on the
   *   subscription
   * - **Usage calculations**: Total units consumed, free threshold units, and
   *   chargeable units
   * - **Historical tracking**: Complete audit trail of usage-based charges
   *
   * ## Use Cases:
   *
   * - **Customer support**: Investigate billing questions and usage discrepancies
   * - **Usage analytics**: Analyze customer consumption patterns over time
   * - **Billing transparency**: Provide customers with detailed usage breakdowns
   * - **Revenue optimization**: Identify usage trends to optimize pricing strategies
   *
   * ## Filtering Options:
   *
   * - **Date range filtering**: Get usage history for specific time periods
   * - **Meter-specific filtering**: Focus on usage for a particular meter
   * - **Pagination**: Navigate through large usage histories efficiently
   *
   * ## Important Notes:
   *
   * - Only returns data for subscriptions with usage-based (metered) components
   * - Usage history is organized by billing periods (subscription cycles)
   * - Free threshold units are calculated and displayed separately from chargeable
   *   units
   * - Historical data is preserved even if meter configurations change
   *
   * ## Example Query Patterns:
   *
   * - Get last 3 months:
   *   `?start_date=2024-01-01T00:00:00Z&end_date=2024-03-31T23:59:59Z`
   * - Filter by meter: `?meter_id=mtr_api_requests`
   * - Paginate results: `?page_size=20&page_number=1`
   * - Recent usage: `?start_date=2024-03-01T00:00:00Z` (from March 1st to now)
   */
  retrieveUsageHistory(
    subscriptionId: string,
    query?: SubscriptionRetrieveUsageHistoryParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<
    SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
    SubscriptionRetrieveUsageHistoryResponse
  >;
  retrieveUsageHistory(
    subscriptionId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<
    SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
    SubscriptionRetrieveUsageHistoryResponse
  >;
  retrieveUsageHistory(
    subscriptionId: string,
    query: SubscriptionRetrieveUsageHistoryParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<
    SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
    SubscriptionRetrieveUsageHistoryResponse
  > {
    if (isRequestOptions(query)) {
      return this.retrieveUsageHistory(subscriptionId, {}, query);
    }
    return this._client.getAPIList(
      `/subscriptions/${subscriptionId}/usage-history`,
      SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
      { query, ...options },
    );
  }
}

export class SubscriptionListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<SubscriptionListResponse> {}

export class SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<SubscriptionRetrieveUsageHistoryResponse> {}

/**
 * Response struct representing subscription details
 */
export interface AddonCartResponseItem {
  addon_id: string;

  quantity: number;
}

export interface AttachAddon {
  addon_id: string;

  quantity: number;
}

export interface OnDemandSubscription {
  /**
   * If set as True, does not perform any charge and only authorizes payment method
   * details for future use.
   */
  mandate_only: boolean;

  /**
   * Whether adaptive currency fees should be included in the product_price (true) or
   * added on top (false). This field is ignored if adaptive pricing is not enabled
   * for the business.
   */
  adaptive_currency_fees_inclusive?: boolean | null;

  /**
   * Optional currency of the product price. If not specified, defaults to the
   * currency of the product.
   */
  product_currency?: MiscAPI.Currency | null;

  /**
   * Optional product description override for billing and line items. If not
   * specified, the stored description of the product will be used.
   */
  product_description?: string | null;

  /**
   * Product price for the initial charge to customer If not specified the stored
   * price of the product will be used Represented in the lowest denomination of the
   * currency (e.g., cents for USD). For example, to charge $1.00, pass `100`.
   */
  product_price?: number | null;
}

/**
 * Response struct representing subscription details
 */
export interface Subscription {
  /**
   * Addons associated with this subscription
   */
  addons: Array<AddonCartResponseItem>;

  /**
   * Billing address details for payments
   */
  billing: PaymentsAPI.BillingAddress;

  /**
   * Indicates if the subscription will cancel at the next billing date
   */
  cancel_at_next_billing_date: boolean;

  /**
   * Timestamp when the subscription was created
   */
  created_at: string;

  /**
   * Currency used for the subscription payments
   */
  currency: MiscAPI.Currency;

  /**
   * Customer details associated with the subscription
   */
  customer: PaymentsAPI.CustomerLimitedDetails;

  /**
   * Additional custom data associated with the subscription
   */
  metadata: { [key: string]: string };

  /**
   * Meters associated with this subscription (for usage-based billing)
   */
  meters: Array<Subscription.Meter>;

  /**
   * Timestamp of the next scheduled billing. Indicates the end of current billing
   * period
   */
  next_billing_date: string;

  /**
   * Wether the subscription is on-demand or not
   */
  on_demand: boolean;

  /**
   * Number of payment frequency intervals
   */
  payment_frequency_count: number;

  /**
   * Time interval for payment frequency (e.g. month, year)
   */
  payment_frequency_interval: TimeInterval;

  /**
   * Timestamp of the last payment. Indicates the start of current billing period
   */
  previous_billing_date: string;

  /**
   * Identifier of the product associated with this subscription
   */
  product_id: string;

  /**
   * Number of units/items included in the subscription
   */
  quantity: number;

  /**
   * Amount charged before tax for each recurring payment in smallest currency unit
   * (e.g. cents)
   */
  recurring_pre_tax_amount: number;

  /**
   * Current status of the subscription
   */
  status: SubscriptionStatus;

  /**
   * Unique identifier for the subscription
   */
  subscription_id: string;

  /**
   * Number of subscription period intervals
   */
  subscription_period_count: number;

  /**
   * Time interval for the subscription period (e.g. month, year)
   */
  subscription_period_interval: TimeInterval;

  /**
   * Indicates if the recurring_pre_tax_amount is tax inclusive
   */
  tax_inclusive: boolean;

  /**
   * Number of days in the trial period (0 if no trial)
   */
  trial_period_days: number;

  /**
   * Cancelled timestamp if the subscription is cancelled
   */
  cancelled_at?: string | null;

  /**
   * Number of remaining discount cycles if discount is applied
   */
  discount_cycles_remaining?: number | null;

  /**
   * The discount id if discount is applied
   */
  discount_id?: string | null;

  /**
   * Timestamp when the subscription will expire
   */
  expires_at?: string | null;
}

export namespace Subscription {
  /**
   * Response struct representing usage-based meter cart details for a subscription
   */
  export interface Meter {
    currency: MiscAPI.Currency;

    free_threshold: number;

    measurement_unit: string;

    meter_id: string;

    name: string;

    price_per_unit: string;

    description?: string | null;
  }
}

export type SubscriptionStatus = 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired';

export type TimeInterval = 'Day' | 'Week' | 'Month' | 'Year';

export interface SubscriptionCreateResponse {
  /**
   * Addons associated with this subscription
   */
  addons: Array<AddonCartResponseItem>;

  /**
   * Customer details associated with this subscription
   */
  customer: PaymentsAPI.CustomerLimitedDetails;

  /**
   * Additional metadata associated with the subscription
   */
  metadata: { [key: string]: string };

  /**
   * First payment id for the subscription
   */
  payment_id: string;

  /**
   * Tax will be added to the amount and charged to the customer on each billing
   * cycle
   */
  recurring_pre_tax_amount: number;

  /**
   * Unique identifier for the subscription
   */
  subscription_id: string;

  /**
   * Client secret used to load Dodo checkout SDK NOTE : Dodo checkout SDK will be
   * coming soon
   */
  client_secret?: string | null;

  /**
   * The discount id if discount is applied
   */
  discount_id?: string | null;

  /**
   * Expiry timestamp of the payment link
   */
  expires_on?: string | null;

  /**
   * URL to checkout page
   */
  payment_link?: string | null;
}

/**
 * Response struct representing subscription details
 */
export interface SubscriptionListResponse {
  /**
   * Billing address details for payments
   */
  billing: PaymentsAPI.BillingAddress;

  /**
   * Indicates if the subscription will cancel at the next billing date
   */
  cancel_at_next_billing_date: boolean;

  /**
   * Timestamp when the subscription was created
   */
  created_at: string;

  /**
   * Currency used for the subscription payments
   */
  currency: MiscAPI.Currency;

  /**
   * Customer details associated with the subscription
   */
  customer: PaymentsAPI.CustomerLimitedDetails;

  /**
   * Additional custom data associated with the subscription
   */
  metadata: { [key: string]: string };

  /**
   * Timestamp of the next scheduled billing. Indicates the end of current billing
   * period
   */
  next_billing_date: string;

  /**
   * Wether the subscription is on-demand or not
   */
  on_demand: boolean;

  /**
   * Number of payment frequency intervals
   */
  payment_frequency_count: number;

  /**
   * Time interval for payment frequency (e.g. month, year)
   */
  payment_frequency_interval: TimeInterval;

  /**
   * Timestamp of the last payment. Indicates the start of current billing period
   */
  previous_billing_date: string;

  /**
   * Identifier of the product associated with this subscription
   */
  product_id: string;

  /**
   * Number of units/items included in the subscription
   */
  quantity: number;

  /**
   * Amount charged before tax for each recurring payment in smallest currency unit
   * (e.g. cents)
   */
  recurring_pre_tax_amount: number;

  /**
   * Current status of the subscription
   */
  status: SubscriptionStatus;

  /**
   * Unique identifier for the subscription
   */
  subscription_id: string;

  /**
   * Number of subscription period intervals
   */
  subscription_period_count: number;

  /**
   * Time interval for the subscription period (e.g. month, year)
   */
  subscription_period_interval: TimeInterval;

  /**
   * Indicates if the recurring_pre_tax_amount is tax inclusive
   */
  tax_inclusive: boolean;

  /**
   * Number of days in the trial period (0 if no trial)
   */
  trial_period_days: number;

  /**
   * Cancelled timestamp if the subscription is cancelled
   */
  cancelled_at?: string | null;

  /**
   * Number of remaining discount cycles if discount is applied
   */
  discount_cycles_remaining?: number | null;

  /**
   * The discount id if discount is applied
   */
  discount_id?: string | null;
}

export interface SubscriptionChargeResponse {
  payment_id: string;
}

export interface SubscriptionRetrieveUsageHistoryResponse {
  /**
   * End date of the billing period
   */
  end_date: string;

  /**
   * List of meters and their usage for this billing period
   */
  meters: Array<SubscriptionRetrieveUsageHistoryResponse.Meter>;

  /**
   * Start date of the billing period
   */
  start_date: string;
}

export namespace SubscriptionRetrieveUsageHistoryResponse {
  export interface Meter {
    /**
     * Meter identifier
     */
    id: string;

    /**
     * Chargeable units (after free threshold) as string for precision
     */
    chargeable_units: string;

    /**
     * Total units consumed as string for precision
     */
    consumed_units: string;

    /**
     * Currency for the price per unit
     */
    currency: MiscAPI.Currency;

    /**
     * Free threshold units for this meter
     */
    free_threshold: number;

    /**
     * Meter name
     */
    name: string;

    /**
     * Price per unit in string format for precision
     */
    price_per_unit: string;

    /**
     * Total price charged for this meter in smallest currency unit (cents)
     */
    total_price: number;
  }
}

export interface SubscriptionCreateParams {
  /**
   * Billing address information for the subscription
   */
  billing: PaymentsAPI.BillingAddress;

  /**
   * Customer details for the subscription
   */
  customer: PaymentsAPI.CustomerRequest;

  /**
   * Unique identifier of the product to subscribe to
   */
  product_id: string;

  /**
   * Number of units to subscribe for. Must be at least 1.
   */
  quantity: number;

  /**
   * Attach addons to this subscription
   */
  addons?: Array<AttachAddon> | null;

  /**
   * List of payment methods allowed during checkout.
   *
   * Customers will **never** see payment methods that are **not** in this list.
   * However, adding a method here **does not guarantee** customers will see it.
   * Availability still depends on other factors (e.g., customer location, merchant
   * settings).
   */
  allowed_payment_method_types?: Array<PaymentsAPI.PaymentMethodTypes> | null;

  /**
   * Fix the currency in which the end customer is billed. If Dodo Payments cannot
   * support that currency for this transaction, it will not proceed
   */
  billing_currency?: MiscAPI.Currency | null;

  /**
   * Discount Code to apply to the subscription
   */
  discount_code?: string | null;

  /**
   * Additional metadata for the subscription Defaults to empty if not specified
   */
  metadata?: { [key: string]: string };

  on_demand?: OnDemandSubscription | null;

  /**
   * If true, generates a payment link. Defaults to false if not specified.
   */
  payment_link?: boolean | null;

  /**
   * Optional URL to redirect after successful subscription creation
   */
  return_url?: string | null;

  /**
   * Display saved payment methods of a returning customer False by default
   */
  show_saved_payment_methods?: boolean;

  /**
   * Tax ID in case the payment is B2B. If tax id validation fails the payment
   * creation will fail
   */
  tax_id?: string | null;

  /**
   * Optional trial period in days If specified, this value overrides the trial
   * period set in the product's price Must be between 0 and 10000 days
   */
  trial_period_days?: number | null;
}

export interface SubscriptionUpdateParams {
  billing?: PaymentsAPI.BillingAddress | null;

  /**
   * When set, the subscription will remain active until the end of billing period
   */
  cancel_at_next_billing_date?: boolean | null;

  disable_on_demand?: SubscriptionUpdateParams.DisableOnDemand | null;

  metadata?: { [key: string]: string } | null;

  next_billing_date?: string | null;

  status?: SubscriptionStatus | null;

  tax_id?: string | null;
}

export namespace SubscriptionUpdateParams {
  export interface DisableOnDemand {
    next_billing_date: string;
  }
}

export interface SubscriptionListParams extends DefaultPageNumberPaginationParams {
  /**
   * filter by Brand id
   */
  brand_id?: string;

  /**
   * Get events after this created time
   */
  created_at_gte?: string;

  /**
   * Get events created before this time
   */
  created_at_lte?: string;

  /**
   * Filter by customer id
   */
  customer_id?: string;

  /**
   * Filter by status
   */
  status?: 'pending' | 'active' | 'on_hold' | 'cancelled' | 'failed' | 'expired';
}

export interface SubscriptionChangePlanParams {
  /**
   * Unique identifier of the product to subscribe to
   */
  product_id: string;

  /**
   * Proration Billing Mode
   */
  proration_billing_mode: 'prorated_immediately' | 'full_immediately' | 'difference_immediately';

  /**
   * Number of units to subscribe for. Must be at least 1.
   */
  quantity: number;

  /**
   * Addons for the new plan. Note : Leaving this empty would remove any existing
   * addons
   */
  addons?: Array<AttachAddon> | null;
}

export interface SubscriptionChargeParams {
  /**
   * The product price. Represented in the lowest denomination of the currency (e.g.,
   * cents for USD). For example, to charge $1.00, pass `100`.
   */
  product_price: number;

  /**
   * Whether adaptive currency fees should be included in the product_price (true) or
   * added on top (false). This field is ignored if adaptive pricing is not enabled
   * for the business.
   */
  adaptive_currency_fees_inclusive?: boolean | null;

  /**
   * Specify how customer balance is used for the payment
   */
  customer_balance_config?: SubscriptionChargeParams.CustomerBalanceConfig | null;

  /**
   * Metadata for the payment. If not passed, the metadata of the subscription will
   * be taken
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Optional currency of the product price. If not specified, defaults to the
   * currency of the product.
   */
  product_currency?: MiscAPI.Currency | null;

  /**
   * Optional product description override for billing and line items. If not
   * specified, the stored description of the product will be used.
   */
  product_description?: string | null;
}

export namespace SubscriptionChargeParams {
  /**
   * Specify how customer balance is used for the payment
   */
  export interface CustomerBalanceConfig {
    /**
     * Allows Customer Credit to be purchased to settle payments
     */
    allow_customer_credits_purchase?: boolean | null;

    /**
     * Allows Customer Credit Balance to be used to settle payments
     */
    allow_customer_credits_usage?: boolean | null;
  }
}

export interface SubscriptionRetrieveUsageHistoryParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by end date (inclusive)
   */
  end_date?: string | null;

  /**
   * Filter by specific meter ID
   */
  meter_id?: string | null;

  /**
   * Filter by start date (inclusive)
   */
  start_date?: string | null;
}

Subscriptions.SubscriptionListResponsesDefaultPageNumberPagination =
  SubscriptionListResponsesDefaultPageNumberPagination;
Subscriptions.SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination =
  SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination;

export declare namespace Subscriptions {
  export {
    type AddonCartResponseItem as AddonCartResponseItem,
    type AttachAddon as AttachAddon,
    type OnDemandSubscription as OnDemandSubscription,
    type Subscription as Subscription,
    type SubscriptionStatus as SubscriptionStatus,
    type TimeInterval as TimeInterval,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionListResponse as SubscriptionListResponse,
    type SubscriptionChargeResponse as SubscriptionChargeResponse,
    type SubscriptionRetrieveUsageHistoryResponse as SubscriptionRetrieveUsageHistoryResponse,
    SubscriptionListResponsesDefaultPageNumberPagination as SubscriptionListResponsesDefaultPageNumberPagination,
    SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination as SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionChangePlanParams as SubscriptionChangePlanParams,
    type SubscriptionChargeParams as SubscriptionChargeParams,
    type SubscriptionRetrieveUsageHistoryParams as SubscriptionRetrieveUsageHistoryParams,
  };
}
