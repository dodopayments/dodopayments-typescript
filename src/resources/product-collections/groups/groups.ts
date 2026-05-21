// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ItemsAPI from './items';
import {
  ItemCreateParams,
  ItemCreateResponse,
  ItemDeleteParams,
  ItemUpdateParams,
  Items,
  ProductCollectionProduct,
} from './items';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Groups extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  create(
    id: string,
    body: GroupCreateParams,
    options?: RequestOptions,
  ): APIPromise<ProductCollectionGroupResponse> {
    return this._client.post(path`/product-collections/${id}/groups`, { body, ...options });
  }

  update(groupID: string, params: GroupUpdateParams, options?: RequestOptions): APIPromise<void> {
    const { id, ...body } = params;
    return this._client.patch(path`/product-collections/${id}/groups/${groupID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  delete(groupID: string, params: GroupDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/product-collections/${id}/groups/${groupID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface GroupProduct {
  /**
   * Product ID to include in the group
   */
  product_id: string;

  /**
   * Status of the product in this group (defaults to true if not provided)
   */
  status?: boolean | null;
}

export interface ProductCollectionGroupDetails {
  /**
   * Products in this group
   */
  products: Array<GroupProduct>;

  /**
   * Optional group name. Multiple groups can have null names, but named groups must
   * be unique per collection
   */
  group_name?: string | null;

  /**
   * Status of the group (defaults to true if not provided)
   */
  status?: boolean | null;
}

export interface ProductCollectionGroupResponse {
  group_id: string;

  products: Array<ItemsAPI.ProductCollectionProduct>;

  status: boolean;

  group_name?: string | null;
}

export interface GroupCreateParams {
  /**
   * Products in this group
   */
  products: Array<GroupProduct>;

  /**
   * Optional group name. Multiple groups can have null names, but named groups must
   * be unique per collection
   */
  group_name?: string | null;

  /**
   * Status of the group (defaults to true if not provided)
   */
  status?: boolean | null;
}

export interface GroupUpdateParams {
  /**
   * Path param: Product Collection Id
   */
  id: string;

  /**
   * Body param: Optional group name update: Some(Some(name)) = set name, Some(None)
   * = clear name, None = no change
   */
  group_name?: string | null;

  /**
   * Body param: Optional new order for products in this group (array of
   * product_collection_group_pdts UUIDs)
   */
  product_order?: Array<string> | null;

  /**
   * Body param: Optional status update
   */
  status?: boolean | null;
}

export interface GroupDeleteParams {
  /**
   * Product Collection Id
   */
  id: string;
}

Groups.Items = Items;

export declare namespace Groups {
  export {
    type GroupProduct as GroupProduct,
    type ProductCollectionGroupDetails as ProductCollectionGroupDetails,
    type ProductCollectionGroupResponse as ProductCollectionGroupResponse,
    type GroupCreateParams as GroupCreateParams,
    type GroupUpdateParams as GroupUpdateParams,
    type GroupDeleteParams as GroupDeleteParams,
  };

  export {
    Items as Items,
    type ProductCollectionProduct as ProductCollectionProduct,
    type ItemCreateResponse as ItemCreateResponse,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
  };
}
