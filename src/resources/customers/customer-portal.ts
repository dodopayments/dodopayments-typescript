// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CustomersAPI from './customers';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class CustomerPortal extends APIResource {
  create(customerID: string, params: CustomerPortalCreateParams | null | undefined = {}, options?: RequestOptions): APIPromise<CustomersAPI.CustomerPortalSession> {
    const { return_url, send_email } = params ?? {}
    return this._client.post(path`/customers/${customerID}/customer-portal/session`, { query: { return_url, send_email }, ...options });
  }
}

export interface CustomerPortalCreateParams {
  /**
   * Optional return URL for this session. Overrides the business-level default. This
   * URL will be shown as a "Return to {business}" back button in the portal.
   */
  return_url?: string;

  /**
   * If true, will send link to user.
   */
  send_email?: boolean;
}

export declare namespace CustomerPortal {
  export {
    type CustomerPortalCreateParams as CustomerPortalCreateParams
  };
}
