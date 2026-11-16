// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class AppInstallation extends APIResource {
  /**
   * The settings of the App Installation of the app token, with the secret values.
   * The token grant gives the installation. The token needs `app_settings:read`.
   */
  retrieveSettings(options?: RequestOptions): APIPromise<AppInstallationRetrieveSettingsResponse> {
    return this._client.get('/app-installation/settings', options);
  }
}

/**
 * The settings of the App Installation of the app token, with the secret values.
 */
export interface AppInstallationRetrieveSettingsResponse {
  /**
   * `true` when a required field has no value, or a stored value fails a live rule.
   */
  action_needed: boolean;

  app_id: string;

  installation_id: string;

  /**
   * The keys that need an action.
   */
  invalid_keys: Array<string>;

  /**
   * The values of the secret fields of the live manifest, by key.
   */
  secrets: unknown;

  /**
   * The values of the fields of the live manifest that are not secrets.
   */
  values: unknown;

  /**
   * The version of the live settings manifest. It is `null` when the app has no live
   * manifest. Then `values` and `secrets` are empty.
   */
  live_manifest_version?: number | null;

  /**
   * The manifest version of the last save. It is `null` when the installation has no
   * settings.
   */
  manifest_version?: number | null;

  /**
   * The time of the last save.
   */
  updated_at?: string | null;
}

export declare namespace AppInstallation {
  export { type AppInstallationRetrieveSettingsResponse as AppInstallationRetrieveSettingsResponse };
}
