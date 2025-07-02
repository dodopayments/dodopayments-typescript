// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Images extends APIResource {
  update(
    id: string,
    params?: ImageUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ImageUpdateResponse>;
  update(id: string, options?: Core.RequestOptions): Core.APIPromise<ImageUpdateResponse>;
  update(
    id: string,
    params: ImageUpdateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ImageUpdateResponse> {
    if (isRequestOptions(params)) {
      return this.update(id, {}, params);
    }
    const { force_update } = params;
    return this._client.put(`/products/${id}/images`, { query: { force_update }, ...options });
  }
}

export interface ImageUpdateResponse {
  url: string;

  image_id?: string | null;
}

export interface ImageUpdateParams {
  force_update?: boolean;
}

export declare namespace Images {
  export { type ImageUpdateResponse as ImageUpdateResponse, type ImageUpdateParams as ImageUpdateParams };
}
