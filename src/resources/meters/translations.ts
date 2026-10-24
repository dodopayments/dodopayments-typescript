// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import * as ProductsTranslationsAPI from '../products/translations';
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
   *   await client.meters.translations.list('id');
   * ```
   */
  list(
    id: string,
    query: TranslationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductsTranslationsAPI.TranslationsListResponse> {
    return this._client.get(path`/meters/${id}/translations`, { query, ...options });
  }

  /**
   * Creates or replaces the translation of one locale. The response is 201 for a new
   * locale and 200 for a replaced locale.
   *
   * @example
   * ```ts
   * const translation = await client.meters.translations.update(
   *   'ar',
   *   { id: 'id' },
   * );
   * ```
   */
  update(
    locale: MiscAPI.Locale,
    params: TranslationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ProductsTranslationsAPI.Translation> {
    const { id, ...body } = params;
    return this._client.put(path`/meters/${id}/translations/${locale}`, { body, ...options });
  }

  /**
   * Deletes the translation of one locale.
   *
   * @example
   * ```ts
   * await client.meters.translations.delete('ar', { id: 'id' });
   * ```
   */
  delete(
    locale: MiscAPI.Locale,
    params: TranslationDeleteParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/meters/${id}/translations/${locale}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
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
   * Path param: Meter Id
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
   * Meter Id
   */
  id: string;
}

export declare namespace Translations {
  export {
    type TranslationListParams as TranslationListParams,
    type TranslationUpdateParams as TranslationUpdateParams,
    type TranslationDeleteParams as TranslationDeleteParams,
  };
}
