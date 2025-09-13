// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomersAPI from './customers';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CustomerPortal extends APIResource {
  create(
    customerID: string,
    params: CustomerPortalCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomersAPI.CustomerPortalSession> {
    const { send_email } = params ?? {};
    return this._client.post(path`/customers/${customerID}/customer-portal/session`, {
      query: { send_email },
      ...options,
    });
  }
}

export interface CustomerPortalCreateParams {
  /**
   * If true, will send link to user.
   */
  send_email?: boolean;
}

export declare namespace CustomerPortal {
  export { type CustomerPortalCreateParams as CustomerPortalCreateParams };
}
