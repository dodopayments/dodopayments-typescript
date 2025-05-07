// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as LicenseKeyInstancesAPI from './license-key-instances';

export class Licenses extends APIResource {
  /**
   * @example
   * ```ts
   * const licenseKeyInstance = await client.licenses.activate({
   *   license_key: 'license_key',
   *   name: 'name',
   * });
   * ```
   */
  activate(
    body: LicenseActivateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<LicenseKeyInstancesAPI.LicenseKeyInstance> {
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
    type LicenseValidateResponse as LicenseValidateResponse,
    type LicenseActivateParams as LicenseActivateParams,
    type LicenseDeactivateParams as LicenseDeactivateParams,
    type LicenseValidateParams as LicenseValidateParams,
  };
}
