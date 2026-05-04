// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Detach a previously-attached file from a `digital_files` entitlement.
   */
  delete(fileID: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/entitlements/${id}/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Attach a file to a `digital_files` entitlement. Per-file size cap: 500 MiB.
   */
  upload(id: string, options?: RequestOptions): APIPromise<FileUploadResponse> {
    return this._client.post(path`/entitlements/${id}/files`, options);
  }
}

export interface FileUploadResponse {
  /**
   * Identifier of the attached file. Pass it to
   * `DELETE /entitlements/{id}/files/{file_id}` to detach the file later.
   */
  file_id: string;
}

export interface FileDeleteParams {
  /**
   * Entitlement Id
   */
  id: string;
}

export declare namespace Files {
  export { type FileUploadResponse as FileUploadResponse, type FileDeleteParams as FileDeleteParams };
}
