// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Brands extends APIResource {
  create(body: BrandCreateParams, options?: RequestOptions): APIPromise<Brand> {
    return this._client.post('/brands', { body, ...options });
  }

  /**
   * Thin handler just calls `get_brand` and wraps in `Json(...)`
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Brand> {
    return this._client.get(path`/brands/${id}`, options);
  }

  update(id: string, body: BrandUpdateParams, options?: RequestOptions): APIPromise<Brand> {
    return this._client.patch(path`/brands/${id}`, { body, ...options });
  }

  list(options?: RequestOptions): APIPromise<BrandListResponse> {
    return this._client.get('/brands', options);
  }

  updateImages(id: string, options?: RequestOptions): APIPromise<BrandUpdateImagesResponse> {
    return this._client.put(path`/brands/${id}/images`, options);
  }
}

export interface Brand {
  brand_id: string;

  business_id: string;

  enabled: boolean;

  statement_descriptor: string;

  verification_enabled: boolean;

  verification_status: 'Success' | 'Fail' | 'Review' | 'Hold';

  description?: string | null;

  image?: string | null;

  name?: string | null;

  /**
   * Incase the brand verification fails or is put on hold
   */
  reason_for_hold?: string | null;

  support_email?: string | null;

  url?: string | null;
}

export interface BrandListResponse {
  /**
   * List of brands for this business
   */
  items: Array<Brand>;
}

export interface BrandUpdateImagesResponse {
  /**
   * UUID that will be used as the image identifier/key suffix
   */
  image_id: string;

  /**
   * Presigned URL to upload the image
   */
  url: string;
}

export interface BrandCreateParams {
  description?: string | null;

  name?: string | null;

  statement_descriptor?: string | null;

  support_email?: string | null;

  url?: string | null;
}

export interface BrandUpdateParams {
  /**
   * The UUID you got back from the presigned‐upload call
   */
  image_id?: string | null;

  name?: string | null;

  statement_descriptor?: string | null;

  support_email?: string | null;
}

export declare namespace Brands {
  export {
    type Brand as Brand,
    type BrandListResponse as BrandListResponse,
    type BrandUpdateImagesResponse as BrandUpdateImagesResponse,
    type BrandCreateParams as BrandCreateParams,
    type BrandUpdateParams as BrandUpdateParams,
  };
}
