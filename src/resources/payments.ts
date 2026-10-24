// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DiscountsAPI from './discounts';
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
  /**
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const paymentListResponse of client.payments.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PaymentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<PaymentListResponsesDefaultPageNumberPagination, PaymentListResponse> {
    return this._client.getAPIList('/payments', DefaultPageNumberPagination<PaymentListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * @deprecated
   */
  create(body: PaymentCreateParams, options?: RequestOptions): APIPromise<PaymentCreateResponse> {
    return this._client.post('/payments', { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const payment = await client.payments.retrieve(
   *   'pay_gr4RizvMOXFJ6xca3y2tU',
   * );
   * ```
   */
  retrieve(paymentID: string, options?: RequestOptions): APIPromise<Payment> {
    return this._client.get(path`/payments/${paymentID}`, options);
  }

  /**
   * @example
   * ```ts
   * const response = await client.payments.retrieveLineItems(
   *   'pay_gr4RizvMOXFJ6xca3y2tU',
   * );
   * ```
   */
  retrieveLineItems(
    paymentID: string,
    query: PaymentRetrieveLineItemsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PaymentRetrieveLineItemsResponse> {
    return this._client.get(path`/payments/${paymentID}/line-items`, { query, ...options });
  }

  /**
   * @example
   * ```ts
   * const manualRetry = await client.payments.retry(
   *   'payment_id',
   * );
   * ```
   */
  retry(paymentID: string, options?: RequestOptions): APIPromise<ManualRetry> {
    return this._client.post(path`/payments/${paymentID}/retry`, options);
  }

  /**
   * @example
   * ```ts
   * const manualRetryState =
   *   await client.payments.retrieveRetryState('payment_id');
   * ```
   */
  retrieveRetryState(paymentID: string, options?: RequestOptions): APIPromise<ManualRetryState> {
    return this._client.get(path`/payments/${paymentID}/retry`, options);
  }
}

export type PaymentListResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<PaymentListResponse>;

export type RefundListItemsDefaultPageNumberPagination = DefaultPageNumberPagination<RefundListItem>;

export interface AttachExistingCustomer {
  customer_id: string;
}

export interface BillingAddress {
  /**
   * Two-letter ISO country code (ISO 3166-1 alpha-2)
   */
  country: MiscAPI.CountryCode;

  /**
   * City name
   */
  city?: string | null;

  /**
   * State or province name
   */
  state?: string | null;

  /**
   * Street address including house number and unit/apartment if applicable
   */
  street?: string | null;

  /**
   * Postal code or ZIP code
   */
  zipcode?: string | null;
}

/**
 * The type of subscription charge that a payment is for.
 *
 * A payment has one invoice, and the invoice has one type. Thus each payment has
 * one charge type. A payment that charges no subscription has no charge type.
 *
 * - `new`: the first payment of one or more subscriptions. A retry of that payment
 *   is also `new`. A cart with new subscriptions and one-time products is `new`.
 *   Read the one-time products from `product_cart`.
 * - `renewal`: a charge at the billing date. A dunning retry and a manual retry of
 *   that charge are also `renewal`. A `renewal` does not always extend the service
 *   period. For example, the usage settlement of a paused subscription is a
 *   `renewal` with `includes_usage` true and no entry in `service_periods`.
 *   Examine `service_periods` before you extend access.
 * - `plan_change`: a charge for a plan change. The change applies now or at the
 *   next billing date.
 * - `on_demand`: an on-demand charge of an on-demand subscription.
 */
export type ChargeType = 'new' | 'renewal' | 'plan_change' | 'on_demand';

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

  /**
   * The language of the customer emails, a code from `GET /locales`. A value
   * replaces the stored language of the customer, also for an existing customer.
   * Send a value only to change that language on purpose. With no value, the stored
   * language stays.
   */
  preferred_locale?: MiscAPI.Locale | null;
}

/**
 * Customer's response to a custom field
 */
export interface CustomFieldResponse {
  /**
   * Key matching the custom field definition
   */
  key: string;

  /**
   * Value provided by customer
   */
  value: string;
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
   * Additional metadata associated with the customer
   */
  metadata?: MiscAPI.Metadata;

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

export interface ManualRetry {
  /**
   * The invoice the send charged.
   */
  invoice_id: string;

  /**
   * Always true on this route. Tells the row apart from an automatic attempt.
   */
  is_manual_retry: boolean;

  /**
   * The payment row this send created.
   */
  payment_id: string;

  /**
   * Which attempt this send is, counting manual sends on the invoice.
   */
  retry_attempt: number;

  sends_allowed: number;

  /**
   * Manual sends spent on this invoice, including this one.
   */
  sends_used: number;

  /**
   * When the next send becomes available. Null when no send is left.
   */
  retry_available_at?: string | null;

  /**
   * Outcome of the charge. `processing` means the processor has not settled it yet,
   * and the payment webhooks report the result.
   */
  status?: IntentStatus | null;
}

export interface ManualRetryState {
  can_retry: boolean;

  sends_allowed: number;

  sends_used: number;

  /**
   * The number of the queued automatic retry, starting at 1.
   */
  automatic_retry_number?: number | null;

  /**
   * The number of automatic retries that the current configuration plans for this
   * invoice. It is never less than `automatic_retry_number`.
   */
  automatic_retry_total?: number | null;

  /**
   * When the next automatic retry on this invoice is scheduled. Null when no
   * automatic retry is queued or automatic retries are disabled.
   */
  next_automatic_retry_at?: string | null;

  /**
   * The code `POST` would fail with. Null when `can_retry` is true.
   */
  reason?: string | null;

  /**
   * When the next send becomes available. Null when no send is left, or when the
   * block has nothing to do with the cooldown.
   */
  retry_available_at?: string | null;
}

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
   * Whether the digital products purchased in this payment have been delivered.
   */
  digital_products_delivered: boolean;

  /**
   * List of disputes associated with this payment
   */
  disputes: Array<DisputesAPI.Dispute>;

  /**
   * True when this payment also bills metered usage or credit overage. The usage is
   * for the billing cycle before the service period, not for the service period. The
   * value is set for each payment status. It is false when `charge_type` is null.
   */
  includes_usage: boolean;

  /**
   * True when one payment starts more than one subscription. Read this field to find
   * the payment type. Do not read the length of `subscription_ids`. Do not read
   * `subscription_id` for null.
   */
  is_multi_subscription: boolean;

  /**
   * Whether this payment was created solely to update a subscription's payment
   * method (a zero-/setup-amount charge). `false` for normal charges.
   */
  is_update_payment_method: boolean;

  /**
   * Additional custom data associated with the payment
   */
  metadata: MiscAPI.Metadata;

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * Which processor handled this payment. `stripe` / `adyen` for BYOP routes (the
   * merchant's own payment connector); `dodo` for everything Dodo processed itself.
   */
  payment_provider: 'stripe' | 'adyen' | 'dodo';

  /**
   * List of refunds issued for this payment
   */
  refunds: Array<RefundListItem>;

  /**
   * Retry attempt number for subscription renewal payments. `0` for the original
   * payment, `1`+ for each scheduled off-session retry after a failed renewal.
   * Always `0` for non-subscription payments.
   */
  retry_attempt: number;

  /**
   * The service period of each subscription that this payment pays for. The order is
   * the same as `subscription_ids`. For a plan change charge, the period starts at
   * the plan change and ends at the next billing date. The list is empty unless the
   * payment status is `succeeded`. The list is also empty for a one-time payment, an
   * on-demand charge, or a payment method update. The list is set for `new`,
   * `renewal` and `plan_change` charges that succeeded. It can be empty for some
   * zero-amount payments. A `renewal` with no entry for its subscription bills usage
   * only. That payment does not extend the service period.
   */
  service_periods: Array<SubscriptionServicePeriod>;

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
   * Every subscription that this payment starts or charges, in a stable order. It is
   * empty for a one-time payment. It holds the value of `subscription_id` when the
   * payment names one subscription.
   */
  subscription_ids: Array<string>;

  /**
   * Total amount charged to the customer including tax, in the currency's smallest
   * unit (e.g. cents for USD, yen for JPY, fils for KWD — see the currency's decimal
   * places)
   */
  total_amount: number;

  /**
   * Expiry month of the card, as two digits from `01` to `12`. For Apple Pay and
   * Google Pay, this is the expiry of the wallet token, which can differ from the
   * expiry of the physical card.
   */
  card_exp_month?: string | null;

  /**
   * Expiry year of the card, as four digits, for example `2029`. For Apple Pay and
   * Google Pay, this is the expiry of the wallet token, which can differ from the
   * expiry of the physical card.
   */
  card_exp_year?: string | null;

  /**
   * Cardholder name
   */
  card_holder_name?: string | null;

  /**
   * ISO2 country code of the card
   */
  card_issuing_country?: MiscAPI.CountryCode | null;

  /**
   * The last four digits of the card
   */
  card_last_four?: string | null;

  /**
   * Card network, in lowercase, for example `visa`, `mastercard` or `amex`. Older
   * payments can carry other casing.
   */
  card_network?: string | null;

  /**
   * The type of card, in lowercase: `credit`, `debit` or `prepaid`. Older payments
   * can carry other casing.
   */
  card_type?: string | null;

  /**
   * The type of subscription charge that this payment is for. Refer to `ChargeType`.
   * The value is set for each payment status, not only for `succeeded`. The value is
   * null when this payment charges no subscription.
   */
  charge_type?: ChargeType | null;

  /**
   * If payment is made using a checkout session, this field is set to the id of the
   * session.
   */
  checkout_session_id?: string | null;

  /**
   * Customer's responses to custom fields collected during checkout
   */
  custom_field_responses?: Array<CustomFieldResponse> | null;

  /**
   * @deprecated Use `discounts` instead.
   */
  discount_id?: string | null;

  /**
   * All stacked discounts applied, ordered by position
   */
  discounts?: Array<DiscountsAPI.DiscountDetail> | null;

  /**
   * An error code if the payment failed
   */
  error_code?: string | null;

  /**
   * An error message if the payment failed. When `error_code` is a recognised
   * unified code, this is the merchant-facing headline + recommended action (Payment
   * Details copy) rather than the raw connector text.
   */
  error_message?: string | null;

  /**
   * Invoice ID for this payment. Uses India-specific invoice ID if available.
   */
  invoice_id?: string | null;

  /**
   * @deprecated Use `GET /invoices/payments/{payment_id}` with an API key.
   */
  invoice_url?: string | null;

  /**
   * Checkout URL
   */
  payment_link?: string | null;

  /**
   * Payment method used by customer (e.g. "card", "bank_transfer")
   */
  payment_method?: string | null;

  /**
   * Identifier of the saved payment method used for this payment, if any.
   */
  payment_method_id?: string | null;

  /**
   * Specific type of payment method (e.g. "visa", "mastercard")
   */
  payment_method_type?: string | null;

  /**
   * List of products purchased in a one-time payment
   */
  product_cart?: Array<Payment.ProductCart> | null;

  /**
   * Summary of the refund status for this payment. None if no succeeded refunds
   * exist.
   */
  refund_status?: PaymentRefundStatus | null;

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
   * Identifier of the subscription if payment is part of a subscription. A
   * multi-subscription payment leaves this null, because no single subscription owns
   * the payment. Read `subscription_ids` for those.
   */
  subscription_id?: string | null;

  /**
   * Amount of tax collected in the currency's smallest unit (e.g. cents for USD, yen
   * for JPY, fils for KWD)
   */
  tax?: number | null;

  /**
   * How the cardholder completed the 3DS authentication. The value is null when the
   * processor does not report it.
   */
  three_ds_flow?: ThreeDSFlow | null;

  /**
   * The result of the 3DS authentication, as the processor reports it. The value is
   * null when the processor reports no 3DS data, for example when the payment did
   * not use 3DS.
   */
  three_ds_status?: ThreeDSStatus | null;

  /**
   * The 3DS protocol version, for example `2.2.0`. The value is null when the
   * processor does not report it.
   */
  three_ds_version?: string | null;

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

/**
 * All supported payment method types.
 *
 * Used for disabled-payment-methods filtering and validation.
 */
export type PaymentMethodTypes =
  | 'ach'
  | 'affirm'
  | 'afterpay_clearpay'
  | 'alfamart'
  | 'ali_pay'
  | 'ali_pay_hk'
  | 'alma'
  | 'amazon_pay'
  | 'apple_pay'
  | 'atome'
  | 'bacs'
  | 'bancontact_card'
  | 'becs'
  | 'benefit'
  | 'bizum'
  | 'blik'
  | 'boleto'
  | 'bca_bank_transfer'
  | 'bni_va'
  | 'bri_va'
  | 'card_redirect'
  | 'cimb_va'
  | 'classic'
  | 'credit'
  | 'crypto_currency'
  | 'cashapp'
  | 'dana'
  | 'danamon_va'
  | 'debit'
  | 'duit_now'
  | 'efecty'
  | 'eft'
  | 'eps'
  | 'fps'
  | 'evoucher'
  | 'giropay'
  | 'givex'
  | 'google_pay'
  | 'go_pay'
  | 'gcash'
  | 'ideal'
  | 'interac'
  | 'indomaret'
  | 'klarna'
  | 'kakao_pay'
  | 'local_bank_redirect'
  | 'mandiri_va'
  | 'knet'
  | 'mb_way'
  | 'mobile_pay'
  | 'momo'
  | 'momo_atm'
  | 'multibanco'
  | 'online_banking_thailand'
  | 'online_banking_czech_republic'
  | 'online_banking_finland'
  | 'online_banking_fpx'
  | 'online_banking_poland'
  | 'online_banking_slovakia'
  | 'oxxo'
  | 'pago_efectivo'
  | 'permata_bank_transfer'
  | 'open_banking_uk'
  | 'pay_bright'
  | 'paypal'
  | 'paze'
  | 'pix'
  | 'pay_safe_card'
  | 'przelewy24'
  | 'prompt_pay'
  | 'pse'
  | 'red_compra'
  | 'red_pagos'
  | 'samsung_pay'
  | 'sepa'
  | 'sepa_bank_transfer'
  | 'sofort'
  | 'swish'
  | 'touch_n_go'
  | 'trustly'
  | 'twint'
  | 'upi_collect'
  | 'upi_intent'
  | 'vipps'
  | 'viet_qr'
  | 'venmo'
  | 'walley'
  | 'we_chat_pay'
  | 'seven_eleven'
  | 'lawson'
  | 'mini_stop'
  | 'family_mart'
  | 'seicomart'
  | 'pay_easy'
  | 'local_bank_transfer'
  | 'mifinity'
  | 'open_banking_pis'
  | 'direct_carrier_billing'
  | 'instant_bank_transfer'
  | 'billie'
  | 'zip'
  | 'revolut_pay'
  | 'naver_pay'
  | 'payco'
  | 'satispay';

export type PaymentRefundStatus = 'partial' | 'full';

export interface RefundListItem {
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
   * The reference number that the card network or the bank gives to the refund. The
   * customer can give this number to their bank to trace the refund. It is null
   * until the reference is available.
   */
  network_reference?: string | null;

  /**
   * The kind of `network_reference`: ARN, STAN or RRN.
   */
  network_reference_type?: RefundsAPI.RefundNetworkReferenceType | null;

  /**
   * The time in UTC when `network_reference` became available. It is null when the
   * reference is not available, or when it became available before this field
   * existed.
   */
  network_reference_updated_at?: string | null;

  /**
   * The reason provided for the refund, if any. Optional.
   */
  reason?: string | null;
}

/**
 * The service period that a payment pays for, for one subscription.
 */
export interface SubscriptionServicePeriod {
  /**
   * End of the service period.
   */
  ends_at: string;

  /**
   * The part of one full billing period that the plan charge pays for. The value
   * `"1"` is a full period. A value less than 1 is a partial period, for example
   * after a plan change that keeps the billing cycle. For a plan change, this is the
   * value of the new plan. The credit for the old plan is not in this value.
   */
  proration_factor: string;

  /**
   * Start of the service period. For a renewal, this is the billing date. For a plan
   * change that applies at the next billing date, this is the time when the change
   * applied. This time can be some minutes after the billing date.
   */
  starts_at: string;

  /**
   * Identifier of the subscription.
   */
  subscription_id: string;
}

/**
 * How the cardholder completed the 3DS authentication.
 */
export type ThreeDSFlow = 'challenge' | 'frictionless';

/**
 * The result of the 3DS authentication of a card payment, as the processor reports
 * it.
 */
export type ThreeDSStatus =
  'authenticated' | 'attempt_acknowledged' | 'exempted' | 'failed' | 'not_supported' | 'processing_error';

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
  metadata: MiscAPI.Metadata;

  /**
   * Unique identifier for the payment
   */
  payment_id: string;

  /**
   * Total amount of the payment in the currency's smallest unit (cents for USD, yen
   * for JPY, fils for KWD)
   */
  total_amount: number;

  /**
   * @deprecated Use `discounts` instead.
   */
  discount_id?: string | null;

  /**
   * All stacked discount IDs applied, in order of application
   */
  discount_ids?: Array<string> | null;

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

  has_license_key: boolean;

  /**
   * True when this payment also bills metered usage or credit overage. The usage is
   * for the billing cycle before the service period, not for the service period. The
   * value is set for each payment status. It is false when `charge_type` is null.
   */
  includes_usage: boolean;

  /**
   * True when one payment starts more than one subscription. Read this field to find
   * the payment type. Do not read the length of `subscription_ids`. Do not read
   * `subscription_id` for null.
   */
  is_multi_subscription: boolean;

  /**
   * Arbitrary key-value metadata. Values can be string, integer, number, or boolean.
   */
  metadata: MiscAPI.Metadata;

  payment_id: string;

  /**
   * Which processor handled this payment. `stripe` / `adyen` for BYOP routes (the
   * merchant's own payment connector); `dodo` for everything Dodo processed itself.
   */
  payment_provider: 'stripe' | 'adyen' | 'dodo';

  /**
   * The retry attempt number of this payment. The value is `0` for the original
   * payment. Each retry after a failed subscription renewal adds `1`. The value is
   * always `0` for a payment that is not for a subscription.
   */
  retry_attempt: number;

  /**
   * The service period of each subscription that this payment pays for. The order is
   * the same as `subscription_ids`. For a plan change charge, the period starts at
   * the plan change and ends at the next billing date. The list is empty unless the
   * payment status is `succeeded`. The list is also empty for a one-time payment, an
   * on-demand charge, or a payment method update. The list is set for `new`,
   * `renewal` and `plan_change` charges that succeeded. It can be empty for some
   * zero-amount payments. A `renewal` with no entry for its subscription bills usage
   * only. That payment does not extend the service period.
   */
  service_periods: Array<SubscriptionServicePeriod>;

  /**
   * Every subscription that this payment starts or charges, in a stable order. It is
   * empty for a one-time payment. It holds the value of `subscription_id` when the
   * payment names one subscription.
   */
  subscription_ids: Array<string>;

  total_amount: number;

  /**
   * Expiry month of the card, as two digits from `01` to `12`. For Apple Pay and
   * Google Pay, this is the expiry of the wallet token, which can differ from the
   * expiry of the physical card.
   */
  card_exp_month?: string | null;

  /**
   * Expiry year of the card, as four digits, for example `2029`. For Apple Pay and
   * Google Pay, this is the expiry of the wallet token, which can differ from the
   * expiry of the physical card.
   */
  card_exp_year?: string | null;

  /**
   * The last four digits of the card
   */
  card_last_four?: string | null;

  /**
   * Card network, in lowercase, for example `visa`, `mastercard` or `amex`. Older
   * payments can carry other casing.
   */
  card_network?: string | null;

  /**
   * The type of card, in lowercase: `credit`, `debit` or `prepaid`. Older payments
   * can carry other casing.
   */
  card_type?: string | null;

  /**
   * The type of subscription charge that this payment is for. Refer to `ChargeType`.
   * The value is set for each payment status, not only for `succeeded`. The value is
   * null when this payment charges no subscription.
   */
  charge_type?: ChargeType | null;

  /**
   * The ID of the checkout session for this payment. The value is null when the
   * payment does not use a checkout session.
   */
  checkout_session_id?: string | null;

  /**
   * The most recent dispute status for this payment. None if no disputes exist.
   */
  dispute_status?: DisputesAPI.DisputeStatus | null;

  /**
   * Invoice ID for this payment. Uses India-specific invoice ID if available.
   */
  invoice_id?: string | null;

  /**
   * @deprecated Use `GET /invoices/payments/{payment_id}` with an API key.
   */
  invoice_url?: string | null;

  payment_method?: string | null;

  payment_method_type?: string | null;

  /**
   * Summary of the refund status for this payment. None if no succeeded refunds
   * exist.
   */
  refund_status?: PaymentRefundStatus | null;

  status?: IntentStatus | null;

  subscription_id?: string | null;

  /**
   * How the cardholder completed the 3DS authentication. The value is null when the
   * processor does not report it.
   */
  three_ds_flow?: ThreeDSFlow | null;

  /**
   * The result of the 3DS authentication, as the processor reports it. The value is
   * null when the processor reports no 3DS data, for example when the payment did
   * not use 3DS.
   */
  three_ds_status?: ThreeDSStatus | null;

  /**
   * The 3DS protocol version, for example `2.2.0`. The value is null when the
   * processor does not report it.
   */
  three_ds_version?: string | null;
}

export interface PaymentRetrieveLineItemsResponse {
  currency: MiscAPI.Currency;

  items: Array<PaymentRetrieveLineItemsResponse.Item>;

  /**
   * False when the payment method does not allow a partial refund of this payment.
   */
  partial_refund_allowed: boolean;
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
   * Filter by currency
   */
  currency?:
    | 'AED'
    | 'ALL'
    | 'AMD'
    | 'ANG'
    | 'AOA'
    | 'ARS'
    | 'AUD'
    | 'AWG'
    | 'AZN'
    | 'BAM'
    | 'BBD'
    | 'BDT'
    | 'BGN'
    | 'BHD'
    | 'BIF'
    | 'BMD'
    | 'BND'
    | 'BOB'
    | 'BRL'
    | 'BSD'
    | 'BWP'
    | 'BYN'
    | 'BZD'
    | 'CAD'
    | 'CHF'
    | 'CLP'
    | 'CNY'
    | 'COP'
    | 'CRC'
    | 'CUP'
    | 'CVE'
    | 'CZK'
    | 'DJF'
    | 'DKK'
    | 'DOP'
    | 'DZD'
    | 'EGP'
    | 'ETB'
    | 'EUR'
    | 'FJD'
    | 'FKP'
    | 'GBP'
    | 'GEL'
    | 'GHS'
    | 'GIP'
    | 'GMD'
    | 'GNF'
    | 'GTQ'
    | 'GYD'
    | 'HKD'
    | 'HNL'
    | 'HRK'
    | 'HTG'
    | 'HUF'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'IQD'
    | 'JMD'
    | 'JOD'
    | 'JPY'
    | 'KES'
    | 'KGS'
    | 'KHR'
    | 'KMF'
    | 'KRW'
    | 'KWD'
    | 'KYD'
    | 'KZT'
    | 'LAK'
    | 'LBP'
    | 'LKR'
    | 'LRD'
    | 'LSL'
    | 'LYD'
    | 'MAD'
    | 'MDL'
    | 'MGA'
    | 'MKD'
    | 'MMK'
    | 'MNT'
    | 'MOP'
    | 'MRU'
    | 'MUR'
    | 'MVR'
    | 'MWK'
    | 'MXN'
    | 'MYR'
    | 'MZN'
    | 'NAD'
    | 'NGN'
    | 'NIO'
    | 'NOK'
    | 'NPR'
    | 'NZD'
    | 'OMR'
    | 'PAB'
    | 'PEN'
    | 'PGK'
    | 'PHP'
    | 'PKR'
    | 'PLN'
    | 'PYG'
    | 'QAR'
    | 'RON'
    | 'RSD'
    | 'RUB'
    | 'RWF'
    | 'SAR'
    | 'SBD'
    | 'SCR'
    | 'SEK'
    | 'SGD'
    | 'SHP'
    | 'SLE'
    | 'SLL'
    | 'SOS'
    | 'SRD'
    | 'SSP'
    | 'STN'
    | 'SVC'
    | 'SZL'
    | 'THB'
    | 'TND'
    | 'TOP'
    | 'TRY'
    | 'TTD'
    | 'TWD'
    | 'TZS'
    | 'UAH'
    | 'UGX'
    | 'USD'
    | 'UYU'
    | 'UZS'
    | 'VES'
    | 'VND'
    | 'VUV'
    | 'WST'
    | 'XAF'
    | 'XCD'
    | 'XOF'
    | 'XPF'
    | 'YER'
    | 'ZAR'
    | 'ZMW';

  /**
   * Filter by customer id
   */
  customer_id?: string;

  /**
   * Filter by product id
   */
  product_id?: string;

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
   * Whether adaptive currency fees should be included in the price (true) or added
   * on top (false). If not specified, defaults to the business-level setting.
   */
  adaptive_currency_fees_inclusive?: boolean | null;

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
   * Optional business / legal name associated with the tax id. When provided
   * together with a valid tax id for a B2B purchase, this name is rendered on the
   * invoice instead of the customer's personal name.
   */
  customer_business_name?: string | null;

  /**
   * @deprecated Use `discount_id` instead.
   */
  discount_code?: string | null;

  /**
   * Stacked discount codes to apply, in order of application. Max 20. Cannot be used
   * together with discount_code.
   */
  discount_codes?: Array<string> | null;

  /**
   * Override merchant default 3DS behaviour for this payment
   */
  force_3ds?: boolean | null;

  /**
   * Additional metadata associated with the payment. Defaults to empty if not
   * provided.
   */
  metadata?: MiscAPI.Metadata;

  /**
   * Whether to generate a payment link. Defaults to false if not specified.
   */
  payment_link?: boolean | null;

  /**
   * Optional payment method ID to use for this payment. If provided, customer_id
   * must also be provided. The payment method will be validated for eligibility with
   * the payment's currency.
   */
  payment_method_id?: string | null;

  /**
   * If true, redirects the customer immediately after payment completion False by
   * default
   */
  redirect_immediately?: boolean;

  /**
   * If true, the customer's phone number is required to create this payment.
   * Typically set alongside `payment_link=true` so merchants can enforce phone
   * collection on the hosted payment page. Defaults to false.
   */
  require_phone_number?: boolean;

  /**
   * Optional URL to redirect the customer after payment. Must be a valid URL if
   * provided.
   */
  return_url?: string | null;

  /**
   * If true, returns a shortened payment link. Defaults to false if not specified.
   */
  short_link?: boolean | null;

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

export interface PaymentRetrieveLineItemsParams {
  /**
   * The currency of the amounts. It must be the currency that the customer paid in.
   * Without it, the amounts are in the settlement currency.
   */
  currency?: MiscAPI.Currency;
}

export declare namespace Payments {
  export {
    type AttachExistingCustomer as AttachExistingCustomer,
    type BillingAddress as BillingAddress,
    type ChargeType as ChargeType,
    type CreateNewCustomer as CreateNewCustomer,
    type CustomFieldResponse as CustomFieldResponse,
    type CustomerLimitedDetails as CustomerLimitedDetails,
    type CustomerRequest as CustomerRequest,
    type IntentStatus as IntentStatus,
    type ManualRetry as ManualRetry,
    type ManualRetryState as ManualRetryState,
    type NewCustomer as NewCustomer,
    type OneTimeProductCartItem as OneTimeProductCartItem,
    type Payment as Payment,
    type PaymentMethodTypes as PaymentMethodTypes,
    type PaymentRefundStatus as PaymentRefundStatus,
    type RefundListItem as RefundListItem,
    type SubscriptionServicePeriod as SubscriptionServicePeriod,
    type ThreeDSFlow as ThreeDSFlow,
    type ThreeDSStatus as ThreeDSStatus,
    type PaymentCreateResponse as PaymentCreateResponse,
    type PaymentListResponse as PaymentListResponse,
    type PaymentRetrieveLineItemsResponse as PaymentRetrieveLineItemsResponse,
    type PaymentListResponsesDefaultPageNumberPagination as PaymentListResponsesDefaultPageNumberPagination,
    type PaymentListParams as PaymentListParams,
    type PaymentCreateParams as PaymentCreateParams,
    type PaymentRetrieveLineItemsParams as PaymentRetrieveLineItemsParams,
  };
}
