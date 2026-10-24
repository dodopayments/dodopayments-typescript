// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Translations extends APIResource {
  /**
   * Lists the translations, for all the locales or for the locales of the filter.
   *
   * @example
   * ```ts
   * const entitlementTranslationsListResponse =
   *   await client.entitlements.translations.list('id');
   * ```
   */
  list(
    id: string,
    query: TranslationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EntitlementTranslationsListResponse> {
    return this._client.get(path`/entitlements/${id}/translations`, { query, ...options });
  }

  /**
   * Creates or replaces the translation of one locale. The response is 201 for a new
   * locale and 200 for a replaced locale.
   *
   * @example
   * ```ts
   * const entitlementTranslation =
   *   await client.entitlements.translations.update('ar', {
   *     id: 'id',
   *   });
   * ```
   */
  update(
    locale: MiscAPI.Locale,
    params: TranslationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EntitlementTranslation> {
    const { id, ...body } = params;
    return this._client.put(path`/entitlements/${id}/translations/${locale}`, { body, ...options });
  }

  /**
   * Deletes the translation of one locale.
   *
   * @example
   * ```ts
   * await client.entitlements.translations.delete('ar', {
   *   id: 'id',
   * });
   * ```
   */
  delete(
    locale: MiscAPI.Locale,
    params: TranslationDeleteParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/entitlements/${id}/translations/${locale}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The translation of an entitlement in one locale.
 */
export interface EntitlementTranslation {
  /**
   * The locale of the translation.
   */
  locale: MiscAPI.Locale;

  /**
   * The time of the last change.
   */
  updated_at: string;

  /**
   * The translated activation message of a `license_key` entitlement.
   */
  activation_message?: string | null;

  /**
   * The translated description. `null` shows that the description has no
   * translation.
   */
  description?: string | null;

  /**
   * The translated delivery instructions of a `digital_files` entitlement.
   */
  instructions?: string | null;

  /**
   * The translated name. `null` shows that the name has no translation.
   */
  name?: string | null;
}

/**
 * The translations of an entitlement.
 */
export interface EntitlementTranslationsListResponse {
  items: Array<EntitlementTranslation>;
}

export interface TranslationListParams {
  /**
   * Returns only these locales, for example `?locale=fr&locale=de`. With no value,
   * the response has all the locales.
   */
  locale?: Array<string>;
}

export interface TranslationUpdateParams {
  /**
   * Path param: Entitlement Id
   */
  id: string;

  /**
   * Body param: The translated activation message. Only a `license_key` entitlement
   * has it.
   */
  activation_message?: string | null;

  /**
   * Body param: The translated description.
   */
  description?: string | null;

  /**
   * Body param: The translated delivery instructions. Only a `digital_files`
   * entitlement has them.
   */
  instructions?: string | null;

  /**
   * Body param: The translated name.
   */
  name?: string | null;
}

export interface TranslationDeleteParams {
  /**
   * Entitlement Id
   */
  id: string;
}

export declare namespace Translations {
  export {
    type EntitlementTranslation as EntitlementTranslation,
    type EntitlementTranslationsListResponse as EntitlementTranslationsListResponse,
    type TranslationListParams as TranslationListParams,
    type TranslationUpdateParams as TranslationUpdateParams,
    type TranslationDeleteParams as TranslationDeleteParams,
  };
}
