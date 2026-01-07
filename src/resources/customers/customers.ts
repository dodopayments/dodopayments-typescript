// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as MiscAPI from '../misc';
import * as PaymentsAPI from '../payments';
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

  retrievePaymentMethods(
    customerID: string,
    options?: RequestOptions,
  ): APIPromise<CustomerRetrievePaymentMethodsResponse> {
    return this._client.get(path`/customers/${customerID}/payment-methods`, options);
  }
}

export type CustomersDefaultPageNumberPagination = DefaultPageNumberPagination<Customer>;

export interface Customer {
  business_id: string;

  created_at: string;

  customer_id: string;

  email: string;

  name: string;

  /**
   * Additional metadata for the customer
   */
  metadata?: { [key: string]: string };

  phone_number?: string | null;
}

export interface CustomerPortalSession {
  link: string;
}

export interface CustomerRetrievePaymentMethodsResponse {
  items: Array<CustomerRetrievePaymentMethodsResponse.Item>;
}

export namespace CustomerRetrievePaymentMethodsResponse {
  export interface Item {
    payment_method:
      | 'card'
      | 'card_redirect'
      | 'pay_later'
      | 'wallet'
      | 'bank_redirect'
      | 'bank_transfer'
      | 'crypto'
      | 'bank_debit'
      | 'reward'
      | 'real_time_payment'
      | 'upi'
      | 'voucher'
      | 'gift_card'
      | 'open_banking'
      | 'mobile_payment';

    payment_method_id: string;

    card?: Item.Card | null;

    last_used_at?: string | null;

    payment_method_type?: PaymentsAPI.PaymentMethodTypes | null;

    recurring_enabled?: boolean | null;
  }

  export namespace Item {
    export interface Card {
      card_holder_name?: string | null;

      /**
       * ISO country code alpha2 variant
       */
      card_issuing_country?: MiscAPI.CountryCode | null;

      card_network?: string | null;

      card_type?: string | null;

      expiry_month?: string | null;

      expiry_year?: string | null;

      last4_digits?: string | null;
    }
  }
}

export interface CustomerCreateParams {
  email: string;

  name: string;

  /**
   * Additional metadata for the customer
   */
  metadata?: { [key: string]: string };

  phone_number?: string | null;
}

export interface CustomerUpdateParams {
  /**
   * Additional metadata for the customer
   */
  metadata?: { [key: string]: string } | null;

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
    type CustomerRetrievePaymentMethodsResponse as CustomerRetrievePaymentMethodsResponse,
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
