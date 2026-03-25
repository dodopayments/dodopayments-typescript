// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as MiscAPI from '../../misc';
import * as ProductsAPI from '../../products/products';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Items extends APIResource {
  create(
    groupID: string,
    params: ItemCreateParams,
    options?: RequestOptions,
  ): APIPromise<ItemCreateResponse> {
    const { id, ...body } = params;
    return this._client.post(path`/product-collections/${id}/groups/${groupID}/items`, { body, ...options });
  }

  update(itemID: string, params: ItemUpdateParams, options?: RequestOptions): APIPromise<void> {
    const { id, group_id, ...body } = params;
    return this._client.patch(path`/product-collections/${id}/groups/${group_id}/items/${itemID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  delete(itemID: string, params: ItemDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { id, group_id } = params;
    return this._client.delete(path`/product-collections/${id}/groups/${group_id}/items/${itemID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type ItemCreateResponse = Array<ItemCreateResponse.ItemCreateResponseItem>;

export namespace ItemCreateResponse {
  export interface ItemCreateResponseItem {
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

export interface ItemCreateParams {
  /**
   * Path param: Product Collection Id
   */
  id: string;

  /**
   * Body param: Products to add to the group
   */
  products: Array<ItemCreateParams.Product>;
}

export namespace ItemCreateParams {
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

export interface ItemUpdateParams {
  /**
   * Path param: Product Collection Id
   */
  id: string;

  /**
   * Path param: Product Collection Group Id
   */
  group_id: string;

  /**
   * Body param: Status of the product in the group
   */
  status: boolean;
}

export interface ItemDeleteParams {
  /**
   * Product Collection Id
   */
  id: string;

  /**
   * Product Collection Group Id
   */
  group_id: string;
}

export declare namespace Items {
  export {
    type ItemCreateResponse as ItemCreateResponse,
    type ItemCreateParams as ItemCreateParams,
    type ItemUpdateParams as ItemUpdateParams,
    type ItemDeleteParams as ItemDeleteParams,
  };
}
