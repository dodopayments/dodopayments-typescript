// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class LocalizedPrices extends APIResource {
  /**
   * @example
   * ```ts
   * const listLocalizedPricesResponse =
   *   await client.products.localizedPrices.list(
   *     'pdt_R8AWMPiV8RyJElcCKvAID',
   *   );
   * ```
   */
  list(productID: string, options?: RequestOptions): APIPromise<ListLocalizedPricesResponse> {
    return this._client.get(path`/products/${productID}/localized-prices`, options);
  }

  /**
   * @example
   * ```ts
   * const localizedPrice =
   *   await client.products.localizedPrices.create(
   *     'pdt_R8AWMPiV8RyJElcCKvAID',
   *     { amount: 0, currency: 'AED' },
   *   );
   * ```
   */
  create(
    productID: string,
    body: LocalizedPriceCreateParams,
    options?: RequestOptions,
  ): APIPromise<LocalizedPrice> {
    return this._client.post(path`/products/${productID}/localized-prices`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const localizedPrice =
   *   await client.products.localizedPrices.retrieve(
   *     'lcp_3aOOT7ebrzBOV41yL2V6s',
   *     { product_id: 'pdt_R8AWMPiV8RyJElcCKvAID' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: LocalizedPriceRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<LocalizedPrice> {
    const { product_id } = params;
    return this._client.get(path`/products/${product_id}/localized-prices/${id}`, options);
  }

  /**
   * @example
   * ```ts
   * const localizedPrice =
   *   await client.products.localizedPrices.update(
   *     'lcp_3aOOT7ebrzBOV41yL2V6s',
   *     { product_id: 'pdt_R8AWMPiV8RyJElcCKvAID' },
   *   );
   * ```
   */
  update(
    id: string,
    params: LocalizedPriceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<LocalizedPrice> {
    const { product_id, ...body } = params;
    return this._client.patch(path`/products/${product_id}/localized-prices/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * await client.products.localizedPrices.archive(
   *   'lcp_3aOOT7ebrzBOV41yL2V6s',
   *   { product_id: 'pdt_R8AWMPiV8RyJElcCKvAID' },
   * );
   * ```
   */
  archive(id: string, params: LocalizedPriceArchiveParams, options?: RequestOptions): APIPromise<void> {
    const { product_id } = params;
    return this._client.delete(path`/products/${product_id}/localized-prices/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ListLocalizedPricesResponse {
  items: Array<LocalizedPrice>;
}

export interface LocalizedPrice {
  /**
   * Unique identifier for the localized price.
   */
  id: string;

  /**
   * Amount in the smallest currency unit (e.g., cents).
   */
  amount: number;

  /**
   * Timestamp when the localized price was created.
   */
  created_at: string;

  /**
   * Currency to charge in.
   */
  currency: MiscAPI.Currency;

  /**
   * Pricing mode of the rule: by_currency or by_country.
   */
  mode: PricingMode;

  /**
   * Product this localized price belongs to.
   */
  product_id: string;

  /**
   * Timestamp when the localized price was last updated.
   */
  updated_at: string;

  /**
   * Country the rule applies to. Only set when mode is by_country.
   */
  country_code?: MiscAPI.CountryCode | null;
}

export type PricingMode = 'by_currency' | 'by_country';

export interface LocalizedPriceCreateParams {
  /**
   * Amount in the smallest currency unit (e.g., cents). Must be greater than zero.
   */
  amount: number;

  /**
   * Currency to charge in. Must be a supported currency.
   */
  currency: MiscAPI.Currency;

  /**
   * Required when the product's pricing_mode is by_country; forbidden when
   * by_currency.
   */
  country_code?: MiscAPI.CountryCode | null;
}

export interface LocalizedPriceRetrieveParams {
  /**
   * Product Id
   */
  product_id: string;
}

export interface LocalizedPriceUpdateParams {
  /**
   * Path param: Product Id
   */
  product_id: string;

  /**
   * Body param: New amount in the smallest currency unit (e.g., cents). Must be
   * greater than zero. The currency and country_code of an existing rule cannot be
   * changed.
   */
  amount?: number | null;
}

export interface LocalizedPriceArchiveParams {
  /**
   * Product Id
   */
  product_id: string;
}

export declare namespace LocalizedPrices {
  export {
    type ListLocalizedPricesResponse as ListLocalizedPricesResponse,
    type LocalizedPrice as LocalizedPrice,
    type PricingMode as PricingMode,
    type LocalizedPriceCreateParams as LocalizedPriceCreateParams,
    type LocalizedPriceRetrieveParams as LocalizedPriceRetrieveParams,
    type LocalizedPriceUpdateParams as LocalizedPriceUpdateParams,
    type LocalizedPriceArchiveParams as LocalizedPriceArchiveParams,
  };
}
