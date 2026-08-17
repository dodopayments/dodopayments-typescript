// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Brands extends APIResource {
  /**
   * @example
   * ```ts
   * const brands = await client.brands.list();
   * ```
   */
  list(
    query: BrandListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrandListResponse> {
    return this._client.get('/brands', { query, ...options });
  }

  /**
   * @example
   * ```ts
   * const brand = await client.brands.create();
   * ```
   */
  create(body: BrandCreateParams, options?: RequestOptions): APIPromise<Brand> {
    return this._client.post('/brands', { body, ...options });
  }

  /**
   * Thin handler just calls `get_brand` and wraps in `Json(...)`
   *
   * @example
   * ```ts
   * const brand = await client.brands.retrieve(
   *   'brnd_8dFiAW42v28JzhlVSocjq',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Brand> {
    return this._client.get(path`/brands/${id}`, options);
  }

  /**
   * @example
   * ```ts
   * const brand = await client.brands.update(
   *   'brnd_8dFiAW42v28JzhlVSocjq',
   * );
   * ```
   */
  update(id: string, body: BrandUpdateParams, options?: RequestOptions): APIPromise<Brand> {
    return this._client.patch(path`/brands/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const response = await client.brands.updateImages(
   *   'brnd_8dFiAW42v28JzhlVSocjq',
   * );
   * ```
   */
  updateImages(id: string, options?: RequestOptions): APIPromise<BrandUpdateImagesResponse> {
    return this._client.put(path`/brands/${id}/images`, options);
  }

  /**
   * Archive a brand. Its products, live subscriptions, and product collections move
   * to the `move_products_to` brand. Archive is permanent.
   *
   * @example
   * ```ts
   * const response = await client.brands.archive(
   *   'brnd_8dFiAW42v28JzhlVSocjq',
   * );
   * ```
   */
  archive(id: string, body: BrandArchiveParams, options?: RequestOptions): APIPromise<BrandArchiveResponse> {
    return this._client.post(path`/brands/${id}/archive`, { body, ...options });
  }
}

export interface Brand {
  brand_id: string;

  business_id: string;

  enabled: boolean;

  statement_descriptor: string;

  verification_enabled: boolean;

  verification_status: 'Success' | 'Fail' | 'Review' | 'Hold';

  /**
   * Time the brand was archived. Null for an active brand.
   */
  archived_at?: string | null;

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

export interface BrandArchiveResponse {
  /**
   * Time the brand was archived.
   */
  archived_at: string;

  /**
   * The archived brand.
   */
  brand_id: string;

  /**
   * Count of product collections moved to the target brand.
   */
  collections_moved: number;

  /**
   * Count of products moved to the target brand.
   */
  products_moved: number;

  /**
   * Count of live subscriptions moved to the target brand.
   */
  subscriptions_moved: number;

  /**
   * Brand that received the moved records. Null when no target was given.
   */
  moved_to_brand_id?: string | null;
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

export interface BrandListParams {
  /**
   * Set to true to also list archived brands. Default false.
   */
  include_archived?: boolean;
}

export interface BrandCreateParams {
  description?: string | null;

  name?: string | null;

  statement_descriptor?: string | null;

  support_email?: string | null;

  url?: string | null;
}

export interface BrandUpdateParams {
  description?: string | null;

  /**
   * The UUID you got back from the presigned‐upload call
   */
  image_id?: string | null;

  name?: string | null;

  statement_descriptor?: string | null;

  support_email?: string | null;

  url?: string | null;
}

export interface BrandArchiveParams {
  /**
   * Brand that takes over the products and the live subscriptions of the brand you
   * archive. It must be a brand of the same business, and it must not be archived.
   * The primary brand (its brand id is the business id) is a valid target. Omit this
   * field only when the brand holds no products and no live subscriptions.
   */
  move_products_to?: string | null;
}

export declare namespace Brands {
  export {
    type Brand as Brand,
    type BrandListResponse as BrandListResponse,
    type BrandArchiveResponse as BrandArchiveResponse,
    type BrandUpdateImagesResponse as BrandUpdateImagesResponse,
    type BrandListParams as BrandListParams,
    type BrandCreateParams as BrandCreateParams,
    type BrandUpdateParams as BrandUpdateParams,
    type BrandArchiveParams as BrandArchiveParams,
  };
}
