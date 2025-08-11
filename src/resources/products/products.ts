// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as MiscAPI from '../misc';
import * as SubscriptionsAPI from '../subscriptions';
import * as ImagesAPI from './images';
import { ImageUpdateParams, ImageUpdateResponse, Images } from './images';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../../pagination';

export class Products extends APIResource {
  images: ImagesAPI.Images = new ImagesAPI.Images(this._client);

  create(body: ProductCreateParams, options?: Core.RequestOptions): Core.APIPromise<Product> {
    return this._client.post('/products', { body, ...options });
  }

  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Product> {
    return this._client.get(`/products/${id}`, options);
  }

  update(id: string, body: ProductUpdateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.patch(`/products/${id}`, {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  list(
    query?: ProductListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ProductListResponsesDefaultPageNumberPagination, ProductListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ProductListResponsesDefaultPageNumberPagination, ProductListResponse>;
  list(
    query: ProductListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ProductListResponsesDefaultPageNumberPagination, ProductListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/products', ProductListResponsesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }

  delete(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/products/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  unarchive(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/products/${id}/unarchive`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  updateFiles(
    id: string,
    body: ProductUpdateFilesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ProductUpdateFilesResponse> {
    return this._client.put(`/products/${id}/files`, { body, ...options });
  }
}

export class ProductListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<ProductListResponse> {}

export interface LicenseKeyDuration {
  count: number;

  interval: SubscriptionsAPI.TimeInterval;
}

/**
 * One-time price details.
 */
export type Price = Price.OneTimePrice | Price.RecurringPrice;

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
   * Indicates if the product is recurring (e.g., subscriptions).
   */
  is_recurring: boolean;

  /**
   * Indicates whether the product requires a license key.
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

  digital_product_delivery?: Product.DigitalProductDelivery | null;

  /**
   * URL of the product image, optional.
   */
  image?: string | null;

  /**
   * Message sent upon license key activation, if applicable.
   */
  license_key_activation_message?: string | null;

  /**
   * Limit on the number of activations for the license key, if enabled.
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
}

export namespace Product {
  export interface DigitalProductDelivery {
    /**
     * External URL to digital product
     */
    external_url?: string | null;

    /**
     * Uploaded files ids of digital product
     */
    files?: Array<DigitalProductDelivery.File> | null;

    /**
     * Instructions to download and use the digital product
     */
    instructions?: string | null;
  }

  export namespace DigitalProductDelivery {
    export interface File {
      file_id: string;

      file_name: string;

      url: string;
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

export interface ProductUpdateFilesResponse {
  file_id: string;

  url: string;
}

export interface ProductCreateParams {
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
   * Optional description of the product
   */
  description?: string | null;

  /**
   * Choose how you would like you digital product delivered
   */
  digital_product_delivery?: ProductCreateParams.DigitalProductDelivery | null;

  /**
   * Optional message displayed during license key activation
   */
  license_key_activation_message?: string | null;

  /**
   * The number of times the license key can be activated. Must be 0 or greater
   */
  license_key_activations_limit?: number | null;

  /**
   * Duration configuration for the license key. Set to null if you don't want the
   * license key to expire. For subscriptions, the lifetime of the license key is
   * tied to the subscription period
   */
  license_key_duration?: LicenseKeyDuration | null;

  /**
   * When true, generates and sends a license key to your customer. Defaults to false
   */
  license_key_enabled?: boolean | null;

  /**
   * Additional metadata for the product
   */
  metadata?: { [key: string]: string };

  /**
   * Optional name of the product
   */
  name?: string | null;
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
   * Description of the product, optional and must be at most 1000 characters.
   */
  description?: string | null;

  /**
   * Choose how you would like you digital product delivered
   */
  digital_product_delivery?: ProductUpdateParams.DigitalProductDelivery | null;

  /**
   * Product image id after its uploaded to S3
   */
  image_id?: string | null;

  /**
   * Message sent to the customer upon license key activation.
   *
   * Only applicable if `license_key_enabled` is `true`. This message contains
   * instructions for activating the license key.
   */
  license_key_activation_message?: string | null;

  /**
   * Limit for the number of activations for the license key.
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
   * Whether the product requires a license key.
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

Products.ProductListResponsesDefaultPageNumberPagination = ProductListResponsesDefaultPageNumberPagination;
Products.Images = Images;

export declare namespace Products {
  export {
    type LicenseKeyDuration as LicenseKeyDuration,
    type Price as Price,
    type Product as Product,
    type ProductListResponse as ProductListResponse,
    type ProductUpdateFilesResponse as ProductUpdateFilesResponse,
    ProductListResponsesDefaultPageNumberPagination as ProductListResponsesDefaultPageNumberPagination,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
    type ProductUpdateFilesParams as ProductUpdateFilesParams,
  };

  export {
    Images as Images,
    type ImageUpdateResponse as ImageUpdateResponse,
    type ImageUpdateParams as ImageUpdateParams,
  };
}
