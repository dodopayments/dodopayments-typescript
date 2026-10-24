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
   * const translationsListResponse =
   *   await client.products.translations.list('id');
   * ```
   */
  list(
    id: string,
    query: TranslationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TranslationsListResponse> {
    return this._client.get(path`/products/${id}/translations`, { query, ...options });
  }

  /**
   * Creates or replaces the translation of one locale. The response is 201 for a new
   * locale and 200 for a replaced locale.
   *
   * @example
   * ```ts
   * const translation =
   *   await client.products.translations.update('ar', {
   *     id: 'id',
   *   });
   * ```
   */
  update(
    locale: MiscAPI.Locale,
    params: TranslationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<Translation> {
    const { id, ...body } = params;
    return this._client.put(path`/products/${id}/translations/${locale}`, { body, ...options });
  }

  /**
   * Deletes the translation of one locale.
   *
   * @example
   * ```ts
   * await client.products.translations.delete('ar', {
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
    return this._client.delete(path`/products/${id}/translations/${locale}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * The translation of a product, an add-on, a product collection or a meter in one
 * locale.
 */
export interface Translation {
  /**
   * The locale of the translation.
   */
  locale: MiscAPI.Locale;

  /**
   * The time of the last change.
   */
  updated_at: string;

  /**
   * The translated description. `null` shows that the description has no
   * translation.
   */
  description?: string | null;

  /**
   * The translated name. `null` shows that the name has no translation.
   */
  name?: string | null;
}

/**
 * The translations of a product, an add-on, a product collection or a meter.
 */
export interface TranslationsListResponse {
  items: Array<Translation>;
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
   * Path param: Product Id
   */
  id: string;

  /**
   * Body param: The translated description.
   */
  description?: string | null;

  /**
   * Body param: The translated name.
   */
  name?: string | null;
}

export interface TranslationDeleteParams {
  /**
   * Product Id
   */
  id: string;
}

export declare namespace Translations {
  export {
    type Translation as Translation,
    type TranslationsListResponse as TranslationsListResponse,
    type TranslationListParams as TranslationListParams,
    type TranslationUpdateParams as TranslationUpdateParams,
    type TranslationDeleteParams as TranslationDeleteParams,
  };
}
