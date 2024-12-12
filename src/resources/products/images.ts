// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Images extends APIResource {
  update(id: string, options?: Core.RequestOptions): Core.APIPromise<ImageUpdateResponse> {
    return this._client.put(`/products/${id}/images`, options);
  }
}

export interface ImageUpdateResponse {
  url: string;
}

export declare namespace Images {
  export { type ImageUpdateResponse as ImageUpdateResponse };
}
