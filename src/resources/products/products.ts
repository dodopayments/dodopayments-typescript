// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProductsAPI from './products';
import * as MiscAPI from '../misc';
import * as SubscriptionsAPI from '../subscriptions';
import * as CreditEntitlementsAPI from '../credit-entitlements/credit-entitlements';
import * as ImagesAPI from './images';
import { ImageUpdateParams, ImageUpdateResponse, Images } from './images';
import * as ShortLinksAPI from './short-links';
import { ShortLinkCreateParams, ShortLinkCreateResponse, ShortLinkListParams, ShortLinkListResponse, ShortLinkListResponsesDefaultPageNumberPagination, ShortLinks } from './short-links';
import { APIPromise } from '../../core/api-promise';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Products extends APIResource {
  images: ImagesAPI.Images = new ImagesAPI.Images(this._client);
  shortLinks: ShortLinksAPI.ShortLinks = new ShortLinksAPI.ShortLinks(this._client);

  create(body: ProductCreateParams, options?: RequestOptions): APIPromise<Product> {
    return this._client.post('/products', { body, ...options });
  }

  retrieve(id: string, options?: RequestOptions): APIPromise<Product> {
    return this._client.get(path`/products/${id}`, options);
  }

  update(id: string, body: ProductUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/products/${id}`, { body, ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  list(query: ProductListParams | null | undefined = {}, options?: RequestOptions): PagePromise<ProductListResponsesDefaultPageNumberPagination, ProductListResponse> {
    return this._client.getAPIList('/products', DefaultPageNumberPagination<ProductListResponse>, { query, ...options });
  }

  archive(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/products/${id}`, { ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  unarchive(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/products/${id}/unarchive`, { ...options, headers: buildHeaders([{Accept: '*/*'}, options?.headers]) });
  }

  updateFiles(id: string, body: ProductUpdateFilesParams, options?: RequestOptions): APIPromise<ProductUpdateFilesResponse> {
    return this._client.put(path`/products/${id}/files`, { body, ...options });
  }
}

export type ProductListResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<ProductListResponse>

export interface AddMeterToPrice {
  meter_id: string;

  /**
   * Optional credit entitlement ID to link this meter to for credit-based billing
   */
  credit_entitlement_id?: string | null;

  /**
   * Meter description. Will ignored on Request, but will be shown in response
   */
  description?: string | null;

  free_threshold?: number | null;

  /**
   * Meter measurement unit. Will ignored on Request, but will be shown in response
   */
  measurement_unit?: string | null;

  /**
   * Number of meter units that equal one credit. Required when credit_entitlement_id
   * is set.
   */
  meter_units_per_credit?: string | null;

  /**
   * Meter name. Will ignored on Request, but will be shown in response
   */
  name?: string | null;

  /**
   * The price per unit in lowest denomination. Must be greater than zero. Supports
   * up to 5 digits before decimal point and 12 decimal places.
   */
  price_per_unit?: string | null;
}

/**
 * Request struct for attaching a credit entitlement to a product
 */
export interface AttachCreditEntitlement {
  /**
   * ID of the credit entitlement to attach
   */
  credit_entitlement_id: string;

  /**
   * Number of credits to grant when this product is purchased
   */
  credits_amount: string;

  /**
   * Currency for credit-related pricing
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Number of days after which credits expire
   */
  expires_after_days?: number | null;

  /**
   * Balance threshold percentage for low balance notifications (0-100)
   */
  low_balance_threshold_percent?: number | null;

  /**
   * Maximum number of rollover cycles allowed
   */
  max_rollover_count?: number | null;

  /**
   * Controls how overage is handled at billing cycle end.
   */
  overage_behavior?: CreditEntitlementsAPI.CbbOverageBehavior | null;

  /**
   * Whether overage usage is allowed beyond credit balance
   */
  overage_enabled?: boolean | null;

  /**
   * Maximum amount of overage allowed
   */
  overage_limit?: string | null;

  /**
   * Price per credit unit for purchasing additional credits
   */
  price_per_unit?: string | null;

  /**
   * Proration behavior for credit grants during plan changes
   */
  proration_behavior?: CbbProrationBehavior | null;

  /**
   * Whether unused credits can roll over to the next billing period
   */
  rollover_enabled?: boolean | null;

  /**
   * Percentage of unused credits that can roll over (0-100)
   */
  rollover_percentage?: number | null;

  /**
   * Number of timeframe units for rollover window
   */
  rollover_timeframe_count?: number | null;

  /**
   * Time interval for rollover window (day, week, month, year)
   */
  rollover_timeframe_interval?: SubscriptionsAPI.TimeInterval | null;

  /**
   * Credits granted during trial period
   */
  trial_credits?: string | null;

  /**
   * Whether trial credits expire when trial ends
   */
  trial_credits_expire_after_trial?: boolean | null;
}

export type CbbProrationBehavior = 'prorate' | 'no_prorate'

/**
 * Response struct for credit entitlement mapping
 */
export interface CreditEntitlementMappingResponse {
  /**
   * Unique ID of this mapping
   */
  id: string;

  /**
   * ID of the credit entitlement
   */
  credit_entitlement_id: string;

  /**
   * Name of the credit entitlement
   */
  credit_entitlement_name: string;

  /**
   * Unit label for the credit entitlement
   */
  credit_entitlement_unit: string;

  /**
   * Number of credits granted
   */
  credits_amount: string;

  /**
   * Controls how overage is handled at billing cycle end.
   */
  overage_behavior: CreditEntitlementsAPI.CbbOverageBehavior;

  /**
   * Whether overage is enabled
   */
  overage_enabled: boolean;

  /**
   * Proration behavior for credit grants during plan changes
   */
  proration_behavior: CbbProrationBehavior;

  /**
   * Whether rollover is enabled
   */
  rollover_enabled: boolean;

  /**
   * Whether trial credits expire after trial
   */
  trial_credits_expire_after_trial: boolean;

  /**
   * Currency
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Days until credits expire
   */
  expires_after_days?: number | null;

  /**
   * Low balance threshold percentage
   */
  low_balance_threshold_percent?: number | null;

  /**
   * Maximum rollover cycles
   */
  max_rollover_count?: number | null;

  /**
   * Overage limit
   */
  overage_limit?: string | null;

  /**
   * Price per unit
   */
  price_per_unit?: string | null;

  /**
   * Rollover percentage
   */
  rollover_percentage?: number | null;

  /**
   * Rollover timeframe count
   */
  rollover_timeframe_count?: number | null;

  /**
   * Rollover timeframe interval
   */
  rollover_timeframe_interval?: SubscriptionsAPI.TimeInterval | null;

  /**
   * Trial credits
   */
  trial_credits?: string | null;
}

export interface DigitalProductDelivery {
  /**
   * External URL to digital product
   */
  external_url?: string | null;

  /**
   * Uploaded files ids of digital product
   */
  files?: Array<DigitalProductDeliveryFile> | null;

  /**
   * Instructions to download and use the digital product
   */
  instructions?: string | null;
}

export interface DigitalProductDeliveryFile {
  file_id: string;

  file_name: string;

  url: string;
}

export interface LicenseKeyDuration {
  count: number;

  interval: SubscriptionsAPI.TimeInterval;
}

/**
 * One-time price details.
 */
export type Price = Price.OneTimePrice | Price.RecurringPrice | Price.UsageBasedPrice

export namespace Price {
  /**
   * One-time price details.
   */
  export interface OneTimePrice {
    /**
     * The currency in which the payment is made.
     */
    currency: MiscAPI.Currency;

    /**
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * The payment amount, in the smallest denomination of the currency (e.g., cents
     * for USD). For example, to charge $1.00, pass `100`.
     *
     * If [`pay_what_you_want`](Self::pay_what_you_want) is set to `true`, this field
     * represents the **minimum** amount the customer must pay.
     */
    price: number;

    /**
     * Indicates if purchasing power parity adjustments are applied to the price.
     * Purchasing power parity feature is not available as of now.
     */
    purchasing_power_parity: boolean;

    type: 'one_time_price';

    /**
     * Indicates whether the customer can pay any amount they choose. If set to `true`,
     * the [`price`](Self::price) field is the minimum amount.
     */
    pay_what_you_want?: boolean;

    /**
     * A suggested price for the user to pay. This value is only considered if
     * [`pay_what_you_want`](Self::pay_what_you_want) is `true`. Otherwise, it is
     * ignored.
     */
    suggested_price?: number | null;

    /**
     * Indicates if the price is tax inclusive.
     */
    tax_inclusive?: boolean | null;
  }

  /**
   * Recurring price details.
   */
  export interface RecurringPrice {
    /**
     * The currency in which the payment is made.
     */
    currency: MiscAPI.Currency;

    /**
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * Number of units for the payment frequency. For example, a value of `1` with a
     * `payment_frequency_interval` of `month` represents monthly payments.
     */
    payment_frequency_count: number;

    /**
     * The time interval for the payment frequency (e.g., day, month, year).
     */
    payment_frequency_interval: SubscriptionsAPI.TimeInterval;

    /**
     * The payment amount. Represented in the lowest denomination of the currency
     * (e.g., cents for USD). For example, to charge $1.00, pass `100`.
     */
    price: number;

    /**
     * Indicates if purchasing power parity adjustments are applied to the price.
     * Purchasing power parity feature is not available as of now
     */
    purchasing_power_parity: boolean;

    /**
     * Number of units for the subscription period. For example, a value of `12` with a
     * `subscription_period_interval` of `month` represents a one-year subscription.
     */
    subscription_period_count: number;

    /**
     * The time interval for the subscription period (e.g., day, month, year).
     */
    subscription_period_interval: SubscriptionsAPI.TimeInterval;

    type: 'recurring_price';

    /**
     * Indicates if the price is tax inclusive
     */
    tax_inclusive?: boolean | null;

    /**
     * Number of days for the trial period. A value of `0` indicates no trial period.
     */
    trial_period_days?: number;
  }

  /**
   * Usage Based price details.
   */
  export interface UsageBasedPrice {
    /**
     * The currency in which the payment is made.
     */
    currency: MiscAPI.Currency;

    /**
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * The fixed payment amount. Represented in the lowest denomination of the currency
     * (e.g., cents for USD). For example, to charge $1.00, pass `100`.
     */
    fixed_price: number;

    /**
     * Number of units for the payment frequency. For example, a value of `1` with a
     * `payment_frequency_interval` of `month` represents monthly payments.
     */
    payment_frequency_count: number;

    /**
     * The time interval for the payment frequency (e.g., day, month, year).
     */
    payment_frequency_interval: SubscriptionsAPI.TimeInterval;

    /**
     * Indicates if purchasing power parity adjustments are applied to the price.
     * Purchasing power parity feature is not available as of now
     */
    purchasing_power_parity: boolean;

    /**
     * Number of units for the subscription period. For example, a value of `12` with a
     * `subscription_period_interval` of `month` represents a one-year subscription.
     */
    subscription_period_count: number;

    /**
     * The time interval for the subscription period (e.g., day, month, year).
     */
    subscription_period_interval: SubscriptionsAPI.TimeInterval;

    type: 'usage_based_price';

    meters?: Array<ProductsAPI.AddMeterToPrice> | null;

    /**
     * Indicates if the price is tax inclusive
     */
    tax_inclusive?: boolean | null;
  }
}

export interface Product {
  brand_id: string;

  /**
   * Unique identifier for the business to which the product belongs.
   */
  business_id: string;

  /**
   * Timestamp when the product was created.
   */
  created_at: string;

  /**
   * Attached credit entitlements with settings
   */
  credit_entitlements: Array<CreditEntitlementMappingResponse>;

  /**
   * Attached entitlements (integration-based access grants)
   */
  entitlements: Array<Product.Entitlement>;

  /**
   * Indicates if the product is recurring (e.g., subscriptions).
   */
  is_recurring: boolean;

  /**
   * @deprecated Indicates whether the product requires a license key.
   */
  license_key_enabled: boolean;

  /**
   * Additional custom data associated with the product
   */
  metadata: { [key: string]: string };

  /**
   * Pricing information for the product.
   */
  price: Price;

  /**
   * Unique identifier for the product.
   */
  product_id: string;

  /**
   * Tax category associated with the product.
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Timestamp when the product was last updated.
   */
  updated_at: string;

  /**
   * Available Addons for subscription products
   */
  addons?: Array<string> | null;

  /**
   * Description of the product, optional.
   */
  description?: string | null;

  digital_product_delivery?: DigitalProductDelivery | null;

  /**
   * URL of the product image, optional.
   */
  image?: string | null;

  /**
   * @deprecated Message sent upon license key activation, if applicable.
   */
  license_key_activation_message?: string | null;

  /**
   * @deprecated Limit on the number of activations for the license key, if enabled.
   */
  license_key_activations_limit?: number | null;

  /**
   * Duration of the license key validity, if enabled.
   */
  license_key_duration?: LicenseKeyDuration | null;

  /**
   * Name of the product, optional.
   */
  name?: string | null;

  /**
   * The product collection ID this product belongs to, if any
   */
  product_collection_id?: string | null;
}

export namespace Product {
  /**
   * Summary of an entitlement attached to a product
   */
  export interface Entitlement {
    id: string;

    /**
     * Platform-specific configuration for an entitlement. Each variant uses unique
     * field names so `#[serde(untagged)]` can disambiguate correctly.
     */
    integration_config: Entitlement.GitHubConfig | Entitlement.DiscordConfig | Entitlement.TelegramConfig | Entitlement.FigmaConfig | Entitlement.FramerConfig | Entitlement.NotionConfig | Entitlement.DigitalFilesConfig | Entitlement.LicenseKeyConfig;

    integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key';

    name: string;

    description?: string | null;
  }

  export namespace Entitlement {
    export interface GitHubConfig {
      /**
       * One of: pull, push, admin, maintain, triage
       */
      permission: string;

      target_id: string;
    }

    export interface DiscordConfig {
      guild_id: string;

      role_id?: string | null;
    }

    export interface TelegramConfig {
      chat_id: string;
    }

    export interface FigmaConfig {
      figma_file_id: string;
    }

    export interface FramerConfig {
      framer_template_id: string;
    }

    export interface NotionConfig {
      notion_template_id: string;
    }

    export interface DigitalFilesConfig {
      digital_file_ids: Array<string>;

      external_url?: string | null;

      instructions?: string | null;
    }

    export interface LicenseKeyConfig {
      activation_message?: string | null;

      activations_limit?: number | null;

      duration_count?: number | null;

      duration_interval?: string | null;
    }
  }
}

export interface ProductListResponse {
  /**
   * Unique identifier for the business to which the product belongs.
   */
  business_id: string;

  /**
   * Timestamp when the product was created.
   */
  created_at: string;

  /**
   * Entitlements linked to this product
   */
  entitlements: Array<ProductListResponse.Entitlement>;

  /**
   * Indicates if the product is recurring (e.g., subscriptions).
   */
  is_recurring: boolean;

  /**
   * Additional custom data associated with the product
   */
  metadata: { [key: string]: string };

  /**
   * Unique identifier for the product.
   */
  product_id: string;

  /**
   * Tax category associated with the product.
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Timestamp when the product was last updated.
   */
  updated_at: string;

  /**
   * Currency of the price
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Description of the product, optional.
   */
  description?: string | null;

  /**
   * URL of the product image, optional.
   */
  image?: string | null;

  /**
   * Name of the product, optional.
   */
  name?: string | null;

  /**
   * Price of the product, optional.
   *
   * The price is represented in the lowest denomination of the currency. For
   * example:
   *
   * - In USD, a price of `$12.34` would be represented as `1234` (cents).
   * - In JPY, a price of `¥1500` would be represented as `1500` (yen).
   * - In INR, a price of `₹1234.56` would be represented as `123456` (paise).
   *
   * This ensures precision and avoids floating-point rounding errors.
   */
  price?: number | null;

  /**
   * Details of the price
   */
  price_detail?: Price | null;

  /**
   * Indicates if the price is tax inclusive
   */
  tax_inclusive?: boolean | null;
}

export namespace ProductListResponse {
  /**
   * Summary of an entitlement attached to a product
   */
  export interface Entitlement {
    id: string;

    /**
     * Platform-specific configuration for an entitlement. Each variant uses unique
     * field names so `#[serde(untagged)]` can disambiguate correctly.
     */
    integration_config: Entitlement.GitHubConfig | Entitlement.DiscordConfig | Entitlement.TelegramConfig | Entitlement.FigmaConfig | Entitlement.FramerConfig | Entitlement.NotionConfig | Entitlement.DigitalFilesConfig | Entitlement.LicenseKeyConfig;

    integration_type: 'discord' | 'telegram' | 'github' | 'figma' | 'framer' | 'notion' | 'digital_files' | 'license_key';

    name: string;

    description?: string | null;
  }

  export namespace Entitlement {
    export interface GitHubConfig {
      /**
       * One of: pull, push, admin, maintain, triage
       */
      permission: string;

      target_id: string;
    }

    export interface DiscordConfig {
      guild_id: string;

      role_id?: string | null;
    }

    export interface TelegramConfig {
      chat_id: string;
    }

    export interface FigmaConfig {
      figma_file_id: string;
    }

    export interface FramerConfig {
      framer_template_id: string;
    }

    export interface NotionConfig {
      notion_template_id: string;
    }

    export interface DigitalFilesConfig {
      digital_file_ids: Array<string>;

      external_url?: string | null;

      instructions?: string | null;
    }

    export interface LicenseKeyConfig {
      activation_message?: string | null;

      activations_limit?: number | null;

      duration_count?: number | null;

      duration_interval?: string | null;
    }
  }
}

export interface ProductUpdateFilesResponse {
  file_id: string;

  url: string;
}

export interface ProductCreateParams {
  /**
   * Name of the product
   */
  name: string;

  /**
   * Price configuration for the product
   */
  price: Price;

  /**
   * Tax category applied to this product
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Addons available for subscription product
   */
  addons?: Array<string> | null;

  /**
   * Brand id for the product, if not provided will default to primary brand
   */
  brand_id?: string | null;

  /**
   * Optional credit entitlements to attach (max 3)
   */
  credit_entitlements?: Array<AttachCreditEntitlement> | null;

  /**
   * Optional description of the product
   */
  description?: string | null;

  /**
   * Choose how you would like you digital product delivered
   */
  digital_product_delivery?: ProductCreateParams.DigitalProductDelivery | null;

  /**
   * Optional entitlement IDs to attach to this product (max 20)
   */
  entitlement_ids?: Array<string> | null;

  /**
   * @deprecated Optional message displayed during license key activation
   */
  license_key_activation_message?: string | null;

  /**
   * @deprecated The number of times the license key can be activated. Must be 0 or
   * greater
   */
  license_key_activations_limit?: number | null;

  /**
   * Duration configuration for the license key. Set to null if you don't want the
   * license key to expire. For subscriptions, the lifetime of the license key is
   * tied to the subscription period
   */
  license_key_duration?: LicenseKeyDuration | null;

  /**
   * @deprecated When true, generates and sends a license key to your customer.
   * Defaults to false
   */
  license_key_enabled?: boolean | null;

  /**
   * Additional metadata for the product
   */
  metadata?: { [key: string]: string };
}

export namespace ProductCreateParams {
  /**
   * Choose how you would like you digital product delivered
   */
  export interface DigitalProductDelivery {
    /**
     * External URL to digital product
     */
    external_url?: string | null;

    /**
     * Instructions to download and use the digital product
     */
    instructions?: string | null;
  }
}

export interface ProductUpdateParams {
  /**
   * Available Addons for subscription products
   */
  addons?: Array<string> | null;

  brand_id?: string | null;

  /**
   * Credit entitlements to update (replaces all existing when present) Send empty
   * array to remove all, omit field to leave unchanged
   */
  credit_entitlements?: Array<AttachCreditEntitlement> | null;

  /**
   * Description of the product, optional and must be at most 1000 characters.
   */
  description?: string | null;

  /**
   * Choose how you would like you digital product delivered
   */
  digital_product_delivery?: ProductUpdateParams.DigitalProductDelivery | null;

  /**
   * Entitlement IDs to attach (replaces all existing when present) Send empty array
   * to remove all, omit field to leave unchanged
   */
  entitlement_ids?: Array<string> | null;

  /**
   * Product image id after its uploaded to S3
   */
  image_id?: string | null;

  /**
   * @deprecated Message sent to the customer upon license key activation.
   *
   * Only applicable if `license_key_enabled` is `true`. This message contains
   * instructions for activating the license key.
   */
  license_key_activation_message?: string | null;

  /**
   * @deprecated Limit for the number of activations for the license key.
   *
   * Only applicable if `license_key_enabled` is `true`. Represents the maximum
   * number of times the license key can be activated.
   */
  license_key_activations_limit?: number | null;

  /**
   * Duration of the license key if enabled.
   *
   * Only applicable if `license_key_enabled` is `true`. Represents the duration in
   * days for which the license key is valid.
   */
  license_key_duration?: LicenseKeyDuration | null;

  /**
   * @deprecated Whether the product requires a license key.
   *
   * If `true`, additional fields related to license key (duration, activations
   * limit, activation message) become applicable.
   */
  license_key_enabled?: boolean | null;

  /**
   * Additional metadata for the product
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Name of the product, optional and must be at most 100 characters.
   */
  name?: string | null;

  /**
   * Price details of the product.
   */
  price?: Price | null;

  /**
   * Tax category of the product.
   */
  tax_category?: MiscAPI.TaxCategory | null;
}

export namespace ProductUpdateParams {
  /**
   * Choose how you would like you digital product delivered
   */
  export interface DigitalProductDelivery {
    /**
     * External URL to digital product
     */
    external_url?: string | null;

    /**
     * Uploaded files ids of digital product
     */
    files?: Array<string> | null;

    /**
     * Instructions to download and use the digital product
     */
    instructions?: string | null;
  }
}

export interface ProductListParams extends DefaultPageNumberPaginationParams {
  /**
   * List archived products
   */
  archived?: boolean;

  /**
   * filter by Brand id
   */
  brand_id?: string;

  /**
   * Filter products by pricing type:
   *
   * - `true`: Show only recurring pricing products (e.g. subscriptions)
   * - `false`: Show only one-time price products
   * - `null` or absent: Show both types of products
   */
  recurring?: boolean;
}

export interface ProductUpdateFilesParams {
  file_name: string;
}

Products.Images = Images;
Products.ShortLinks = ShortLinks;

export declare namespace Products {
  export {
    type AddMeterToPrice as AddMeterToPrice,
    type AttachCreditEntitlement as AttachCreditEntitlement,
    type CbbProrationBehavior as CbbProrationBehavior,
    type CreditEntitlementMappingResponse as CreditEntitlementMappingResponse,
    type DigitalProductDelivery as DigitalProductDelivery,
    type DigitalProductDeliveryFile as DigitalProductDeliveryFile,
    type LicenseKeyDuration as LicenseKeyDuration,
    type Price as Price,
    type Product as Product,
    type ProductListResponse as ProductListResponse,
    type ProductUpdateFilesResponse as ProductUpdateFilesResponse,
    type ProductListResponsesDefaultPageNumberPagination as ProductListResponsesDefaultPageNumberPagination,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
    type ProductUpdateFilesParams as ProductUpdateFilesParams
  };

  export {
    Images as Images,
    type ImageUpdateResponse as ImageUpdateResponse,
    type ImageUpdateParams as ImageUpdateParams
  };

  export {
    ShortLinks as ShortLinks,
    type ShortLinkCreateResponse as ShortLinkCreateResponse,
    type ShortLinkListResponse as ShortLinkListResponse,
    type ShortLinkListResponsesDefaultPageNumberPagination as ShortLinkListResponsesDefaultPageNumberPagination,
    type ShortLinkCreateParams as ShortLinkCreateParams,
    type ShortLinkListParams as ShortLinkListParams
  };
}
