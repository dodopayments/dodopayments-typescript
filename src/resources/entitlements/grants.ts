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
  ): PagePromise<GrantListResponsesDefaultPageNumberPagination, GrantListResponse> {
    return this._client.getAPIList(
      path`/entitlements/${id}/grants`,
      DefaultPageNumberPagination<GrantListResponse>,
      { query, ...options },
    );
  }

  /**
   * Revokes a single entitlement grant for the caller's business. For LicenseKey
   * integrations, also disables the backing license key. Idempotent: re-revoking an
   * already-revoked grant returns 200 with current state. The revocation reason is
   * always set to "manual" for API-initiated revocations.
   */
  revoke(
    grantID: string,
    params: GrantRevokeParams,
    options?: RequestOptions,
  ): APIPromise<GrantRevokeResponse> {
    const { id } = params;
    return this._client.delete(path`/entitlements/${id}/grants/${grantID}`, options);
  }
}

export type GrantListResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<GrantListResponse>;

export interface GrantListResponse {
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
  license_key?: GrantListResponse.LicenseKey | null;

  metadata?: unknown;

  oauth_expires_at?: string | null;

  oauth_url?: string | null;

  payment_id?: string | null;

  revocation_reason?: string | null;

  revoked_at?: string | null;

  subscription_id?: string | null;
}

export namespace GrantListResponse {
  /**
   * Present only when the entitlement integration_type is `license_key`.
   */
  export interface LicenseKey {
    activations_used: number;

    key: string;

    activations_limit?: number | null;

    expires_at?: string | null;
  }
}

export interface GrantRevokeResponse {
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
  license_key?: GrantRevokeResponse.LicenseKey | null;

  metadata?: unknown;

  oauth_expires_at?: string | null;

  oauth_url?: string | null;

  payment_id?: string | null;

  revocation_reason?: string | null;

  revoked_at?: string | null;

  subscription_id?: string | null;
}

export namespace GrantRevokeResponse {
  /**
   * Present only when the entitlement integration_type is `license_key`.
   */
  export interface LicenseKey {
    activations_used: number;

    key: string;

    activations_limit?: number | null;

    expires_at?: string | null;
  }
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
    type GrantListResponse as GrantListResponse,
    type GrantRevokeResponse as GrantRevokeResponse,
    type GrantListResponsesDefaultPageNumberPagination as GrantListResponsesDefaultPageNumberPagination,
    type GrantListParams as GrantListParams,
    type GrantRevokeParams as GrantRevokeParams,
  };
}
