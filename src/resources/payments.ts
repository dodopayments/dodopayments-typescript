// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DisputesAPI from './disputes';
import * as MiscAPI from './misc';
import * as RefundsAPI from './refunds';
import { APIPromise } from '../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Payments extends APIResource {
  create(body: PaymentCreateParams, options?: RequestOptions): APIPromise<PaymentCreateResponse> {
    return this._client.post('/payments', { body, ...options });
  }

  retrieve(paymentID: string, options?: RequestOptions): APIPromise<Payment> {
    return this._client.get(path`/payments/${paymentID}`, options);
  }

  list(
    query: PaymentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse> {
    return this._client.getAPIList('/payments', DefaultPageNumberPagination<PaymentListResponse>, {
      query,
      ...options,
    });
  }

  retrieveLineItems(
    paymentID: string,
    options?: RequestOptions,
  ): APIPromise<PaymentRetrieveLineItemsResponse> {
    return this._client.get(path`/payments/${paymentID}/line-items`, options);
  }
}

export type PaymentListResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<PaymentListResponse>;

export interface AttachExistingCustomer {
  customer_id: string;
}

export interface BillingAddress {
  /**
   * City name
   */
  city: string;

  /**
   * Two-letter ISO country code (ISO 3166-1 alpha-2)
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

  /**
   * Phone number of the customer
   */
  phone_number?: string | null;
}

export type CustomerRequest = AttachExistingCustomer | NewCustomer;

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

export interface NewCustomer {
  /**
   * Email is required for creating a new customer
   */
  email: string;

  /**
   * Optional full name of the customer. If provided during session creation, it is
   * persisted and becomes immutable for the session. If omitted here, it can be
   * provided later via the confirm API.
   */
  name?: string | null;

  phone_number?: string | null;
}

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
  /**
   * Billing address details for payments
   */
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

  /**
   * Currency used for the payment
   */
  currency: MiscAPI.Currency;

  /**
   * Details about the customer who made the payment
   */
  customer: CustomerLimitedDetails;

  /**
   * brand id this payment belongs to
   */
  digital_products_delivered: boolean;

  /**
   * List of disputes associated with this payment
   */
  disputes: Array<DisputesAPI.Dispute>;

  /**
   * Additional custom data associated with the payment
   */
  metadata: { [key: string]: string };

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * List of refunds issued for this payment
   */
  refunds: Array<Payment.Refund>;

  /**
   * The amount that will be credited to your Dodo balance after currency conversion
   * and processing. Especially relevant for adaptive pricing where the customer's
   * payment currency differs from your settlement currency.
   */
  settlement_amount: number;

  /**
   * The currency in which the settlement_amount will be credited to your Dodo
   * balance. This may differ from the customer's payment currency in adaptive
   * pricing scenarios.
   */
  settlement_currency: MiscAPI.Currency;

  /**
   * Total amount charged to the customer including tax, in smallest currency unit
   * (e.g. cents)
   */
  total_amount: number;

  /**
   * ISO2 country code of the card
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
   * If payment is made using a checkout session, this field is set to the id of the
   * session.
   */
  checkout_session_id?: string | null;

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

  /**
   * Current status of the payment intent
   */
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
  export interface Refund {
    /**
     * The unique identifier of the business issuing the refund.
     */
    business_id: string;

    /**
     * The timestamp of when the refund was created in UTC.
     */
    created_at: string;

    /**
     * If true the refund is a partial refund
     */
    is_partial: boolean;

    /**
     * The unique identifier of the payment associated with the refund.
     */
    payment_id: string;

    /**
     * The unique identifier of the refund.
     */
    refund_id: string;

    /**
     * The current status of the refund.
     */
    status: RefundsAPI.RefundStatus;

    /**
     * The refunded amount.
     */
    amount?: number | null;

    /**
     * The currency of the refund, represented as an ISO 4217 currency code.
     */
    currency?: MiscAPI.Currency | null;

    /**
     * The reason provided for the refund, if any. Optional.
     */
    reason?: string | null;
  }

  export interface ProductCart {
    product_id: string;

    quantity: number;
  }
}

export type PaymentMethodTypes =
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
  | 'afterpay_clearpay';

export interface PaymentCreateResponse {
  /**
   * Client secret used to load Dodo checkout SDK NOTE : Dodo checkout SDK will be
   * coming soon
   */
  client_secret: string;

  /**
   * Limited details about the customer making the payment
   */
  customer: CustomerLimitedDetails;

  /**
   * Additional metadata associated with the payment
   */
  metadata: { [key: string]: string };

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
   * Expiry timestamp of the payment link
   */
  expires_on?: string | null;

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

  metadata: { [key: string]: string };

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

    refundable_amount: number;

    tax: number;

    description?: string | null;

    name?: string | null;
  }
}

export interface PaymentCreateParams {
  /**
   * Billing address details for the payment
   */
  billing: BillingAddress;

  /**
   * Customer information for the payment
   */
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
  allowed_payment_method_types?: Array<PaymentMethodTypes> | null;

  /**
   * Fix the currency in which the end customer is billed. If Dodo Payments cannot
   * support that currency for this transaction, it will not proceed
   */
  billing_currency?: MiscAPI.Currency | null;

  /**
   * Discount Code to apply to the transaction
   */
  discount_code?: string | null;

  /**
   * Override merchant default 3DS behaviour for this payment
   */
  force_3ds?: boolean | null;

  /**
   * Additional metadata associated with the payment. Defaults to empty if not
   * provided.
   */
  metadata?: { [key: string]: string };

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
  status?:
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

  /**
   * Filter by subscription id
   */
  subscription_id?: string;
}

export declare namespace Payments {
  export {
    type AttachExistingCustomer as AttachExistingCustomer,
    type BillingAddress as BillingAddress,
    type CreateNewCustomer as CreateNewCustomer,
    type CustomerLimitedDetails as CustomerLimitedDetails,
    type CustomerRequest as CustomerRequest,
    type IntentStatus as IntentStatus,
    type NewCustomer as NewCustomer,
    type OneTimeProductCartItem as OneTimeProductCartItem,
    type Payment as Payment,
    type PaymentMethodTypes as PaymentMethodTypes,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    type PaymentRetrieveLineItemsResponse as PaymentRetrieveLineItemsResponse,
    type PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentListParams as PaymentListParams,
  };
}
