// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GroupsAPI from './groups/groups';
import {
  GroupCreateParams,
  GroupDeleteParams,
  GroupProduct,
  GroupUpdateParams,
  Groups,
  ProductCollectionGroupDetails,
  ProductCollectionGroupResponse,
} from './groups/groups';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class ProductCollections extends APIResource {
  groups: GroupsAPI.Groups = new GroupsAPI.Groups(this._client);

  create(body: ProductCollectionCreateParams, options?: RequestOptions): APIPromise<ProductCollection> {
    return this._client.post('/product-collections', { body, ...options });
  }

  retrieve(id: string, options?: RequestOptions): APIPromise<ProductCollection> {
    return this._client.get(path`/product-collections/${id}`, options);
  }

  update(id: string, body: ProductCollectionUpdateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.patch(path`/product-collections/${id}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  list(
    query: ProductCollectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ProductCollectionListResponsesDefaultPageNumberPagination, ProductCollectionListResponse> {
    return this._client.getAPIList(
      '/product-collections',
      DefaultPageNumberPagination<ProductCollectionListResponse>,
      { query, ...options },
    );
  }

  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/product-collections/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  unarchive(id: string, options?: RequestOptions): APIPromise<ProductCollectionUnarchiveResponse> {
    return this._client.post(path`/product-collections/${id}/unarchive`, options);
  }

  updateImages(
    id: string,
    params: ProductCollectionUpdateImagesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductCollectionUpdateImagesResponse> {
    const { force_update } = params ?? {};
    return this._client.put(path`/product-collections/${id}/images`, { query: { force_update }, ...options });
  }
}

export type ProductCollectionListResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<ProductCollectionListResponse>;

export interface ProductCollection {
  /**
   * Unique identifier for the product collection
   */
  id: string;

  /**
   * Brand ID for the collection
   */
  brand_id: string;

  /**
   * Timestamp when the collection was created
   */
  created_at: string;

  /**
   * Groups in this collection
   */
  groups: Array<GroupsAPI.ProductCollectionGroupResponse>;

  /**
   * Name of the collection
   */
  name: string;

  /**
   * Timestamp when the collection was last updated
   */
  updated_at: string;

  /**
   * Description of the collection
   */
  description?: string | null;

  /**
   * URL of the collection image
   */
  image?: string | null;
}

export interface ProductCollectionListResponse {
  /**
   * Collection ID
   */
  id: string;

  /**
   * Timestamp when created
   */
  created_at: string;

  /**
   * Collection name
   */
  name: string;

  /**
   * Number of products in the collection
   */
  products_count: number;

  /**
   * Timestamp when last updated
   */
  updated_at: string;

  /**
   * Collection description
   */
  description?: string | null;

  /**
   * Collection image URL
   */
  image?: string | null;
}

export interface ProductCollectionUnarchiveResponse {
  /**
   * Collection ID that was unarchived
   */
  collection_id: string;

  /**
   * Product IDs that were excluded because they are archived
   */
  excluded_product_ids: Array<string>;

  /**
   * Success message
   */
  message: string;
}

export interface ProductCollectionUpdateImagesResponse {
  /**
   * Presigned S3 URL for uploading the image
   */
  url: string;

  /**
   * Optional image ID (present when force_update is true)
   */
  image_id?: string | null;
}

export interface ProductCollectionCreateParams {
  /**
   * Groups of products in this collection
   */
  groups: Array<GroupsAPI.ProductCollectionGroupDetails>;

  /**
   * Name of the product collection
   */
  name: string;

  /**
   * Brand id for the collection, if not provided will default to primary brand
   */
  brand_id?: string | null;

  /**
   * Optional description of the product collection
   */
  description?: string | null;
}

export interface ProductCollectionUpdateParams {
  /**
   * Optional brand_id update
   */
  brand_id?: string | null;

  /**
   * Optional description update - pass null to remove, omit to keep unchanged
   */
  description?: string | null;

  /**
   * Optional new order for groups (array of group UUIDs in desired order)
   */
  group_order?: Array<string> | null;

  /**
   * Optional image update - pass null to remove, omit to keep unchanged
   */
  image_id?: string | null;

  /**
   * Optional new name for the collection
   */
  name?: string | null;
}

export interface ProductCollectionListParams extends DefaultPageNumberPaginationParams {
  /**
   * List archived collections
   */
  archived?: boolean;

  /**
   * Filter by Brand id
   */
  brand_id?: string;
}

export interface ProductCollectionUpdateImagesParams {
  /**
   * If true, generates a new image ID to force cache invalidation
   */
  force_update?: boolean | null;
}

ProductCollections.Groups = Groups;

export declare namespace ProductCollections {
  export {
    type ProductCollection as ProductCollection,
    type ProductCollectionListResponse as ProductCollectionListResponse,
    type ProductCollectionUnarchiveResponse as ProductCollectionUnarchiveResponse,
    type ProductCollectionUpdateImagesResponse as ProductCollectionUpdateImagesResponse,
    type ProductCollectionListResponsesDefaultPageNumberPagination as ProductCollectionListResponsesDefaultPageNumberPagination,
    type ProductCollectionCreateParams as ProductCollectionCreateParams,
    type ProductCollectionUpdateParams as ProductCollectionUpdateParams,
    type ProductCollectionListParams as ProductCollectionListParams,
    type ProductCollectionUpdateImagesParams as ProductCollectionUpdateImagesParams,
  };

  export {
    Groups as Groups,
    type GroupProduct as GroupProduct,
    type ProductCollectionGroupDetails as ProductCollectionGroupDetails,
    type ProductCollectionGroupResponse as ProductCollectionGroupResponse,
    type GroupCreateParams as GroupCreateParams,
    type GroupUpdateParams as GroupUpdateParams,
    type GroupDeleteParams as GroupDeleteParams,
  };
}
