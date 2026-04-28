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
  create(body: AddonCreateParams, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.post('/addons', { body, ...options });
  }

  retrieve(id: string, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.get(path`/addons/${id}`, options);
  }

  update(id: string, body: AddonUpdateParams, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.patch(path`/addons/${id}`, { body, ...options });
  }

  list(
    query: AddonListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AddonResponsesDefaultPageNumberPagination, AddonResponse> {
    return this._client.getAPIList('/addons', DefaultPageNumberPagination<AddonResponse>, {
      query,
      ...options,
    });
  }

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

export interface AddonListParams extends DefaultPageNumberPaginationParams {}

export declare namespace Addons {
  export {
    type AddonResponse as AddonResponse,
    type AddonUpdateImagesResponse as AddonUpdateImagesResponse,
    type AddonResponsesDefaultPageNumberPagination as AddonResponsesDefaultPageNumberPagination,
    type AddonCreateParams as AddonCreateParams,
    type AddonUpdateParams as AddonUpdateParams,
    type AddonListParams as AddonListParams,
  };
}
