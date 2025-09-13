// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as PaymentsAPI from './payments';

export class Licenses extends APIResource {
  /**
   * @example
   * ```ts
   * const response = await client.licenses.activate({
   *   license_key: 'license_key',
   *   name: 'name',
   * });
   * ```
   */
  activate(
    body: LicenseActivateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseActivateResponse> {
    return this._client.post('/licenses/activate', { body, ...options });
  }

  /**
   * @example
   * ```ts
   * await client.licenses.deactivate({
   *   license_key: 'license_key',
   *   license_key_instance_id: 'license_key_instance_id',
   * });
   * ```
   */
  deactivate(body: LicenseDeactivateParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/licenses/deactivate', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * @example
   * ```ts
   * const response = await client.licenses.validate({
   *   license_key: '2b1f8e2d-c41e-4e8f-b2d3-d9fd61c38f43',
   * });
   * ```
   */
  validate(
    body: LicenseValidateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseValidateResponse> {
    return this._client.post('/licenses/validate', { body, ...options });
  }
}

export interface LicenseActivateResponse {
  /**
   * License key instance ID
   */
  id: string;

  /**
   * Business ID
   */
  business_id: string;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * Limited customer details associated with the license key.
   */
  customer: PaymentsAPI.CustomerLimitedDetails;

  /**
   * Associated license key ID
   */
  license_key_id: string;

  /**
   * Instance name
   */
  name: string;

  /**
   * Related product info. Present if the license key is tied to a product.
   */
  product: LicenseActivateResponse.Product;
}

export namespace LicenseActivateResponse {
  /**
   * Related product info. Present if the license key is tied to a product.
   */
  export interface Product {
    /**
     * Unique identifier for the product.
     */
    product_id: string;

    /**
     * Name of the product, if set by the merchant.
     */
    name?: string | null;
  }
}

export interface LicenseValidateResponse {
  valid: boolean;
}

export interface LicenseActivateParams {
  license_key: string;

  name: string;
}

export interface LicenseDeactivateParams {
  license_key: string;

  license_key_instance_id: string;
}

export interface LicenseValidateParams {
  license_key: string;

  license_key_instance_id?: string | null;
}

export declare namespace Licenses {
  export {
    type LicenseActivateResponse as LicenseActivateResponse,
    type LicenseValidateResponse as LicenseValidateResponse,
    type LicenseActivateParams as LicenseActivateParams,
    type LicenseDeactivateParams as LicenseDeactivateParams,
    type LicenseValidateParams as LicenseValidateParams,
  };
}
