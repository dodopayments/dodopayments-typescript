// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Images extends APIResource {
  update(
    id: string,
    params: ImageUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageUpdateResponse> {
    const { force_update } = params ?? {};
    return this._client.put(path`/products/${id}/images`, { query: { force_update }, ...options });
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
