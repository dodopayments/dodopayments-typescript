// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
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
}

export class ProductListResponsesDefaultPageNumberPagination extends DefaultPageNumberPagination<ProductListResponse> {}

export interface Product {
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

  price: Product.OneTimePrice | Product.RecurringPrice;

  /**
   * Unique identifier for the product.
   */
  product_id: string;

  /**
   * Represents the different categories of taxation applicable to various products
   * and services.
   */
  tax_category: 'digital_products' | 'saas' | 'e_book';

  /**
   * Timestamp when the product was last updated.
   */
  updated_at: string;

  /**
   * Description of the product, optional.
   */
  description?: string | null;

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

  license_key_duration?: Product.LicenseKeyDuration | null;

  /**
   * Name of the product, optional.
   */
  name?: string | null;
}

export namespace Product {
  export interface OneTimePrice {
    currency:
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

  export interface RecurringPrice {
    currency:
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
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * Number of units for the payment frequency. For example, a value of `1` with a
     * `payment_frequency_interval` of `month` represents monthly payments.
     */
    payment_frequency_count: number;

    payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

    subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

  export interface LicenseKeyDuration {
    count: number;

    interval: 'Day' | 'Week' | 'Month' | 'Year';
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
   * Unique identifier for the product.
   */
  product_id: string;

  /**
   * Represents the different categories of taxation applicable to various products
   * and services.
   */
  tax_category: 'digital_products' | 'saas' | 'e_book';

  /**
   * Timestamp when the product was last updated.
   */
  updated_at: string;

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
    | 'ZMW'
    | null;

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

  price_detail?: ProductListResponse.OneTimePrice | ProductListResponse.RecurringPrice | null;

  /**
   * Indicates if the price is tax inclusive
   */
  tax_inclusive?: boolean | null;
}

export namespace ProductListResponse {
  export interface OneTimePrice {
    currency:
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

  export interface RecurringPrice {
    currency:
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
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * Number of units for the payment frequency. For example, a value of `1` with a
     * `payment_frequency_interval` of `month` represents monthly payments.
     */
    payment_frequency_count: number;

    payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

    subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

export interface ProductCreateParams {
  price: ProductCreateParams.OneTimePrice | ProductCreateParams.RecurringPrice;

  /**
   * Represents the different categories of taxation applicable to various products
   * and services.
   */
  tax_category: 'digital_products' | 'saas' | 'e_book';

  /**
   * Optional description of the product
   */
  description?: string | null;

  /**
   * Optional message displayed during license key activation
   */
  license_key_activation_message?: string | null;

  /**
   * The number of times the license key can be activated. Must be 0 or greater
   */
  license_key_activations_limit?: number | null;

  license_key_duration?: ProductCreateParams.LicenseKeyDuration | null;

  /**
   * When true, generates and sends a license key to your customer. Defaults to false
   */
  license_key_enabled?: boolean | null;

  /**
   * Optional name of the product
   */
  name?: string | null;
}

export namespace ProductCreateParams {
  export interface OneTimePrice {
    currency:
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

  export interface RecurringPrice {
    currency:
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
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * Number of units for the payment frequency. For example, a value of `1` with a
     * `payment_frequency_interval` of `month` represents monthly payments.
     */
    payment_frequency_count: number;

    payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

    subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

  export interface LicenseKeyDuration {
    count: number;

    interval: 'Day' | 'Week' | 'Month' | 'Year';
  }
}

export interface ProductUpdateParams {
  /**
   * Description of the product, optional and must be at most 1000 characters.
   */
  description?: string | null;

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

  license_key_duration?: ProductUpdateParams.LicenseKeyDuration | null;

  /**
   * Whether the product requires a license key.
   *
   * If `true`, additional fields related to license key (duration, activations
   * limit, activation message) become applicable.
   */
  license_key_enabled?: boolean | null;

  /**
   * Name of the product, optional and must be at most 100 characters.
   */
  name?: string | null;

  price?: ProductUpdateParams.OneTimePrice | ProductUpdateParams.RecurringPrice | null;

  /**
   * Represents the different categories of taxation applicable to various products
   * and services.
   */
  tax_category?: 'digital_products' | 'saas' | 'e_book' | null;
}

export namespace ProductUpdateParams {
  export interface LicenseKeyDuration {
    count: number;

    interval: 'Day' | 'Week' | 'Month' | 'Year';
  }

  export interface OneTimePrice {
    currency:
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

  export interface RecurringPrice {
    currency:
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
     * Discount applied to the price, represented as a percentage (0 to 100).
     */
    discount: number;

    /**
     * Number of units for the payment frequency. For example, a value of `1` with a
     * `payment_frequency_interval` of `month` represents monthly payments.
     */
    payment_frequency_count: number;

    payment_frequency_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

    subscription_period_interval: 'Day' | 'Week' | 'Month' | 'Year';

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

export interface ProductListParams extends DefaultPageNumberPaginationParams {
  /**
   * List archived products
   */
  archived?: boolean;
}

Products.ProductListResponsesDefaultPageNumberPagination = ProductListResponsesDefaultPageNumberPagination;
Products.Images = Images;

export declare namespace Products {
  export {
    type Product as Product,
    type ProductListResponse as ProductListResponse,
    ProductListResponsesDefaultPageNumberPagination as ProductListResponsesDefaultPageNumberPagination,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductListParams as ProductListParams,
  };

  export {
    Images as Images,
    type ImageUpdateResponse as ImageUpdateResponse,
    type ImageUpdateParams as ImageUpdateParams,
  };
}
