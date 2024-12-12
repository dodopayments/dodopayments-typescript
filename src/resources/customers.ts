// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Customers extends APIResource {
  retrieve(customerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/${customerId}`, options);
  }

  list(query?: CustomerListParams, options?: Core.RequestOptions): Core.APIPromise<CustomerListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<CustomerListResponse>;
  list(
    query: CustomerListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CustomerListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/customers', { query, ...options });
  }
}

export interface Customer {
  business_id: string;

  created_at: string;

  customer_id: string;

  email: string;

  name: string;

  phone_number?: string | null;
}

export interface CustomerListResponse {
  items: Array<Customer>;
}

export interface CustomerListParams {
  /**
   * Page number default is 0
   */
  page_number?: number | null;

  /**
   * Page size default is 10 max is 100
   */
  page_size?: number | null;
}

export declare namespace Customers {
  export {
    type Customer as Customer,
    type CustomerListResponse as CustomerListResponse,
    type CustomerListParams as CustomerListParams,
  };
}
