// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as LicenseKeyInstancesAPI from './license-key-instances';

export class LicenseKeyInstances extends APIResource {
  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<LicenseKeyInstance> {
    return this._client.get(`/license_key_instances/${id}`, options);
  }

  update(
    id: string,
    body: LicenseKeyInstanceUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseKeyInstance> {
    return this._client.patch(`/license_key_instances/${id}`, { body, ...options });
  }

  list(
    query?: LicenseKeyInstanceListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseKeyInstanceListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<LicenseKeyInstanceListResponse>;
  list(
    query: LicenseKeyInstanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseKeyInstanceListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/license_key_instances', { query, ...options });
  }
}

export interface LicenseKeyInstance {
  id: string;

  business_id: string;

  created_at: string;

  license_key_id: string;

  name: string;
}

export type LicenseKeyInstanceListResponse =
  Array<LicenseKeyInstanceListResponse.LicenseKeyInstanceListResponseItem>;

export namespace LicenseKeyInstanceListResponse {
  export interface LicenseKeyInstanceListResponseItem {
    items: Array<LicenseKeyInstancesAPI.LicenseKeyInstance>;
  }
}

export interface LicenseKeyInstanceUpdateParams {
  name: string;
}

export interface LicenseKeyInstanceListParams {
  /**
   * Filter by license key ID
   */
  license_key_id?: string | null;

  /**
   * Page number default is 0
   */
  page_number?: number | null;

  /**
   * Page size default is 10 max is 100
   */
  page_size?: number | null;
}

export declare namespace LicenseKeyInstances {
  export {
    type LicenseKeyInstance as LicenseKeyInstance,
    type LicenseKeyInstanceListResponse as LicenseKeyInstanceListResponse,
    type LicenseKeyInstanceUpdateParams as LicenseKeyInstanceUpdateParams,
    type LicenseKeyInstanceListParams as LicenseKeyInstanceListParams,
  };
}
