// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as SessionAPI from './session';
import { Session, SessionCreateParams } from './session';

export class CustomerPortal extends APIResource {
  session: SessionAPI.Session = new SessionAPI.Session(this._client);
}

CustomerPortal.Session = Session;

export declare namespace CustomerPortal {
  export { Session as Session, type SessionCreateParams as SessionCreateParams };
}
