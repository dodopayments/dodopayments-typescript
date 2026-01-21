// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MiscAPI from './misc';
import * as PaymentsAPI from './payments';
import * as SubscriptionsAPI from './subscriptions';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CheckoutSessions extends APIResource {
  create(body: CheckoutSessionCreateParams, options?: RequestOptions): APIPromise<CheckoutSessionResponse> {
    return this._client.post('/checkouts', { body, ...options });
  }

  retrieve(id: string, options?: RequestOptions): APIPromise<CheckoutSessionStatus> {
    return this._client.get(path`/checkouts/${id}`, options);
  }

  preview(
    body: CheckoutSessionPreviewParams,
    options?: RequestOptions,
  ): APIPromise<CheckoutSessionPreviewResponse> {
    return this._client.post('/checkouts/preview', { body, ...options });
  }
}

export interface CheckoutSessionRequest {
  product_cart: Array<CheckoutSessionRequest.ProductCart>;

  /**
   * Customers will never see payment methods that are not in this list. However,
   * adding a method here does not guarantee customers will see it. Availability
   * still depends on other factors (e.g., customer location, merchant settings).
   *
   * Disclaimar: Always provide 'credit' and 'debit' as a fallback. If all payment
   * methods are unavailable, checkout session will fail.
   */
  allowed_payment_method_types?: Array<PaymentsAPI.PaymentMethodTypes> | null;

  /**
   * Billing address information for the session
   */
  billing_address?: CheckoutSessionRequest.BillingAddress | null;

  /**
   * This field is ingored if adaptive pricing is disabled
   */
  billing_currency?: MiscAPI.Currency | null;

  /**
   * If confirm is true, all the details will be finalized. If required data is
   * missing, an API error is thrown.
   */
  confirm?: boolean;

  /**
   * Custom fields to collect from customer during checkout (max 5 fields)
   */
  custom_fields?: Array<CheckoutSessionRequest.CustomField> | null;

  /**
   * Customer details for the session
   */
  customer?: PaymentsAPI.CustomerRequest | null;

  /**
   * Customization for the checkout session page
   */
  customization?: CheckoutSessionRequest.Customization;

  discount_code?: string | null;

  feature_flags?: CheckoutSessionRequest.FeatureFlags;

  /**
   * Override merchant default 3DS behaviour for this session
   */
  force_3ds?: boolean | null;

  /**
   * Additional metadata associated with the payment. Defaults to empty if not
   * provided.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * If true, only zipcode is required when confirm is true; other address fields
   * remain optional
   */
  minimal_address?: boolean;

  /**
   * Optional payment method ID to use for this checkout session. Only allowed when
   * `confirm` is true. If provided, existing customer id must also be provided.
   */
  payment_method_id?: string | null;

  /**
   * Product collection ID for collection-based checkout flow
   */
  product_collection_id?: string | null;

  /**
   * The url to redirect after payment failure or success.
   */
  return_url?: string | null;

  /**
   * If true, returns a shortened checkout URL. Defaults to false if not specified.
   */
  short_link?: boolean;

  /**
   * Display saved payment methods of a returning customer False by default
   */
  show_saved_payment_methods?: boolean;

  subscription_data?: CheckoutSessionRequest.SubscriptionData | null;
}

export namespace CheckoutSessionRequest {
  export interface ProductCart {
    /**
     * unique id of the product
     */
    product_id: string;

    quantity: number;

    /**
     * only valid if product is a subscription
     */
    addons?: Array<SubscriptionsAPI.AttachAddon> | null;

    /**
     * Amount the customer pays if pay_what_you_want is enabled. If disabled then
     * amount will be ignored Represented in the lowest denomination of the currency
     * (e.g., cents for USD). For example, to charge $1.00, pass `100`. Only applicable
     * for one time payments
     *
     * If amount is not set for pay_what_you_want product, customer is allowed to
     * select the amount.
     */
    amount?: number | null;
  }

  /**
   * Billing address information for the session
   */
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
   * Definition of a custom field for checkout
   */
  export interface CustomField {
    /**
     * Type of field determining validation rules
     */
    field_type: 'text' | 'number' | 'email' | 'url' | 'phone' | 'date' | 'datetime' | 'dropdown' | 'boolean';

    /**
     * Unique identifier for this field (used as key in responses)
     */
    key: string;

    /**
     * Display label shown to customer
     */
    label: string;

    /**
     * Options for dropdown type (required for dropdown, ignored for others)
     */
    options?: Array<string> | null;

    /**
     * Placeholder text for the input
     */
    placeholder?: string | null;

    /**
     * Whether this field is required
     */
    required?: boolean;
  }

  /**
   * Customization for the checkout session page
   */
  export interface Customization {
    /**
     * Force the checkout interface to render in a specific language (e.g. `en`, `es`)
     */
    force_language?: string | null;

    /**
     * Show on demand tag
     *
     * Default is true
     */
    show_on_demand_tag?: boolean;

    /**
     * Show order details by default
     *
     * Default is true
     */
    show_order_details?: boolean;

    /**
     * Theme of the page
     *
     * Default is `System`.
     */
    theme?: 'dark' | 'light' | 'system';
  }

  export interface FeatureFlags {
    /**
     * if customer is allowed to change currency, set it to true
     *
     * Default is true
     */
    allow_currency_selection?: boolean;

    allow_customer_editing_city?: boolean;

    allow_customer_editing_country?: boolean;

    allow_customer_editing_email?: boolean;

    allow_customer_editing_name?: boolean;

    allow_customer_editing_state?: boolean;

    allow_customer_editing_street?: boolean;

    allow_customer_editing_zipcode?: boolean;

    /**
     * If the customer is allowed to apply discount code, set it to true.
     *
     * Default is true
     */
    allow_discount_code?: boolean;

    /**
     * If phone number is collected from customer, set it to rue
     *
     * Default is true
     */
    allow_phone_number_collection?: boolean;

    /**
     * If the customer is allowed to add tax id, set it to true
     *
     * Default is true
     */
    allow_tax_id?: boolean;

    /**
     * Set to true if a new customer object should be created. By default email is used
     * to find an existing customer to attach the session to
     *
     * Default is false
     */
    always_create_new_customer?: boolean;

    /**
     * If true, redirects the customer immediately after payment completion
     *
     * Default is false
     */
    redirect_immediately?: boolean;
  }

  export interface SubscriptionData {
    on_demand?: SubscriptionsAPI.OnDemandSubscription | null;

    /**
     * Optional trial period in days If specified, this value overrides the trial
     * period set in the product's price Must be between 0 and 10000 days
     */
    trial_period_days?: number | null;
  }
}

export interface CheckoutSessionResponse {
  /**
   * The ID of the created checkout session
   */
  session_id: string;

  /**
   * Checkout url (None when payment_method_id is provided)
   */
  checkout_url?: string | null;
}

export interface CheckoutSessionStatus {
  /**
   * Id of the checkout session
   */
  id: string;

  /**
   * Created at timestamp
   */
  created_at: string;

  /**
   * Customer email: prefers payment's customer, falls back to session
   */
  customer_email?: string | null;

  /**
   * Customer name: prefers payment's customer, falls back to session
   */
  customer_name?: string | null;

  /**
   * Id of the payment created by the checkout sessions.
   *
   * Null if checkout sessions is still at the details collection stage.
   */
  payment_id?: string | null;

  /**
   * status of the payment.
   *
   * Null if checkout sessions is still at the details collection stage.
   */
  payment_status?: PaymentsAPI.IntentStatus | null;
}

/**
 * Data returned by the calculate checkout session API
 */
export interface CheckoutSessionPreviewResponse {
  /**
   * Billing country
   */
  billing_country: MiscAPI.CountryCode;

  /**
   * Currency in which the calculations were made
   */
  currency: MiscAPI.Currency;

  /**
   * Breakup of the current payment
   */
  current_breakup: CheckoutSessionPreviewResponse.CurrentBreakup;

  /**
   * The total product cart
   */
  product_cart: Array<CheckoutSessionPreviewResponse.ProductCart>;

  /**
   * Total calculate price of the product cart
   */
  total_price: number;

  /**
   * Breakup of recurring payments (None for one-time only)
   */
  recurring_breakup?: CheckoutSessionPreviewResponse.RecurringBreakup | null;

  /**
   * Total tax
   */
  total_tax?: number | null;
}

export namespace CheckoutSessionPreviewResponse {
  /**
   * Breakup of the current payment
   */
  export interface CurrentBreakup {
    /**
     * Total discount amount
     */
    discount: number;

    /**
     * Subtotal before discount (pre-tax original prices)
     */
    subtotal: number;

    /**
     * Total amount to be charged (final amount after all calculations)
     */
    total_amount: number;

    /**
     * Total tax amount
     */
    tax?: number | null;
  }

  export interface ProductCart {
    /**
     * the currency in which the calculatiosn were made
     */
    currency: MiscAPI.Currency;

    /**
     * discounted price
     */
    discounted_price: number;

    /**
     * Whether this is a subscription product (affects tax calculation in breakup)
     */
    is_subscription: boolean;

    is_usage_based: boolean;

    meters: Array<ProductCart.Meter>;

    /**
     * the product currency
     */
    og_currency: MiscAPI.Currency;

    /**
     * original price of the product
     */
    og_price: number;

    /**
     * unique id of the product
     */
    product_id: string;

    /**
     * Quanitity
     */
    quantity: number;

    /**
     * tax category
     */
    tax_category: MiscAPI.TaxCategory;

    /**
     * Whether tax is included in the price
     */
    tax_inclusive: boolean;

    /**
     * tax rate
     */
    tax_rate: number;

    addons?: Array<ProductCart.Addon> | null;

    description?: string | null;

    /**
     * discount percentage
     */
    discount_amount?: number | null;

    /**
     * number of cycles the discount will apply
     */
    discount_cycle?: number | null;

    /**
     * name of the product
     */
    name?: string | null;

    /**
     * total tax
     */
    tax?: number | null;
  }

  export namespace ProductCart {
    export interface Meter {
      measurement_unit: string;

      name: string;

      price_per_unit: string;

      description?: string | null;

      free_threshold?: number | null;
    }

    export interface Addon {
      addon_id: string;

      currency: MiscAPI.Currency;

      discounted_price: number;

      name: string;

      og_currency: MiscAPI.Currency;

      og_price: number;

      quantity: number;

      /**
       * Represents the different categories of taxation applicable to various products
       * and services.
       */
      tax_category: MiscAPI.TaxCategory;

      tax_inclusive: boolean;

      tax_rate: number;

      description?: string | null;

      discount_amount?: number | null;

      tax?: number | null;
    }
  }

  /**
   * Breakup of recurring payments (None for one-time only)
   */
  export interface RecurringBreakup {
    /**
     * Total discount amount
     */
    discount: number;

    /**
     * Subtotal before discount (pre-tax original prices)
     */
    subtotal: number;

    /**
     * Total recurring amount including tax
     */
    total_amount: number;

    /**
     * Total tax on recurring payments
     */
    tax?: number | null;
  }
}

export interface CheckoutSessionCreateParams {
  product_cart: Array<CheckoutSessionCreateParams.ProductCart>;

  /**
   * Customers will never see payment methods that are not in this list. However,
   * adding a method here does not guarantee customers will see it. Availability
   * still depends on other factors (e.g., customer location, merchant settings).
   *
   * Disclaimar: Always provide 'credit' and 'debit' as a fallback. If all payment
   * methods are unavailable, checkout session will fail.
   */
  allowed_payment_method_types?: Array<PaymentsAPI.PaymentMethodTypes> | null;

  /**
   * Billing address information for the session
   */
  billing_address?: CheckoutSessionCreateParams.BillingAddress | null;

  /**
   * This field is ingored if adaptive pricing is disabled
   */
  billing_currency?: MiscAPI.Currency | null;

  /**
   * If confirm is true, all the details will be finalized. If required data is
   * missing, an API error is thrown.
   */
  confirm?: boolean;

  /**
   * Custom fields to collect from customer during checkout (max 5 fields)
   */
  custom_fields?: Array<CheckoutSessionCreateParams.CustomField> | null;

  /**
   * Customer details for the session
   */
  customer?: PaymentsAPI.CustomerRequest | null;

  /**
   * Customization for the checkout session page
   */
  customization?: CheckoutSessionCreateParams.Customization;

  discount_code?: string | null;

  feature_flags?: CheckoutSessionCreateParams.FeatureFlags;

  /**
   * Override merchant default 3DS behaviour for this session
   */
  force_3ds?: boolean | null;

  /**
   * Additional metadata associated with the payment. Defaults to empty if not
   * provided.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * If true, only zipcode is required when confirm is true; other address fields
   * remain optional
   */
  minimal_address?: boolean;

  /**
   * Optional payment method ID to use for this checkout session. Only allowed when
   * `confirm` is true. If provided, existing customer id must also be provided.
   */
  payment_method_id?: string | null;

  /**
   * Product collection ID for collection-based checkout flow
   */
  product_collection_id?: string | null;

  /**
   * The url to redirect after payment failure or success.
   */
  return_url?: string | null;

  /**
   * If true, returns a shortened checkout URL. Defaults to false if not specified.
   */
  short_link?: boolean;

  /**
   * Display saved payment methods of a returning customer False by default
   */
  show_saved_payment_methods?: boolean;

  subscription_data?: CheckoutSessionCreateParams.SubscriptionData | null;
}

export namespace CheckoutSessionCreateParams {
  export interface ProductCart {
    /**
     * unique id of the product
     */
    product_id: string;

    quantity: number;

    /**
     * only valid if product is a subscription
     */
    addons?: Array<SubscriptionsAPI.AttachAddon> | null;

    /**
     * Amount the customer pays if pay_what_you_want is enabled. If disabled then
     * amount will be ignored Represented in the lowest denomination of the currency
     * (e.g., cents for USD). For example, to charge $1.00, pass `100`. Only applicable
     * for one time payments
     *
     * If amount is not set for pay_what_you_want product, customer is allowed to
     * select the amount.
     */
    amount?: number | null;
  }

  /**
   * Billing address information for the session
   */
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
   * Definition of a custom field for checkout
   */
  export interface CustomField {
    /**
     * Type of field determining validation rules
     */
    field_type: 'text' | 'number' | 'email' | 'url' | 'phone' | 'date' | 'datetime' | 'dropdown' | 'boolean';

    /**
     * Unique identifier for this field (used as key in responses)
     */
    key: string;

    /**
     * Display label shown to customer
     */
    label: string;

    /**
     * Options for dropdown type (required for dropdown, ignored for others)
     */
    options?: Array<string> | null;

    /**
     * Placeholder text for the input
     */
    placeholder?: string | null;

    /**
     * Whether this field is required
     */
    required?: boolean;
  }

  /**
   * Customization for the checkout session page
   */
  export interface Customization {
    /**
     * Force the checkout interface to render in a specific language (e.g. `en`, `es`)
     */
    force_language?: string | null;

    /**
     * Show on demand tag
     *
     * Default is true
     */
    show_on_demand_tag?: boolean;

    /**
     * Show order details by default
     *
     * Default is true
     */
    show_order_details?: boolean;

    /**
     * Theme of the page
     *
     * Default is `System`.
     */
    theme?: 'dark' | 'light' | 'system';
  }

  export interface FeatureFlags {
    /**
     * if customer is allowed to change currency, set it to true
     *
     * Default is true
     */
    allow_currency_selection?: boolean;

    allow_customer_editing_city?: boolean;

    allow_customer_editing_country?: boolean;

    allow_customer_editing_email?: boolean;

    allow_customer_editing_name?: boolean;

    allow_customer_editing_state?: boolean;

    allow_customer_editing_street?: boolean;

    allow_customer_editing_zipcode?: boolean;

    /**
     * If the customer is allowed to apply discount code, set it to true.
     *
     * Default is true
     */
    allow_discount_code?: boolean;

    /**
     * If phone number is collected from customer, set it to rue
     *
     * Default is true
     */
    allow_phone_number_collection?: boolean;

    /**
     * If the customer is allowed to add tax id, set it to true
     *
     * Default is true
     */
    allow_tax_id?: boolean;

    /**
     * Set to true if a new customer object should be created. By default email is used
     * to find an existing customer to attach the session to
     *
     * Default is false
     */
    always_create_new_customer?: boolean;

    /**
     * If true, redirects the customer immediately after payment completion
     *
     * Default is false
     */
    redirect_immediately?: boolean;
  }

  export interface SubscriptionData {
    on_demand?: SubscriptionsAPI.OnDemandSubscription | null;

    /**
     * Optional trial period in days If specified, this value overrides the trial
     * period set in the product's price Must be between 0 and 10000 days
     */
    trial_period_days?: number | null;
  }
}

export interface CheckoutSessionPreviewParams {
  product_cart: Array<CheckoutSessionPreviewParams.ProductCart>;

  /**
   * Customers will never see payment methods that are not in this list. However,
   * adding a method here does not guarantee customers will see it. Availability
   * still depends on other factors (e.g., customer location, merchant settings).
   *
   * Disclaimar: Always provide 'credit' and 'debit' as a fallback. If all payment
   * methods are unavailable, checkout session will fail.
   */
  allowed_payment_method_types?: Array<PaymentsAPI.PaymentMethodTypes> | null;

  /**
   * Billing address information for the session
   */
  billing_address?: CheckoutSessionPreviewParams.BillingAddress | null;

  /**
   * This field is ingored if adaptive pricing is disabled
   */
  billing_currency?: MiscAPI.Currency | null;

  /**
   * If confirm is true, all the details will be finalized. If required data is
   * missing, an API error is thrown.
   */
  confirm?: boolean;

  /**
   * Custom fields to collect from customer during checkout (max 5 fields)
   */
  custom_fields?: Array<CheckoutSessionPreviewParams.CustomField> | null;

  /**
   * Customer details for the session
   */
  customer?: PaymentsAPI.CustomerRequest | null;

  /**
   * Customization for the checkout session page
   */
  customization?: CheckoutSessionPreviewParams.Customization;

  discount_code?: string | null;

  feature_flags?: CheckoutSessionPreviewParams.FeatureFlags;

  /**
   * Override merchant default 3DS behaviour for this session
   */
  force_3ds?: boolean | null;

  /**
   * Additional metadata associated with the payment. Defaults to empty if not
   * provided.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * If true, only zipcode is required when confirm is true; other address fields
   * remain optional
   */
  minimal_address?: boolean;

  /**
   * Optional payment method ID to use for this checkout session. Only allowed when
   * `confirm` is true. If provided, existing customer id must also be provided.
   */
  payment_method_id?: string | null;

  /**
   * Product collection ID for collection-based checkout flow
   */
  product_collection_id?: string | null;

  /**
   * The url to redirect after payment failure or success.
   */
  return_url?: string | null;

  /**
   * If true, returns a shortened checkout URL. Defaults to false if not specified.
   */
  short_link?: boolean;

  /**
   * Display saved payment methods of a returning customer False by default
   */
  show_saved_payment_methods?: boolean;

  subscription_data?: CheckoutSessionPreviewParams.SubscriptionData | null;
}

export namespace CheckoutSessionPreviewParams {
  export interface ProductCart {
    /**
     * unique id of the product
     */
    product_id: string;

    quantity: number;

    /**
     * only valid if product is a subscription
     */
    addons?: Array<SubscriptionsAPI.AttachAddon> | null;

    /**
     * Amount the customer pays if pay_what_you_want is enabled. If disabled then
     * amount will be ignored Represented in the lowest denomination of the currency
     * (e.g., cents for USD). For example, to charge $1.00, pass `100`. Only applicable
     * for one time payments
     *
     * If amount is not set for pay_what_you_want product, customer is allowed to
     * select the amount.
     */
    amount?: number | null;
  }

  /**
   * Billing address information for the session
   */
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
   * Definition of a custom field for checkout
   */
  export interface CustomField {
    /**
     * Type of field determining validation rules
     */
    field_type: 'text' | 'number' | 'email' | 'url' | 'phone' | 'date' | 'datetime' | 'dropdown' | 'boolean';

    /**
     * Unique identifier for this field (used as key in responses)
     */
    key: string;

    /**
     * Display label shown to customer
     */
    label: string;

    /**
     * Options for dropdown type (required for dropdown, ignored for others)
     */
    options?: Array<string> | null;

    /**
     * Placeholder text for the input
     */
    placeholder?: string | null;

    /**
     * Whether this field is required
     */
    required?: boolean;
  }

  /**
   * Customization for the checkout session page
   */
  export interface Customization {
    /**
     * Force the checkout interface to render in a specific language (e.g. `en`, `es`)
     */
    force_language?: string | null;

    /**
     * Show on demand tag
     *
     * Default is true
     */
    show_on_demand_tag?: boolean;

    /**
     * Show order details by default
     *
     * Default is true
     */
    show_order_details?: boolean;

    /**
     * Theme of the page
     *
     * Default is `System`.
     */
    theme?: 'dark' | 'light' | 'system';
  }

  export interface FeatureFlags {
    /**
     * if customer is allowed to change currency, set it to true
     *
     * Default is true
     */
    allow_currency_selection?: boolean;

    allow_customer_editing_city?: boolean;

    allow_customer_editing_country?: boolean;

    allow_customer_editing_email?: boolean;

    allow_customer_editing_name?: boolean;

    allow_customer_editing_state?: boolean;

    allow_customer_editing_street?: boolean;

    allow_customer_editing_zipcode?: boolean;

    /**
     * If the customer is allowed to apply discount code, set it to true.
     *
     * Default is true
     */
    allow_discount_code?: boolean;

    /**
     * If phone number is collected from customer, set it to rue
     *
     * Default is true
     */
    allow_phone_number_collection?: boolean;

    /**
     * If the customer is allowed to add tax id, set it to true
     *
     * Default is true
     */
    allow_tax_id?: boolean;

    /**
     * Set to true if a new customer object should be created. By default email is used
     * to find an existing customer to attach the session to
     *
     * Default is false
     */
    always_create_new_customer?: boolean;

    /**
     * If true, redirects the customer immediately after payment completion
     *
     * Default is false
     */
    redirect_immediately?: boolean;
  }

  export interface SubscriptionData {
    on_demand?: SubscriptionsAPI.OnDemandSubscription | null;

    /**
     * Optional trial period in days If specified, this value overrides the trial
     * period set in the product's price Must be between 0 and 10000 days
     */
    trial_period_days?: number | null;
  }
}

export declare namespace CheckoutSessions {
  export {
    type CheckoutSessionRequest as CheckoutSessionRequest,
    type CheckoutSessionResponse as CheckoutSessionResponse,
    type CheckoutSessionStatus as CheckoutSessionStatus,
    type CheckoutSessionPreviewResponse as CheckoutSessionPreviewResponse,
    type CheckoutSessionCreateParams as CheckoutSessionCreateParams,
    type CheckoutSessionPreviewParams as CheckoutSessionPreviewParams,
  };
}
