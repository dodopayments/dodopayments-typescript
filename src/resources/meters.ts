// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Meters extends APIResource {
  create(body: MeterCreateParams, options?: Core.RequestOptions): Core.APIPromise<Meter> {
    return this._client.post('/meters', { body, ...options });
  }

  retrieve(id: string, options?: Core.RequestOptions): Core.APIPromise<Meter> {
    return this._client.get(`/meters/${id}`, options);
  }

  list(
    query?: MeterListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<MetersDefaultPageNumberPagination, Meter>;
  list(options?: Core.RequestOptions): Core.PagePromise<MetersDefaultPageNumberPagination, Meter>;
  list(
    query: MeterListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<MetersDefaultPageNumberPagination, Meter> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/meters', MetersDefaultPageNumberPagination, { query, ...options });
  }

  archive(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/meters/${id}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  unarchive(id: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post(`/meters/${id}/unarchive`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export class MetersDefaultPageNumberPagination extends DefaultPageNumberPagination<Meter> {}

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
  type: 'count' | 'sum' | 'unique_count' | 'max' | 'last';

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
  clauses: Array<MeterFilter.DirectFilterCondition> | Array<MeterFilter.NestedMeterFilter>;

  /**
   * Logical conjunction to apply between clauses (and/or)
   */
  conjunction: 'and' | 'or';
}

export namespace MeterFilter {
  /**
   * Filter condition with key, operator, and value
   */
  export interface DirectFilterCondition {
    /**
     * Filter key to apply
     */
    key: string;

    operator:
      | 'equals'
      | 'not_equals'
      | 'greater_than'
      | 'greater_than_or_equals'
      | 'less_than'
      | 'less_than_or_equals'
      | 'contains'
      | 'does_not_contain';

    /**
     * Filter value - can be string, number, or boolean
     */
    value: string | number | boolean;
  }

  /**
   * Level 1 nested filter - can contain Level 2 filters
   */
  export interface NestedMeterFilter {
    /**
     * Level 1: Can be conditions or nested filters (2 more levels allowed)
     */
    clauses: Array<NestedMeterFilter.Level1FilterCondition> | Array<NestedMeterFilter.Level1NestedFilter>;

    conjunction: 'and' | 'or';
  }

  export namespace NestedMeterFilter {
    /**
     * Filter condition with key, operator, and value
     */
    export interface Level1FilterCondition {
      /**
       * Filter key to apply
       */
      key: string;

      operator:
        | 'equals'
        | 'not_equals'
        | 'greater_than'
        | 'greater_than_or_equals'
        | 'less_than'
        | 'less_than_or_equals'
        | 'contains'
        | 'does_not_contain';

      /**
       * Filter value - can be string, number, or boolean
       */
      value: string | number | boolean;
    }

    /**
     * Level 2 nested filter
     */
    export interface Level1NestedFilter {
      /**
       * Level 2: Can be conditions or nested filters (1 more level allowed)
       */
      clauses: Array<Level1NestedFilter.Level2FilterCondition> | Array<Level1NestedFilter.Level2NestedFilter>;

      conjunction: 'and' | 'or';
    }

    export namespace Level1NestedFilter {
      /**
       * Filter condition with key, operator, and value
       */
      export interface Level2FilterCondition {
        /**
         * Filter key to apply
         */
        key: string;

        operator:
          | 'equals'
          | 'not_equals'
          | 'greater_than'
          | 'greater_than_or_equals'
          | 'less_than'
          | 'less_than_or_equals'
          | 'contains'
          | 'does_not_contain';

        /**
         * Filter value - can be string, number, or boolean
         */
        value: string | number | boolean;
      }

      /**
       * Level 3 nested filter (final nesting level)
       */
      export interface Level2NestedFilter {
        /**
         * Level 3: Filter conditions only (max depth reached)
         */
        clauses: Array<Level2NestedFilter.Clause>;

        conjunction: 'and' | 'or';
      }

      export namespace Level2NestedFilter {
        /**
         * Filter condition with key, operator, and value
         */
        export interface Clause {
          /**
           * Filter key to apply
           */
          key: string;

          operator:
            | 'equals'
            | 'not_equals'
            | 'greater_than'
            | 'greater_than_or_equals'
            | 'less_than'
            | 'less_than_or_equals'
            | 'contains'
            | 'does_not_contain';

          /**
           * Filter value - can be string, number, or boolean
           */
          value: string | number | boolean;
        }
      }
    }
  }
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

export interface MeterListParams extends DefaultPageNumberPaginationParams {
  /**
   * List archived meters
   */
  archived?: boolean;
}

Meters.MetersDefaultPageNumberPagination = MetersDefaultPageNumberPagination;

export declare namespace Meters {
  export {
    type Meter as Meter,
    type MeterAggregation as MeterAggregation,
    type MeterFilter as MeterFilter,
    MetersDefaultPageNumberPagination as MetersDefaultPageNumberPagination,
    type MeterCreateParams as MeterCreateParams,
    type MeterListParams as MeterListParams,
  };
}
