// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as DisputesAPI from './disputes';
import * as MiscAPI from './misc';
import * as RefundsAPI from './refunds';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Payments extends APIResource {
  create(body: PaymentCreateParams, options?: Core.RequestOptions): Core.APIPromise<PaymentCreateResponse> {
    return this._client.post('/payments', { body, ...options });
  }

  retrieve(paymentId: string, options?: Core.RequestOptions): Core.APIPromise<Payment> {
    return this._client.get(`/payments/${paymentId}`, options);
  }

  list(
    query?: PaymentListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse>;
  list(
    query: PaymentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/payments', PaymentListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }

  retrieveLineItems(
    paymentId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PaymentRetrieveLineItemsResponse> {
    return this._client.get(`/payments/${paymentId}/line-items`, options);
  }
}

export class PaymentListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<PaymentListResponse> {}

export interface AttachExistingCustomer {
  customer_id: string;
}

export interface BillingAddress {
  /**
   * City name
   */
  city: string;

  /**
   * ISO country code alpha2 variant
   */
  country: MiscAPI.CountryCode;

  /**
   * State or province name
   */
  state: string;

  /**
   * Street address including house number and unit/apartment if applicable
   */
  street: string;

  /**
   * Postal code or ZIP code
   */
  zipcode: string;
}

export interface CreateNewCustomer {
  email: string;

  name: string;

  /**
   * When false, the most recently created customer object with the given email is
   * used if exists. When true, a new customer object is always created False by
   * default
   */
  create_new_customer?: boolean;

  phone_number?: string | null;
}

export interface CustomerLimitedDetails {
  /**
   * Unique identifier for the customer
   */
  customer_id: string;

  /**
   * Email address of the customer
   */
  email: string;

  /**
   * Full name of the customer
   */
  name: string;
}

export type CustomerRequest = AttachExistingCustomer | CreateNewCustomer;

export type IntentStatus =
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'processing'
  | 'requires_customer_action'
  | 'requires_merchant_action'
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_capture'
  | 'partially_captured'
  | 'partially_captured_and_capturable';

export interface OneTimeProductCartItem {
  product_id: string;

  quantity: number;

  /**
   * Amount the customer pays if pay_what_you_want is enabled. If disabled then
   * amount will be ignored Represented in the lowest denomination of the currency
   * (e.g., cents for USD). For example, to charge $1.00, pass `100`.
   */
  amount?: number | null;
}

export interface Payment {
  billing: BillingAddress;

  /**
   * brand id this payment belongs to
   */
  brand_id: string;

  /**
   * Identifier of the business associated with the payment
   */
  business_id: string;

  /**
   * Timestamp when the payment was created
   */
  created_at: string;

  currency: MiscAPI.Currency;

  customer: CustomerLimitedDetails;

  /**
   * brand id this payment belongs to
   */
  digital_products_delivered: boolean;

  /**
   * List of disputes associated with this payment
   */
  disputes: Array<DisputesAPI.Dispute>;

  metadata: Record<string, string>;

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * List of refunds issued for this payment
   */
  refunds: Array<RefundsAPI.Refund>;

  /**
   * The amount that will be credited to your Dodo balance after currency conversion
   * and processing. Especially relevant for adaptive pricing where the customer's
   * payment currency differs from your settlement currency.
   */
  settlement_amount: number;

  settlement_currency: MiscAPI.Currency;

  /**
   * Total amount charged to the customer including tax, in smallest currency unit
   * (e.g. cents)
   */
  total_amount: number;

  /**
   * ISO country code alpha2 variant
   */
  card_issuing_country?: MiscAPI.CountryCode | null;

  /**
   * The last four digits of the card
   */
  card_last_four?: string | null;

  /**
   * Card network like VISA, MASTERCARD etc.
   */
  card_network?: string | null;

  /**
   * The type of card DEBIT or CREDIT
   */
  card_type?: string | null;

  /**
   * The discount id if discount is applied
   */
  discount_id?: string | null;

  /**
   * An error code if the payment failed
   */
  error_code?: string | null;

  /**
   * An error message if the payment failed
   */
  error_message?: string | null;

  /**
   * Checkout URL
   */
  payment_link?: string | null;

  /**
   * Payment method used by customer (e.g. "card", "bank_transfer")
   */
  payment_method?: string | null;

  /**
   * Specific type of payment method (e.g. "visa", "mastercard")
   */
  payment_method_type?: string | null;

  /**
   * List of products purchased in a one-time payment
   */
  product_cart?: Array<Payment.ProductCart> | null;

  /**
   * This represents the portion of settlement_amount that corresponds to taxes
   * collected. Especially relevant for adaptive pricing where the tax component must
   * be tracked separately in your Dodo balance.
   */
  settlement_tax?: number | null;

  status?: IntentStatus | null;

  /**
   * Identifier of the subscription if payment is part of a subscription
   */
  subscription_id?: string | null;

  /**
   * Amount of tax collected in smallest currency unit (e.g. cents)
   */
  tax?: number | null;

  /**
   * Timestamp when the payment was last updated
   */
  updated_at?: string | null;
}

export namespace Payment {
  export interface ProductCart {
    product_id: string;

    quantity: number;
  }
}

export interface PaymentCreateResponse {
  /**
   * Client secret used to load Dodo checkout SDK NOTE : Dodo checkout SDK will be
   * coming soon
   */
  client_secret: string;

  customer: CustomerLimitedDetails;

  metadata: Record<string, string>;

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * Total amount of the payment in smallest currency unit (e.g. cents)
   */
  total_amount: number;

  /**
   * The discount id if discount is applied
   */
  discount_id?: string | null;

  /**
   * Optional URL to a hosted payment page
   */
  payment_link?: string | null;

  /**
   * Optional list of products included in the payment
   */
  product_cart?: Array<OneTimeProductCartItem> | null;
}

export interface PaymentListResponse {
  brand_id: string;

  created_at: string;

  currency: MiscAPI.Currency;

  customer: CustomerLimitedDetails;

  digital_products_delivered: boolean;

  metadata: Record<string, string>;

  payment_id: string;

  total_amount: number;

  payment_method?: string | null;

  payment_method_type?: string | null;

  status?: IntentStatus | null;

  subscription_id?: string | null;
}

export interface PaymentRetrieveLineItemsResponse {
  currency: MiscAPI.Currency;

  items: Array<PaymentRetrieveLineItemsResponse.Item>;
}

export namespace PaymentRetrieveLineItemsResponse {
  export interface Item {
    amount: number;

    items_id: string;

    tax: number;

    description?: string | null;

    name?: string | null;
  }
}

export interface PaymentCreateParams {
  billing: BillingAddress;

  customer: CustomerRequest;

  /**
   * List of products in the cart. Must contain at least 1 and at most 100 items.
   */
  product_cart: Array<OneTimeProductCartItem>;

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

  billing_currency?: MiscAPI.Currency | null;

  /**
   * Discount Code to apply to the transaction
   */
  discount_code?: string | null;

  metadata?: Record<string, string>;

  /**
   * Whether to generate a payment link. Defaults to false if not specified.
   */
  payment_link?: boolean | null;

  /**
   * Optional URL to redirect the customer after payment. Must be a valid URL if
   * provided.
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
}

export interface PaymentListParams extends DefaultPageNumberPaginationParams {
  /**
   * filter by Brand id
   */
  brand_id?: string | null;

  /**
   * Get events after this created time
   */
  created_at_gte?: string | null;

  /**
   * Get events created before this time
   */
  created_at_lte?: string | null;

  /**
   * Filter by customer id
   */
  customer_id?: string | null;

  /**
   * Filter by status
   */
  status?: IntentStatus | null;

  /**
   * Filter by subscription id
   */
  subscription_id?: string | null;
}

Payments.PaymentListResponsesDefaultPageNumberPagination = PaymentListResponsesDefaultPageNumberPagination;

export declare namespace Payments {
  export {
    type AttachExistingCustomer as AttachExistingCustomer,
    type BillingAddress as BillingAddress,
    type CreateNewCustomer as CreateNewCustomer,
    type CustomerLimitedDetails as CustomerLimitedDetails,
    type CustomerRequest as CustomerRequest,
    type IntentStatus as IntentStatus,
    type OneTimeProductCartItem as OneTimeProductCartItem,
    type Payment as Payment,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    type PaymentRetrieveLineItemsResponse as PaymentRetrieveLineItemsResponse,
    PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };
}
