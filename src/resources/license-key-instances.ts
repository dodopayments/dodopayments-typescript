// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

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
  ): Core.PagePromise<LicenseKeyInstancesDefaultPageNumberPagination, LicenseKeyInstance>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<LicenseKeyInstancesDefaultPageNumberPagination, LicenseKeyInstance>;
  list(
    query: LicenseKeyInstanceListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<LicenseKeyInstancesDefaultPageNumberPagination, LicenseKeyInstance> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/license_key_instances', LicenseKeyInstancesDefaultPageNumberPagination, {
      query,
      ...options,
    });
  }
}

export class LicenseKeyInstancesDefaultPageNumberPagination extends DefaultPageNumberPagination<LicenseKeyInstance> {}

export interface LicenseKeyInstance {
  id: string;

  business_id: string;

  created_at: string;

  license_key_id: string;

  name: string;
}

export interface LicenseKeyInstanceUpdateParams {
  name: string;
}

export interface LicenseKeyInstanceListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by license key ID
   */
  license_key_id?: string | null;
}

LicenseKeyInstances.LicenseKeyInstancesDefaultPageNumberPagination =
  LicenseKeyInstancesDefaultPageNumberPagination;

export declare namespace LicenseKeyInstances {
  export {
    type LicenseKeyInstance as LicenseKeyInstance,
    LicenseKeyInstancesDefaultPageNumberPagination as LicenseKeyInstancesDefaultPageNumberPagination,
    type LicenseKeyInstanceUpdateParams as LicenseKeyInstanceUpdateParams,
    type LicenseKeyInstanceListParams as LicenseKeyInstanceListParams,
  };
}
