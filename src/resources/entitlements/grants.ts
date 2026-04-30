// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ProductsAPI from '../products/products';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Grants extends APIResource {
  /**
   * GET /entitlements/{id}/grants (public API)
   */
  list(
    id: string,
    query: GrantListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EntitlementGrantsDefaultPageNumberPagination, EntitlementGrant> {
    return this._client.getAPIList(
      path`/entitlements/${id}/grants`,
      DefaultPageNumberPagination<EntitlementGrant>,
      { query, ...options },
    );
  }

  /**
   * Revokes a single entitlement grant for the caller's business. For LicenseKey
   * integrations, also disables the backing license key. Idempotent: re-revoking an
   * already-revoked grant returns 200 with current state. The revocation reason is
   * always set to "manual" for API-initiated revocations.
   */
  revoke(grantID: string, params: GrantRevokeParams, options?: RequestOptions): APIPromise<EntitlementGrant> {
    const { id } = params;
    return this._client.delete(path`/entitlements/${id}/grants/${grantID}`, options);
  }
}

export type EntitlementGrantsDefaultPageNumberPagination = DefaultPageNumberPagination<EntitlementGrant>;

export interface EntitlementGrant {
  id: string;

  business_id: string;

  created_at: string;

  customer_id: string;

  entitlement_id: string;

  external_id: string;

  status: 'Pending' | 'Delivered' | 'Failed' | 'Revoked';

  updated_at: string;

  delivered_at?: string | null;

  /**
   * Present only when the entitlement integration_type is `digital_files`. Populated
   * eagerly on every list and single-record endpoint.
   */
  digital_product_delivery?: ProductsAPI.DigitalProductDelivery | null;

  error_code?: string | null;

  error_message?: string | null;

  /**
   * Present only when the entitlement integration_type is `license_key`.
   */
  license_key?: LicenseKeyGrant | null;

  metadata?: unknown;

  oauth_expires_at?: string | null;

  oauth_url?: string | null;

  payment_id?: string | null;

  revocation_reason?: string | null;

  revoked_at?: string | null;

  subscription_id?: string | null;
}

/**
 * Nested representation of license-key grant fields. Present only when the grant's
 * entitlement has `integration_type = 'license_key'` and a row exists in
 * `license_keys`. The grant's top-level `status` is the source of truth for the
 * grant's lifecycle — no per-license-key status is exposed here.
 */
export interface LicenseKeyGrant {
  activations_used: number;

  key: string;

  activations_limit?: number | null;

  expires_at?: string | null;
}

export interface GrantListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by customer ID
   */
  customer_id?: string;

  /**
   * Filter by grant status
   */
  status?: 'Pending' | 'Delivered' | 'Failed' | 'Revoked';
}

export interface GrantRevokeParams {
  /**
   * Entitlement ID
   */
  id: string;
}

export declare namespace Grants {
  export {
    type EntitlementGrant as EntitlementGrant,
    type LicenseKeyGrant as LicenseKeyGrant,
    type EntitlementGrantsDefaultPageNumberPagination as EntitlementGrantsDefaultPageNumberPagination,
    type GrantListParams as GrantListParams,
    type GrantRevokeParams as GrantRevokeParams,
  };
}
