// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * Companion to `post_entitlement_file`. Deletes the file from the Entitlements
   * Engine (force=true) and atomically removes the `file_id` from the entitlement's
   * `integration_config.digital_file_ids` JSONB array. EE delete happens first; if
   * it fails we surface the error and leave local state untouched.
   */
  delete(fileID: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.delete(path`/entitlements/${id}/files/${fileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Streams a multipart/form-data body to the Entitlements Engine
   * (`POST /api/digital-files/dodo/files/upload`) and appends the returned `file_id`
   * to the entitlement's `integration_config.digital_file_ids` using a JSONB array
   * append. Compensates EE-side on local DB write failure (best-effort delete of the
   * just-uploaded file).
   */
  upload(id: string, options?: RequestOptions): APIPromise<FileUploadResponse> {
    return this._client.post(path`/entitlements/${id}/files`, options);
  }
}

export interface FileUploadResponse {
  /**
   * EE-issued digital file id; appended to
   * `entitlements.integration_config.digital_file_ids`.
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
