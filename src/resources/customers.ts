// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class Customers extends APIResource {
  retrieve(customerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/${customerId}`, options);
  }

  list(
    query?: CustomerListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomersDefaultPageNumberPagination, Customer>;
  list(options?: Core.RequestOptions): Core.PagePromise<CustomersDefaultPageNumberPagination, Customer>;
  list(
    query: CustomerListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CustomersDefaultPageNumberPagination, Customer> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/customers', CustomersDefaultPageNumberPagination, { query, ...options });
  }
}

export class CustomersDefaultPageNumberPagination extends DefaultPageNumberPagination<Customer> {}

export interface Customer {
  business_id: string;

  created_at: string;

  customer_id: string;

  email: string;

  name: string;

  phone_number?: string | null;
}

export interface CustomerListParams extends DefaultPageNumberPaginationParams {}

Customers.CustomersDefaultPageNumberPagination = CustomersDefaultPageNumberPagination;

export declare namespace Customers {
  export {
    type Customer as Customer,
    CustomersDefaultPageNumberPagination as CustomersDefaultPageNumberPagination,
    type CustomerListParams as CustomerListParams,
  };
}
