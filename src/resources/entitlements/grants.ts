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
   * Revoke a single grant. Idempotent: re-revoking an already-revoked grant returns
   * the grant in its current state.
   */
  revoke(grantID: string, params: GrantRevokeParams, options?: RequestOptions): APIPromise<EntitlementGrant> {
    const { id } = params;
    return this._client.delete(path`/entitlements/${id}/grants/${grantID}`, options);
  }
}

export type EntitlementGrantsDefaultPageNumberPagination = DefaultPageNumberPagination<EntitlementGrant>;

/**
 * Detailed view of a single entitlement grant: who it's for, its lifecycle state,
 * and any integration-specific delivery payload.
 */
export interface EntitlementGrant {
  /**
   * Unique identifier of the grant.
   */
  id: string;

  /**
   * Identifier of the business that owns the grant.
   */
  business_id: string;

  /**
   * Timestamp when the grant was created.
   */
  created_at: string;

  /**
   * Identifier of the customer the grant was issued to.
   */
  customer_id: string;

  /**
   * Identifier of the entitlement this grant was issued from.
   */
  entitlement_id: string;

  /**
   * Arbitrary key-value metadata recorded on the grant.
   */
  metadata: { [key: string]: string };

  /**
   * Lifecycle status of the grant.
   */
  status: 'Pending' | 'Delivered' | 'Failed' | 'Revoked';

  /**
   * Timestamp when the grant was last modified.
   */
  updated_at: string;

  /**
   * Timestamp when the grant transitioned to `delivered`, when applicable.
   */
  delivered_at?: string | null;

  /**
   * Digital-product-delivery payload, present when the entitlement integration is
   * `digital_files`.
   */
  digital_product_delivery?: ProductsAPI.DigitalProductDelivery | null;

  /**
   * Machine-readable code reported when delivery failed, when applicable.
   */
  error_code?: string | null;

  /**
   * Human-readable message reported when delivery failed, when applicable.
   */
  error_message?: string | null;

  /**
   * License-key delivery payload, present when the entitlement integration is
   * `license_key`.
   */
  license_key?: LicenseKeyGrant | null;

  /**
   * Timestamp when `oauth_url` stops being valid, when applicable.
   */
  oauth_expires_at?: string | null;

  /**
   * Customer-facing OAuth URL for OAuth-style integrations. Populated during the
   * customer-portal accept flow; `null` until the customer completes that step, and
   * on grants for non-OAuth integrations.
   */
  oauth_url?: string | null;

  /**
   * Identifier of the payment that triggered this grant, when applicable.
   */
  payment_id?: string | null;

  /**
   * Reason recorded when the grant was revoked, when applicable.
   */
  revocation_reason?: string | null;

  /**
   * Timestamp when the grant transitioned to `revoked`, when applicable.
   */
  revoked_at?: string | null;

  /**
   * Identifier of the subscription that triggered this grant, when applicable.
   */
  subscription_id?: string | null;
}

/**
 * License-key delivery payload, present on grants for `license_key` entitlements.
 * The grant's top-level `status` is the source of truth for the grant's lifecycle.
 */
export interface LicenseKeyGrant {
  /**
   * Number of activations consumed so far.
   */
  activations_used: number;

  /**
   * Issued license key.
   */
  key: string;

  /**
   * Maximum activations allowed by the entitlement, when set.
   */
  activations_limit?: number | null;

  /**
   * When the license key expires, when applicable.
   */
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
