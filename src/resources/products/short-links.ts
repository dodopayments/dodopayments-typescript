// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ShortLinks extends APIResource {
  /**
   * Gives a Short Checkout URL with custom slug for a product. Uses a Static
   * Checkout URL under the hood.
   */
  create(
    id: string,
    body: ShortLinkCreateParams,
    options?: RequestOptions,
  ): APIPromise<ShortLinkCreateResponse> {
    return this._client.post(path`/products/${id}/short_links`, { body, ...options });
  }

  /**
   * Lists all short links created by the business.
   */
  list(
    query: ShortLinkListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ShortLinkListResponsesDefaultPageNumberPagination, ShortLinkListResponse> {
    return this._client.getAPIList(
      '/products/short_links',
      DefaultPageNumberPagination<ShortLinkListResponse>,
      { query, ...options },
    );
  }
}

export type ShortLinkListResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<ShortLinkListResponse>;

export interface ShortLinkCreateResponse {
  /**
   * Full URL.
   */
  full_url: string;

  /**
   * Short URL.
   */
  short_url: string;
}

export interface ShortLinkListResponse {
  /**
   * When the short url was created
   */
  created_at: string;

  /**
   * Full URL the short url redirects to
   */
  full_url: string;

  /**
   * Product ID associated with the short link
   */
  product_id: string;

  /**
   * Short URL
   */
  short_url: string;
}

export interface ShortLinkCreateParams {
  /**
   * Slug for the short link.
   */
  slug: string;

  /**
   * Static Checkout URL parameters to apply to the resulting short URL.
   */
  static_checkout_params?: { [key: string]: string } | null;
}

export interface ShortLinkListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by product ID
   */
  product_id?: string;
}

export declare namespace ShortLinks {
  export {
    type ShortLinkCreateResponse as ShortLinkCreateResponse,
    type ShortLinkListResponse as ShortLinkListResponse,
    type ShortLinkListResponsesDefaultPageNumberPagination as ShortLinkListResponsesDefaultPageNumberPagination,
    type ShortLinkCreateParams as ShortLinkCreateParams,
    type ShortLinkListParams as ShortLinkListParams,
  };
}
