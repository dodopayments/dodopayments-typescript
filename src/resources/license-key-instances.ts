// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class LicenseKeyInstances extends APIResource {
  /**
   * @example
   * ```ts
   * const licenseKeyInstance =
   *   await client.licenseKeyInstances.retrieve('lki_123');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<LicenseKeyInstance> {
    return this._client.get(path`/license_key_instances/${id}`, options);
  }

  /**
   * @example
   * ```ts
   * const licenseKeyInstance =
   *   await client.licenseKeyInstances.update('lki_123', {
   *     name: 'name',
   *   });
   * ```
   */
  update(
    id: string,
    body: LicenseKeyInstanceUpdateParams,
    options?: RequestOptions,
  ): APIPromise<LicenseKeyInstance> {
    return this._client.patch(path`/license_key_instances/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const licenseKeyInstance of client.licenseKeyInstances.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: LicenseKeyInstanceListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<LicenseKeyInstancesDefaultPageNumberPagination, LicenseKeyInstance> {
    return this._client.getAPIList(
      '/license_key_instances',
      DefaultPageNumberPagination<LicenseKeyInstance>,
      { query, ...options },
    );
  }
}

export type LicenseKeyInstancesDefaultPageNumberPagination = DefaultPageNumberPagination<LicenseKeyInstance>;

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

export declare namespace LicenseKeyInstances {
  export {
    type LicenseKeyInstance as LicenseKeyInstance,
    type LicenseKeyInstancesDefaultPageNumberPagination as LicenseKeyInstancesDefaultPageNumberPagination,
    type LicenseKeyInstanceUpdateParams as LicenseKeyInstanceUpdateParams,
    type LicenseKeyInstanceListParams as LicenseKeyInstanceListParams,
  };
}
