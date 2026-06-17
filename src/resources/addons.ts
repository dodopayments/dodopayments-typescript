// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as MiscAPI from './misc';
import { APIPromise } from '../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Addons extends APIResource {
  /**
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const addonResponse of client.addons.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AddonListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AddonResponsesDefaultPageNumberPagination, AddonResponse> {
    return this._client.getAPIList('/addons', DefaultPageNumberPagination<AddonResponse>, {
      query,
      ...options,
    });
  }

  /**
   * @example
   * ```ts
   * const addonResponse = await client.addons.create({
   *   currency: 'AED',
   *   name: 'name',
   *   price: 0,
   *   tax_category: 'digital_products',
   * });
   * ```
   */
  create(body: AddonCreateParams, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.post('/addons', { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const addonResponse = await client.addons.retrieve(
   *   'adn_NX1zdqW4Hbivsqz8vI9dc',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.get(path`/addons/${id}`, options);
  }

  /**
   * @example
   * ```ts
   * const addonResponse = await client.addons.update(
   *   'adn_NX1zdqW4Hbivsqz8vI9dc',
   * );
   * ```
   */
  update(id: string, body: AddonUpdateParams, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.patch(path`/addons/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const response = await client.addons.updateImages(
   *   'adn_NX1zdqW4Hbivsqz8vI9dc',
   * );
   * ```
   */
  updateImages(id: string, options?: RequestOptions): APIPromise<AddonUpdateImagesResponse> {
    return this._client.put(path`/addons/${id}/images`, options);
  }
}

export type AddonResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<AddonResponse>;

export interface AddonResponse {
  /**
   * id of the Addon
   */
  id: string;

  /**
   * Unique identifier for the business to which the addon belongs.
   */
  business_id: string;

  /**
   * Created time
   */
  created_at: string;

  /**
   * Currency of the Addon
   */
  currency: MiscAPI.Currency;

  /**
   * Name of the Addon
   */
  name: string;

  /**
   * Amount of the addon
   */
  price: number;

  /**
   * Tax category applied to this Addon
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Updated time
   */
  updated_at: string;

  /**
   * Optional description of the Addon
   */
  description?: string | null;

  /**
   * Image of the Addon
   */
  image?: string | null;
}

export interface AddonUpdateImagesResponse {
  image_id: string;

  url: string;
}

export interface AddonListParams extends DefaultPageNumberPaginationParams {}

export interface AddonCreateParams {
  /**
   * The currency of the Addon
   */
  currency: MiscAPI.Currency;

  /**
   * Name of the Addon
   */
  name: string;

  /**
   * Amount of the addon
   */
  price: number;

  /**
   * Tax category applied to this Addon
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Optional description of the Addon
   */
  description?: string | null;
}

export interface AddonUpdateParams {
  /**
   * The currency of the Addon
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Description of the Addon, optional and must be at most 1000 characters.
   */
  description?: string | null;

  /**
   * Addon image id after its uploaded to S3
   */
  image_id?: string | null;

  /**
   * Name of the Addon, optional and must be at most 100 characters.
   */
  name?: string | null;

  /**
   * Amount of the addon
   */
  price?: number | null;

  /**
   * Tax category of the Addon.
   */
  tax_category?: MiscAPI.TaxCategory | null;
}

export declare namespace Addons {
  export {
    type AddonResponse as AddonResponse,
    type AddonUpdateImagesResponse as AddonUpdateImagesResponse,
    type AddonResponsesDefaultPageNumberPagination as AddonResponsesDefaultPageNumberPagination,
    type AddonListParams as AddonListParams,
    type AddonCreateParams as AddonCreateParams,
    type AddonUpdateParams as AddonUpdateParams,
  };
}
