// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MetersAPI from './meters';
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

export class Meters extends APIResource {
  translations: TranslationsAPI.Translations = new TranslationsAPI.Translations(this._client);

  /**
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const meter of client.meters.list()) {
   *   // ...
   * }
   * ```
   */
  list(
    query: MeterListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MetersDefaultPageNumberPagination, Meter> {
    return this._client.getAPIList('/meters', DefaultPageNumberPagination<Meter>, { query, ...options });
  }

  /**
   * @example
   * ```ts
   * const meter = await client.meters.create({
   *   aggregation: { type: 'count' },
   *   event_name: 'event_name',
   *   measurement_unit: 'measurement_unit',
   *   name: 'name',
   * });
   * ```
   */
  create(body: MeterCreateParams, options?: RequestOptions): APIPromise<Meter> {
    return this._client.post('/meters', { body, ...options });
  }

  /**
   * @example
   * ```ts
   * const meter = await client.meters.retrieve(
   *   'mtr_h5tgTWL55OyMO0L2Q9w9v',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: MeterRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Meter> {
    return this._client.get(path`/meters/${id}`, { query, ...options });
  }

  /**
   * @example
   * ```ts
   * const meter = await client.meters.update(
   *   'mtr_h5tgTWL55OyMO0L2Q9w9v',
   * );
   * ```
   */
  update(id: string, body: MeterUpdateParams, options?: RequestOptions): APIPromise<Meter> {
    return this._client.patch(path`/meters/${id}`, { body, ...options });
  }

  /**
   * @example
   * ```ts
   * await client.meters.archive('mtr_h5tgTWL55OyMO0L2Q9w9v');
   * ```
   */
  archive(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/meters/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * @example
   * ```ts
   * await client.meters.unarchive('mtr_h5tgTWL55OyMO0L2Q9w9v');
   * ```
   */
  unarchive(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/meters/${id}/unarchive`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type MetersDefaultPageNumberPagination = DefaultPageNumberPagination<Meter>;

export type Conjunction = 'and' | 'or';

export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'greater_than_or_equals'
  | 'less_than'
  | 'less_than_or_equals'
  | 'contains'
  | 'does_not_contain';

/**
 * Filter clauses — either a flat list of `MeterFilterCondition`s or a list of
 * nested `MeterFilter`s. Up to 3 levels of nesting are accepted; the limit is
 * enforced at runtime.
 */
export type FilterType = Array<FilterType.MeterFilterConditionList> | Array<MeterFilter>;

export namespace FilterType {
  export interface MeterFilterConditionList {
    /**
     * Filter key to apply
     */
    key: string;

    /**
     * Filter operator
     */
    operator: MetersAPI.FilterOperator;

    /**
     * Filter value - can be string, number, or boolean
     */
    value: string | number | boolean;
  }
}

export interface Meter {
  id: string;

  aggregation: MeterAggregation;

  business_id: string;

  created_at: string;

  event_name: string;

  measurement_unit: string;

  name: string;

  updated_at: string;

  description?: string | null;

  /**
   * A filter structure that combines multiple conditions with logical conjunctions
   * (AND/OR).
   *
   * Supports up to 3 levels of nesting to create complex filter expressions. Each
   * filter has a conjunction (and/or) and clauses that can be either direct
   * conditions or nested filters.
   */
  filter?: MeterFilter | null;
}

export interface MeterAggregation {
  /**
   * Aggregation type for the meter
   */
  type: 'count' | 'sum' | 'max' | 'last';

  /**
   * Required when type is not COUNT
   */
  key?: string | null;
}

/**
 * A filter structure that combines multiple conditions with logical conjunctions
 * (AND/OR).
 *
 * Supports up to 3 levels of nesting to create complex filter expressions. Each
 * filter has a conjunction (and/or) and clauses that can be either direct
 * conditions or nested filters.
 */
export interface MeterFilter {
  /**
   * Filter clauses - can be direct conditions or nested filters (up to 3 levels
   * deep)
   */
  clauses: FilterType;

  /**
   * Logical conjunction to apply between clauses (and/or)
   */
  conjunction: Conjunction;
}

export interface MeterListParams extends DefaultPageNumberPaginationParams {
  /**
   * List archived meters
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

export interface MeterCreateParams {
  /**
   * Aggregation configuration for the meter
   */
  aggregation: MeterAggregation;

  /**
   * Event name to track
   */
  event_name: string;

  /**
   * measurement unit
   */
  measurement_unit: string;

  /**
   * Name of the meter
   */
  name: string;

  /**
   * Optional description of the meter
   */
  description?: string | null;

  /**
   * Optional filter to apply to the meter
   */
  filter?: MeterFilter | null;
}

export interface MeterRetrieveParams {
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

export interface MeterUpdateParams {
  /**
   * Description of the meter. Send `null` to remove the description. Omit it to keep
   * it.
   */
  description?: string | null;

  /**
   * Measurement unit
   */
  measurement_unit?: string | null;

  /**
   * Name of the meter
   */
  name?: string | null;
}

Meters.Translations = Translations;

export declare namespace Meters {
  export {
    type Conjunction as Conjunction,
    type FilterOperator as FilterOperator,
    type FilterType as FilterType,
    type Meter as Meter,
    type MeterAggregation as MeterAggregation,
    type MeterFilter as MeterFilter,
    type MetersDefaultPageNumberPagination as MetersDefaultPageNumberPagination,
    type MeterListParams as MeterListParams,
    type MeterCreateParams as MeterCreateParams,
    type MeterRetrieveParams as MeterRetrieveParams,
    type MeterUpdateParams as MeterUpdateParams,
  };

  export {
    Translations as Translations,
    type TranslationListParams as TranslationListParams,
    type TranslationUpdateParams as TranslationUpdateParams,
    type TranslationDeleteParams as TranslationDeleteParams,
  };
}
