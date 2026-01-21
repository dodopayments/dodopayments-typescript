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

export class LicenseKeys extends APIResource {
  /**
   * @example
   * ```ts
   * const licenseKey = await client.licenseKeys.retrieve(
   *   'lic_123',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<LicenseKey> {
    return this._client.get(path`/license_keys/${id}`, options);
  }

  /**
   * @example
   * ```ts
   * const licenseKey = await client.licenseKeys.update(
   *   'lic_123',
   * );
   * ```
   */
  update(id: string, body: LicenseKeyUpdateParams, options?: RequestOptions): APIPromise<LicenseKey> {
    return this._client.patch(path`/license_keys/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const licenseKey of client.licenseKeys.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: LicenseKeyListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<LicenseKeysDefaultPageNumberPagination, LicenseKey> {
    return this._client.getAPIList('/license_keys', DefaultPageNumberPagination<LicenseKey>, {
      query,
      ...options,
    });
  }
}

export type LicenseKeysDefaultPageNumberPagination = DefaultPageNumberPagination<LicenseKey>;

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

  /**
   * The current status of the license key (e.g., active, inactive, expired).
   */
  status: LicenseKeyStatus;

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

export type LicenseKeyStatus = 'active' | 'expired' | 'disabled';

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

export interface LicenseKeyListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter license keys created on or after this timestamp
   */
  created_at_gte?: string;

  /**
   * Filter license keys created on or before this timestamp
   */
  created_at_lte?: string;

  /**
   * Filter by customer ID
   */
  customer_id?: string;

  /**
   * Filter by product ID
   */
  product_id?: string;

  /**
   * Filter by license key status
   */
  status?: 'active' | 'expired' | 'disabled';
}

export declare namespace LicenseKeys {
  export {
    type LicenseKey as LicenseKey,
    type LicenseKeyStatus as LicenseKeyStatus,
    type LicenseKeysDefaultPageNumberPagination as LicenseKeysDefaultPageNumberPagination,
    type LicenseKeyUpdateParams as LicenseKeyUpdateParams,
    type LicenseKeyListParams as LicenseKeyListParams,
  };
}
