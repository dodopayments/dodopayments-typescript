// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as CustomerPortalAPI from './customer-portal/customer-portal';
import { CustomerPortal } from './customer-portal/customer-portal';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../../pagination';

export class Customers extends APIResource {
  customerPortal: CustomerPortalAPI.CustomerPortal = new CustomerPortalAPI.CustomerPortal(this._client);

  create(body: CustomerCreateParams, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.post('/customers', { body, ...options });
  }

  retrieve(customerId: string, options?: Core.RequestOptions): Core.APIPromise<Customer> {
    return this._client.get(`/customers/${customerId}`, options);
  }

  update(
    customerId: string,
    body: CustomerUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Customer> {
    return this._client.patch(`/customers/${customerId}`, { body, ...options });
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

export interface CustomerPortalSession {
  link: string;
}

export interface CustomerCreateParams {
  email: string;

  name: string;

  phone_number?: string | null;
}

export interface CustomerUpdateParams {
  name?: string | null;

  phone_number?: string | null;
}

export interface CustomerListParams extends DefaultPageNumberPaginationParams {}

Customers.CustomersDefaultPageNumberPagination = CustomersDefaultPageNumberPagination;
Customers.CustomerPortal = CustomerPortal;

export declare namespace Customers {
  export {
    type Customer as Customer,
    type CustomerPortalSession as CustomerPortalSession,
    CustomersDefaultPageNumberPagination as CustomersDefaultPageNumberPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
  };

  export { CustomerPortal as CustomerPortal };
}
