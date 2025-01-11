// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as LicenseKeysAPI from './license-keys';

export class LicenseKeys extends APIResource {
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<LicenseKey> {
    return this._client.get(`/license_keys/${id}`, options);
  }

  update(
    id: string,
    body: LicenseKeyUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseKey> {
    return this._client.patch(`/license_keys/${id}`, { body, ...options });
  }

  list(query?: LicenseKeyListParams, options?: Core.RequestOptions): Core.APIPromise<LicenseKeyListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<LicenseKeyListResponse>;
  list(
    query: LicenseKeyListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseKeyListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/license_keys', { query, ...options });
  }
}

export interface LicenseKey {
  /**
   * The unique identifier of the license key.
   */
  id: string;

  /**
   * The unique identifier of the business associated with the license key.
   */
  business_id: string;

  /**
   * The timestamp indicating when the license key was created, in UTC.
   */
  created_at: string;

  /**
   * The unique identifier of the customer associated with the license key.
   */
  customer_id: string;

  /**
   * The current number of instances activated for this license key.
   */
  instances_count: number;

  /**
   * The license key string.
   */
  key: string;

  /**
   * The unique identifier of the payment associated with the license key.
   */
  payment_id: string;

  /**
   * The unique identifier of the product associated with the license key.
   */
  product_id: string;

  status: 'active' | 'expired' | 'disabled';

  /**
   * The maximum number of activations allowed for this license key.
   */
  activations_limit?: number | null;

  /**
   * The timestamp indicating when the license key expires, in UTC.
   */
  expires_at?: string | null;

  /**
   * The unique identifier of the subscription associated with the license key, if
   * any.
   */
  subscription_id?: string | null;
}

export type LicenseKeyListResponse = Array<LicenseKeyListResponse.LicenseKeyListResponseItem>;

export namespace LicenseKeyListResponse {
  export interface LicenseKeyListResponseItem {
    items: Array<LicenseKeysAPI.LicenseKey>;
  }
}

export interface LicenseKeyUpdateParams {
  /**
   * The updated activation limit for the license key. Use `null` to remove the
   * limit, or omit this field to leave it unchanged.
   */
  activations_limit?: number | null;

  /**
   * Indicates whether the license key should be disabled. A value of `true` disables
   * the key, while `false` enables it. Omit this field to leave it unchanged.
   */
  disabled?: boolean | null;

  /**
   * The updated expiration timestamp for the license key in UTC. Use `null` to
   * remove the expiration date, or omit this field to leave it unchanged.
   */
  expires_at?: string | null;
}

export interface LicenseKeyListParams {
  /**
   * Filter by customer ID
   */
  customer_id?: string | null;

  /**
   * Page number default is 0
   */
  page_number?: number | null;

  /**
   * Page size default is 10 max is 100
   */
  page_size?: number | null;

  /**
   * Filter by product ID
   */
  product_id?: string | null;

  /**
   * Filter by license key status
   */
  status?: 'active' | 'expired' | 'disabled' | null;
}

export declare namespace LicenseKeys {
  export {
    type LicenseKey as LicenseKey,
    type LicenseKeyListResponse as LicenseKeyListResponse,
    type LicenseKeyUpdateParams as LicenseKeyUpdateParams,
    type LicenseKeyListParams as LicenseKeyListParams,
  };
}
