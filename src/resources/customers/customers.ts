// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomerPortalAPI from './customer-portal';
import { CustomerPortal, CustomerPortalCreateParams } from './customer-portal';
import * as WalletsAPI from './wallets/wallets';
import { CustomerWallet, WalletListResponse, Wallets } from './wallets/wallets';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Customers extends APIResource {
  customerPortal: CustomerPortalAPI.CustomerPortal = new CustomerPortalAPI.CustomerPortal(this._client);
  wallets: WalletsAPI.Wallets = new WalletsAPI.Wallets(this._client);

  create(body: CustomerCreateParams, options?: RequestOptions): APIPromise<Customer> {
    return this._client.post('/customers', { body, ...options });
  }

  retrieve(customerID: string, options?: RequestOptions): APIPromise<Customer> {
    return this._client.get(path`/customers/${customerID}`, options);
  }

  update(customerID: string, body: CustomerUpdateParams, options?: RequestOptions): APIPromise<Customer> {
    return this._client.patch(path`/customers/${customerID}`, { body, ...options });
  }

  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CustomersDefaultPageNumberPagination, Customer> {
    return this._client.getAPIList('/customers', DefaultPageNumberPagination<Customer>, {
      query,
      ...options,
    });
  }
}

export type CustomersDefaultPageNumberPagination = DefaultPageNumberPagination<Customer>;

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

export interface CustomerListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by customer email
   */
  email?: string;
}

Customers.CustomerPortal = CustomerPortal;
Customers.Wallets = Wallets;

export declare namespace Customers {
  export {
    type Customer as Customer,
    type CustomerPortalSession as CustomerPortalSession,
    type CustomersDefaultPageNumberPagination as CustomersDefaultPageNumberPagination,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerListParams as CustomerListParams,
  };

  export { CustomerPortal as CustomerPortal, type CustomerPortalCreateParams as CustomerPortalCreateParams };

  export {
    Wallets as Wallets,
    type CustomerWallet as CustomerWallet,
    type WalletListResponse as WalletListResponse,
  };
}
