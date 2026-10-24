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
   * const creditEntitlementTranslationsListResponse =
   *   await client.creditEntitlements.translations.list('id');
   * ```
   */
  list(
    id: string,
    query: TranslationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CreditEntitlementTranslationsListResponse> {
    return this._client.get(path`/credit-entitlements/${id}/translations`, { query, ...options });
  }

  /**
   * Creates or replaces the translation of one locale. The response is 201 for a new
   * locale and 200 for a replaced locale.
   *
   * @example
   * ```ts
   * const creditEntitlementTranslation =
   *   await client.creditEntitlements.translations.update(
   *     'ar',
   *     { id: 'id' },
   *   );
   * ```
   */
  update(
    locale: MiscAPI.Locale,
    params: TranslationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CreditEntitlementTranslation> {
    const { id, ...body } = params;
    return this._client.put(path`/credit-entitlements/${id}/translations/${locale}`, { body, ...options });
  }

  /**
   * Deletes the translation of one locale.
   *
   * @example
   * ```ts
   * await client.creditEntitlements.translations.delete('ar', {
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
    return this._client.delete(path`/credit-entitlements/${id}/translations/${locale}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The translation of a credit entitlement in one locale.
 */
export interface CreditEntitlementTranslation {
  /**
   * The locale of the translation.
   */
  locale: MiscAPI.Locale;

  /**
   * The time of the last change.
   */
  updated_at: string;

  /**
   * The translated name. `null` shows that the name has no translation.
   */
  name?: string | null;

  /**
   * The translated unit. `null` shows that the unit has no translation.
   */
  unit?: string | null;
}

/**
 * The translations of a credit entitlement.
 */
export interface CreditEntitlementTranslationsListResponse {
  items: Array<CreditEntitlementTranslation>;
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
   * Path param: Credit Entitlement Id
   */
  id: string;

  /**
   * Body param: The translated name.
   */
  name?: string | null;

  /**
   * Body param: The translated unit.
   */
  unit?: string | null;
}

export interface TranslationDeleteParams {
  /**
   * Credit Entitlement Id
   */
  id: string;
}

export declare namespace Translations {
  export {
    type CreditEntitlementTranslation as CreditEntitlementTranslation,
    type CreditEntitlementTranslationsListResponse as CreditEntitlementTranslationsListResponse,
    type TranslationListParams as TranslationListParams,
    type TranslationUpdateParams as TranslationUpdateParams,
    type TranslationDeleteParams as TranslationDeleteParams,
  };
}
