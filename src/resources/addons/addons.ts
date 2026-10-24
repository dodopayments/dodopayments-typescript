// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import * as TranslationsAPI from './translations';
import {
  TranslationDeleteParams,
  TranslationListParams,
  TranslationUpdateParams,
  Translations,
} from './translations';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Addons extends APIResource {
  translations: TranslationsAPI.Translations = new TranslationsAPI.Translations(this._client);

  /**
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const addonResponse of client.addons.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: AddonListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<AddonResponsesDefaultPageNumberPagination, AddonResponse> {
    return this._client.getAPIList('/addons', DefaultPageNumberPagination<AddonResponse>, {
      query,
      ...options,
    });
  }

  /**
   * @example
   * ```ts
   * const addonResponse = await client.addons.create({
   *   currency: 'AED',
   *   name: 'name',
   *   price: 0,
   *   tax_category: 'digital_products',
   * });
   * ```
   */
  create(body: AddonCreateParams, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.post('/addons', { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const addonResponse = await client.addons.retrieve(
   *   'adn_NX1zdqW4Hbivsqz8vI9dc',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: AddonRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AddonResponse> {
    return this._client.get(path`/addons/${id}`, { query, ...options });
  }

  /**
   * @example
   * ```ts
   * const addonResponse = await client.addons.update(
   *   'adn_NX1zdqW4Hbivsqz8vI9dc',
   * );
   * ```
   */
  update(id: string, body: AddonUpdateParams, options?: RequestOptions): APIPromise<AddonResponse> {
    return this._client.patch(path`/addons/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const response = await client.addons.updateImages(
   *   'adn_NX1zdqW4Hbivsqz8vI9dc',
   * );
   * ```
   */
  updateImages(id: string, options?: RequestOptions): APIPromise<AddonUpdateImagesResponse> {
    return this._client.put(path`/addons/${id}/images`, options);
  }

  /**
   * @example
   * ```ts
   * await client.addons.delete('adn_NX1zdqW4Hbivsqz8vI9dc');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/addons/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * @example
   * ```ts
   * await client.addons.unarchive('adn_NX1zdqW4Hbivsqz8vI9dc');
   * ```
   */
  unarchive(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/addons/${id}/unarchive`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type AddonResponsesDefaultPageNumberPagination = DefaultPageNumberPagination<AddonResponse>;

export interface AddonResponse {
  /**
   * id of the Addon
   */
  id: string;

  /**
   * Unique identifier for the business to which the addon belongs.
   */
  business_id: string;

  /**
   * Created time
   */
  created_at: string;

  /**
   * Currency of the Addon
   */
  currency: MiscAPI.Currency;

  /**
   * Name of the Addon
   */
  name: string;

  /**
   * Amount of the addon
   */
  price: number;

  /**
   * Tax category applied to this Addon
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Updated time
   */
  updated_at: string;

  /**
   * Optional description of the Addon
   */
  description?: string | null;

  /**
   * Image of the Addon
   */
  image?: string | null;
}

export interface AddonUpdateImagesResponse {
  image_id: string;

  url: string;
}

export interface AddonListParams extends DefaultPageNumberPaginationParams {
  /**
   * List archived addons. The default is false.
   */
  archived?: boolean;

  /**
   * Shows the translated name, description and unit of the catalog entities in this
   * locale. The value must be a code from `GET /locales`, for example `fr`. A field
   * with no translation, an unknown code, or no code shows the base text.
   *
   * Do not send a text from a localized response back in a create or update request.
   * The base text then changes to the translated text.
   */
  locale?: string;
}

export interface AddonCreateParams {
  /**
   * The currency of the Addon
   */
  currency: MiscAPI.Currency;

  /**
   * Name of the Addon
   */
  name: string;

  /**
   * Amount of the addon
   */
  price: number;

  /**
   * Tax category applied to this Addon
   */
  tax_category: MiscAPI.TaxCategory;

  /**
   * Optional description of the Addon
   */
  description?: string | null;
}

export interface AddonRetrieveParams {
  /**
   * Shows the translated name, description and unit of the catalog entities in this
   * locale. The value must be a code from `GET /locales`, for example `fr`. A field
   * with no translation, an unknown code, or no code shows the base text.
   *
   * Do not send a text from a localized response back in a create or update request.
   * The base text then changes to the translated text.
   */
  locale?: string;
}

export interface AddonUpdateParams {
  /**
   * The currency of the Addon
   */
  currency?: MiscAPI.Currency | null;

  /**
   * Description of the Addon, optional and must be at most 1000 characters.
   */
  description?: string | null;

  /**
   * Addon image id after its uploaded to S3. Pass `null` to remove the existing
   * image, omit to keep it unchanged.
   */
  image_id?: string | null;

  /**
   * Name of the Addon, optional and must be at most 100 characters.
   */
  name?: string | null;

  /**
   * Amount of the addon
   */
  price?: number | null;

  /**
   * Tax category of the Addon.
   */
  tax_category?: MiscAPI.TaxCategory | null;
}

Addons.Translations = Translations;

export declare namespace Addons {
  export {
    type AddonResponse as AddonResponse,
    type AddonUpdateImagesResponse as AddonUpdateImagesResponse,
    type AddonResponsesDefaultPageNumberPagination as AddonResponsesDefaultPageNumberPagination,
    type AddonListParams as AddonListParams,
    type AddonCreateParams as AddonCreateParams,
    type AddonRetrieveParams as AddonRetrieveParams,
    type AddonUpdateParams as AddonUpdateParams,
  };

  export {
    Translations as Translations,
    type TranslationListParams as TranslationListParams,
    type TranslationUpdateParams as TranslationUpdateParams,
    type TranslationDeleteParams as TranslationDeleteParams,
  };
}
