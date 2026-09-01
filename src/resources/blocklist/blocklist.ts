// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomersAPI from './customers/customers';
import {
  BlockByCustomerID,
  BlockByEmail,
  BlockIdentifier,
  BlockedCustomer,
  BlockedCustomerSource,
  BlockedCustomersDefaultPageNumberPagination,
  CreateBlockedCustomerRequest,
  CustomerCreateParams,
  CustomerListParams,
  Customers,
} from './customers/customers';

export class Blocklist extends APIResource {
  customers: CustomersAPI.Customers = new CustomersAPI.Customers(this._client);
}

Blocklist.Customers = Customers;

export declare namespace Blocklist {
  export {
    Customers as Customers,
    type BlockByCustomerID as BlockByCustomerID,
    type BlockByEmail as BlockByEmail,
    type BlockIdentifier as BlockIdentifier,
    type BlockedCustomer as BlockedCustomer,
    type BlockedCustomerSource as BlockedCustomerSource,
    type CreateBlockedCustomerRequest as CreateBlockedCustomerRequest,
    type BlockedCustomersDefaultPageNumberPagination as BlockedCustomersDefaultPageNumberPagination,
    type CustomerListParams as CustomerListParams,
    type CustomerCreateParams as CustomerCreateParams,
  };
}
