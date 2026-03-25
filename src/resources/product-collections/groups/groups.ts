// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as MiscAPI from '../../misc';
import * as ProductsAPI from '../../products/products';
import * as ItemsAPI from './items';
import { ItemCreateParams, ItemCreateResponse, ItemDeleteParams, ItemUpdateParams, Items } from './items';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Groups extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  create(id: string, body: GroupCreateParams, options?: RequestOptions): APIPromise<GroupCreateResponse> {
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

export interface GroupCreateResponse {
  group_id: string;

  products: Array<GroupCreateResponse.Product>;

  status: boolean;

  group_name?: string | null;
}

export namespace GroupCreateResponse {
  export interface Product {
    id: string;

    addons_count: number;

    files_count: number;

    /**
     * Whether this product has any credit entitlements attached
     */
    has_credit_entitlements: boolean;

    is_recurring: boolean;

    license_key_enabled: boolean;

    meters_count: number;

    product_id: string;

    status: boolean;

    currency?: MiscAPI.Currency | null;

    description?: string | null;

    name?: string | null;

    price?: number | null;

    /**
     * One-time price details.
     */
    price_detail?: ProductsAPI.Price | null;

    /**
     * Represents the different categories of taxation applicable to various products
     * and services.
     */
    tax_category?: MiscAPI.TaxCategory | null;

    tax_inclusive?: boolean | null;
  }
}

export interface GroupCreateParams {
  /**
   * Products in this group
   */
  products: Array<GroupCreateParams.Product>;

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

export namespace GroupCreateParams {
  export interface Product {
    /**
     * Product ID to include in the group
     */
    product_id: string;

    /**
     * Status of the product in this group (defaults to true if not provided)
     */
    status?: boolean | null;
  }
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
    type GroupCreateResponse as GroupCreateResponse,
    type GroupCreateParams as GroupCreateParams,
    type GroupUpdateParams as GroupUpdateParams,
    type GroupDeleteParams as GroupDeleteParams,
  };

  export {
    Items as Items,
    type ItemCreateResponse as ItemCreateResponse,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
  };
}
