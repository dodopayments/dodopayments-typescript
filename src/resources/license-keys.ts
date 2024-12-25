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
  id: string;

  business_id: string;

  created_at: string;

  customer_id: string;

  instances_count: number;

  key: string;

  payment_id: string;

  product_id: string;

  status: 'active' | 'expired' | 'disabled';

  activations_limit?: number | null;

  expires_at?: string | null;

  subscription_id?: string | null;
}

export type LicenseKeyListResponse = Array<LicenseKeyListResponse.LicenseKeyListResponseItem>;

export namespace LicenseKeyListResponse {
  export interface LicenseKeyListResponseItem {
    items: Array<LicenseKeysAPI.LicenseKey>;
  }
}

export interface LicenseKeyUpdateParams {
  activations_limit?: number | null;

  disabled?: boolean | null;

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
