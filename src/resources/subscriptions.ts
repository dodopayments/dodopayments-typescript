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
}

export class SubscriptionListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<SubscriptionListResponse> {}

/**
 * Response struct representing subscription details
 */
export interface AddonCartResponseItem {
  addon_id: string;

  quantity: number;
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
   * The discount id if discount is applied
   */
  discount_id?: string | null;
}

export type SubscriptionStatus =
  | 'pending'
  | 'active'
  | 'on_hold'
  | 'paused'
  | 'cancelled'
  | 'failed'
  | 'expired';

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
   * The discount id if discount is applied
   */
  discount_id?: string | null;
}

export interface SubscriptionChargeResponse {
  payment_id: string;
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
  addons?: Array<SubscriptionCreateParams.Addon> | null;

  /**
   * List of payment methods allowed during checkout.
   *
   * Customers will **never** see payment methods that are **not** in this list.
   * However, adding a method here **does not guarantee** customers will see it.
   * Availability still depends on other factors (e.g., customer location, merchant
   * settings).
   */
  allowed_payment_method_types?: Array<
    | 'credit'
    | 'debit'
    | 'upi_collect'
    | 'upi_intent'
    | 'apple_pay'
    | 'cashapp'
    | 'google_pay'
    | 'multibanco'
    | 'bancontact_card'
    | 'eps'
    | 'ideal'
    | 'przelewy24'
    | 'affirm'
    | 'klarna'
    | 'sepa'
    | 'ach'
    | 'amazon_pay'
    | 'afterpay_clearpay'
  > | null;

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

  on_demand?: SubscriptionCreateParams.OnDemand | null;

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

export namespace SubscriptionCreateParams {
  export interface Addon {
    addon_id: string;

    quantity: number;
  }

  export interface OnDemand {
    /**
     * If set as True, does not perform any charge and only authorizes payment method
     * details for future use.
     */
    mandate_only: boolean;

    /**
     * Product price for the initial charge to customer If not specified the stored
     * price of the product will be used Represented in the lowest denomination of the
     * currency (e.g., cents for USD). For example, to charge $1.00, pass `100`.
     */
    product_price?: number | null;
  }
}

export interface SubscriptionUpdateParams {
  billing?: PaymentsAPI.BillingAddress | null;

  cancel_at_next_billing_date?: boolean | null;

  disable_on_demand?: SubscriptionUpdateParams.DisableOnDemand | null;

  metadata?: { [key: string]: string } | null;

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
  status?: 'pending' | 'active' | 'on_hold' | 'paused' | 'cancelled' | 'failed' | 'expired';
}

export interface SubscriptionChangePlanParams {
  /**
   * Unique identifier of the product to subscribe to
   */
  product_id: string;

  /**
   * Proration Billing Mode
   */
  proration_billing_mode: 'prorated_immediately' | 'full_immediately';

  /**
   * Number of units to subscribe for. Must be at least 1.
   */
  quantity: number;

  /**
   * Addons for the new plan. Note : Leaving this empty would remove any existing
   * addons
   */
  addons?: Array<SubscriptionChangePlanParams.Addon> | null;
}

export namespace SubscriptionChangePlanParams {
  export interface Addon {
    addon_id: string;

    quantity: number;
  }
}

export interface SubscriptionChargeParams {
  /**
   * The product price. Represented in the lowest denomination of the currency (e.g.,
   * cents for USD). For example, to charge $1.00, pass `100`.
   */
  product_price: number;

  /**
   * Metadata for the payment. If not passed, the metadata of the subscription will
   * be taken
   */
  metadata?: { [key: string]: string } | null;
}

Subscriptions.SubscriptionListResponsesDefaultPageNumberPagination =
  SubscriptionListResponsesDefaultPageNumberPagination;

export declare namespace Subscriptions {
  export {
    type AddonCartResponseItem as AddonCartResponseItem,
    type Subscription as Subscription,
    type SubscriptionStatus as SubscriptionStatus,
    type TimeInterval as TimeInterval,
    type SubscriptionCreateResponse as SubscriptionCreateResponse,
    type SubscriptionListResponse as SubscriptionListResponse,
    type SubscriptionChargeResponse as SubscriptionChargeResponse,
    SubscriptionListResponsesDefaultPageNumberPagination as SubscriptionListResponsesDefaultPageNumberPagination,
    type SubscriptionCreateParams as SubscriptionCreateParams,
    type SubscriptionUpdateParams as SubscriptionUpdateParams,
    type SubscriptionListParams as SubscriptionListParams,
    type SubscriptionChangePlanParams as SubscriptionChangePlanParams,
    type SubscriptionChargeParams as SubscriptionChargeParams,
  };
}
