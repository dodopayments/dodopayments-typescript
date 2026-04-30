// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SubscriptionsAPI from '../subscriptions';
import * as FilesAPI from './files';
import { FileDeleteParams, FileUploadResponse, Files } from './files';
import * as GrantsAPI from './grants';
import {
  GrantListParams,
  GrantListResponse,
  GrantListResponsesDefaultPageNumberPagination,
  GrantRevokeParams,
  GrantRevokeResponse,
  Grants,
} from './grants';
import { APIPromise } from '../../core/api-promise';
import {
  DefaultPageNumberPagination,
  type DefaultPageNumberPaginationParams,
  PagePromise,
} from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Entitlements extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
  grants: GrantsAPI.Grants = new GrantsAPI.Grants(this._client);

  /**
   * POST /entitlements
   */
  create(body: EntitlementCreateParams, options?: RequestOptions): APIPromise<EntitlementCreateResponse> {
    return this._client.post('/entitlements', { body, ...options });
  }

  /**
   * GET /entitlements/{id}
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EntitlementRetrieveResponse> {
    return this._client.get(path`/entitlements/${id}`, options);
  }

  /**
   * PATCH /entitlements/{id}
   */
  update(
    id: string,
    body: EntitlementUpdateParams,
    options?: RequestOptions,
  ): APIPromise<EntitlementUpdateResponse> {
    return this._client.patch(path`/entitlements/${id}`, { body, ...options });
  }

  /**
   * GET /entitlements
   */
  list(
    query: EntitlementListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EntitlementListResponsesDefaultPageNumberPagination, EntitlementListResponse> {
    return this._client.getAPIList('/entitlements', DefaultPageNumberPagination<EntitlementListResponse>, {
      query,
      ...options,
    });
  }

  /**
   * DELETE /entitlements/{id} (soft-delete)
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/entitlements/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type EntitlementListResponsesDefaultPageNumberPagination =
  DefaultPageNumberPagination<EntitlementListResponse>;

export interface EntitlementCreateResponse {
  id: string;

  business_id: string;

  created_at: string;

  /**
   * Public-facing variant of [`IntegrationConfig`]. Mirrors every variant shape on
   * the wire EXCEPT `DigitalFiles`, which is replaced with a hydrated
   * `digital_files` object (resolved download URLs etc.). The persisted JSONB stays
   * ID-only via [`IntegrationConfig`]; this enum is response-only.
   */
  integration_config:
    | EntitlementCreateResponse.GitHubConfig
    | EntitlementCreateResponse.DiscordConfig
    | EntitlementCreateResponse.TelegramConfig
    | EntitlementCreateResponse.FigmaConfig
    | EntitlementCreateResponse.FramerConfig
    | EntitlementCreateResponse.NotionConfig
    | EntitlementCreateResponse.DigitalFilesConfig
    | EntitlementCreateResponse.LicenseKeyConfig;

  integration_type:
    | 'discord'
    | 'telegram'
    | 'github'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'digital_files'
    | 'license_key';

  is_active: boolean;

  name: string;

  updated_at: string;

  description?: string | null;

  metadata?: unknown;
}

export namespace EntitlementCreateResponse {
  export interface GitHubConfig {
    permission: string;

    target_id: string;
  }

  export interface DiscordConfig {
    guild_id: string;

    role_id?: string | null;
  }

  export interface TelegramConfig {
    chat_id: string;
  }

  export interface FigmaConfig {
    figma_file_id: string;
  }

  export interface FramerConfig {
    framer_template_id: string;
  }

  export interface NotionConfig {
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    digital_files: DigitalFilesConfig.DigitalFiles;
  }

  export namespace DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    export interface DigitalFiles {
      files: Array<DigitalFiles.File>;

      external_url?: string | null;

      instructions?: string | null;
    }

    export namespace DigitalFiles {
      export interface File {
        download_url: string;

        /**
         * Seconds until `download_url` expires.
         */
        expires_in: number;

        file_id: string;

        filename: string;

        /**
         * `"legacy"` for files in `product_files`, `"ee"` for files managed by the
         * Entitlements Engine.
         */
        source: string;

        content_type?: string | null;

        file_size?: number | null;
      }
    }
  }

  export interface LicenseKeyConfig {
    activation_message?: string | null;

    activations_limit?: number | null;

    duration_count?: number | null;

    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

export interface EntitlementRetrieveResponse {
  id: string;

  business_id: string;

  created_at: string;

  /**
   * Public-facing variant of [`IntegrationConfig`]. Mirrors every variant shape on
   * the wire EXCEPT `DigitalFiles`, which is replaced with a hydrated
   * `digital_files` object (resolved download URLs etc.). The persisted JSONB stays
   * ID-only via [`IntegrationConfig`]; this enum is response-only.
   */
  integration_config:
    | EntitlementRetrieveResponse.GitHubConfig
    | EntitlementRetrieveResponse.DiscordConfig
    | EntitlementRetrieveResponse.TelegramConfig
    | EntitlementRetrieveResponse.FigmaConfig
    | EntitlementRetrieveResponse.FramerConfig
    | EntitlementRetrieveResponse.NotionConfig
    | EntitlementRetrieveResponse.DigitalFilesConfig
    | EntitlementRetrieveResponse.LicenseKeyConfig;

  integration_type:
    | 'discord'
    | 'telegram'
    | 'github'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'digital_files'
    | 'license_key';

  is_active: boolean;

  name: string;

  updated_at: string;

  description?: string | null;

  metadata?: unknown;
}

export namespace EntitlementRetrieveResponse {
  export interface GitHubConfig {
    permission: string;

    target_id: string;
  }

  export interface DiscordConfig {
    guild_id: string;

    role_id?: string | null;
  }

  export interface TelegramConfig {
    chat_id: string;
  }

  export interface FigmaConfig {
    figma_file_id: string;
  }

  export interface FramerConfig {
    framer_template_id: string;
  }

  export interface NotionConfig {
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    digital_files: DigitalFilesConfig.DigitalFiles;
  }

  export namespace DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    export interface DigitalFiles {
      files: Array<DigitalFiles.File>;

      external_url?: string | null;

      instructions?: string | null;
    }

    export namespace DigitalFiles {
      export interface File {
        download_url: string;

        /**
         * Seconds until `download_url` expires.
         */
        expires_in: number;

        file_id: string;

        filename: string;

        /**
         * `"legacy"` for files in `product_files`, `"ee"` for files managed by the
         * Entitlements Engine.
         */
        source: string;

        content_type?: string | null;

        file_size?: number | null;
      }
    }
  }

  export interface LicenseKeyConfig {
    activation_message?: string | null;

    activations_limit?: number | null;

    duration_count?: number | null;

    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

export interface EntitlementUpdateResponse {
  id: string;

  business_id: string;

  created_at: string;

  /**
   * Public-facing variant of [`IntegrationConfig`]. Mirrors every variant shape on
   * the wire EXCEPT `DigitalFiles`, which is replaced with a hydrated
   * `digital_files` object (resolved download URLs etc.). The persisted JSONB stays
   * ID-only via [`IntegrationConfig`]; this enum is response-only.
   */
  integration_config:
    | EntitlementUpdateResponse.GitHubConfig
    | EntitlementUpdateResponse.DiscordConfig
    | EntitlementUpdateResponse.TelegramConfig
    | EntitlementUpdateResponse.FigmaConfig
    | EntitlementUpdateResponse.FramerConfig
    | EntitlementUpdateResponse.NotionConfig
    | EntitlementUpdateResponse.DigitalFilesConfig
    | EntitlementUpdateResponse.LicenseKeyConfig;

  integration_type:
    | 'discord'
    | 'telegram'
    | 'github'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'digital_files'
    | 'license_key';

  is_active: boolean;

  name: string;

  updated_at: string;

  description?: string | null;

  metadata?: unknown;
}

export namespace EntitlementUpdateResponse {
  export interface GitHubConfig {
    permission: string;

    target_id: string;
  }

  export interface DiscordConfig {
    guild_id: string;

    role_id?: string | null;
  }

  export interface TelegramConfig {
    chat_id: string;
  }

  export interface FigmaConfig {
    figma_file_id: string;
  }

  export interface FramerConfig {
    framer_template_id: string;
  }

  export interface NotionConfig {
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    digital_files: DigitalFilesConfig.DigitalFiles;
  }

  export namespace DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    export interface DigitalFiles {
      files: Array<DigitalFiles.File>;

      external_url?: string | null;

      instructions?: string | null;
    }

    export namespace DigitalFiles {
      export interface File {
        download_url: string;

        /**
         * Seconds until `download_url` expires.
         */
        expires_in: number;

        file_id: string;

        filename: string;

        /**
         * `"legacy"` for files in `product_files`, `"ee"` for files managed by the
         * Entitlements Engine.
         */
        source: string;

        content_type?: string | null;

        file_size?: number | null;
      }
    }
  }

  export interface LicenseKeyConfig {
    activation_message?: string | null;

    activations_limit?: number | null;

    duration_count?: number | null;

    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

export interface EntitlementListResponse {
  id: string;

  business_id: string;

  created_at: string;

  /**
   * Public-facing variant of [`IntegrationConfig`]. Mirrors every variant shape on
   * the wire EXCEPT `DigitalFiles`, which is replaced with a hydrated
   * `digital_files` object (resolved download URLs etc.). The persisted JSONB stays
   * ID-only via [`IntegrationConfig`]; this enum is response-only.
   */
  integration_config:
    | EntitlementListResponse.GitHubConfig
    | EntitlementListResponse.DiscordConfig
    | EntitlementListResponse.TelegramConfig
    | EntitlementListResponse.FigmaConfig
    | EntitlementListResponse.FramerConfig
    | EntitlementListResponse.NotionConfig
    | EntitlementListResponse.DigitalFilesConfig
    | EntitlementListResponse.LicenseKeyConfig;

  integration_type:
    | 'discord'
    | 'telegram'
    | 'github'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'digital_files'
    | 'license_key';

  is_active: boolean;

  name: string;

  updated_at: string;

  description?: string | null;

  metadata?: unknown;
}

export namespace EntitlementListResponse {
  export interface GitHubConfig {
    permission: string;

    target_id: string;
  }

  export interface DiscordConfig {
    guild_id: string;

    role_id?: string | null;
  }

  export interface TelegramConfig {
    chat_id: string;
  }

  export interface FigmaConfig {
    figma_file_id: string;
  }

  export interface FramerConfig {
    framer_template_id: string;
  }

  export interface NotionConfig {
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    digital_files: DigitalFilesConfig.DigitalFiles;
  }

  export namespace DigitalFilesConfig {
    /**
     * Populated digital-files payload for entitlement read surfaces. Mirrors
     * `DigitalProductDelivery` but is sourced from an entitlement's
     * `integration_config` (not a grant) and tags each file with its origin (`legacy`
     * vs `ee`).
     */
    export interface DigitalFiles {
      files: Array<DigitalFiles.File>;

      external_url?: string | null;

      instructions?: string | null;
    }

    export namespace DigitalFiles {
      export interface File {
        download_url: string;

        /**
         * Seconds until `download_url` expires.
         */
        expires_in: number;

        file_id: string;

        filename: string;

        /**
         * `"legacy"` for files in `product_files`, `"ee"` for files managed by the
         * Entitlements Engine.
         */
        source: string;

        content_type?: string | null;

        file_size?: number | null;
      }
    }
  }

  export interface LicenseKeyConfig {
    activation_message?: string | null;

    activations_limit?: number | null;

    duration_count?: number | null;

    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

export interface EntitlementCreateParams {
  /**
   * Platform-specific configuration (validated per integration_type)
   */
  integration_config:
    | EntitlementCreateParams.GitHubConfig
    | EntitlementCreateParams.DiscordConfig
    | EntitlementCreateParams.TelegramConfig
    | EntitlementCreateParams.FigmaConfig
    | EntitlementCreateParams.FramerConfig
    | EntitlementCreateParams.NotionConfig
    | EntitlementCreateParams.DigitalFilesConfig
    | EntitlementCreateParams.LicenseKeyConfig;

  /**
   * Which platform integration this entitlement uses
   */
  integration_type:
    | 'discord'
    | 'telegram'
    | 'github'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'digital_files'
    | 'license_key';

  /**
   * Display name for this entitlement
   */
  name: string;

  /**
   * Optional description
   */
  description?: string | null;

  /**
   * Optional user-facing metadata
   */
  metadata?: { [key: string]: string } | null;
}

export namespace EntitlementCreateParams {
  export interface GitHubConfig {
    /**
     * One of: pull, push, admin, maintain, triage
     */
    permission: string;

    target_id: string;
  }

  export interface DiscordConfig {
    guild_id: string;

    role_id?: string | null;
  }

  export interface TelegramConfig {
    chat_id: string;
  }

  export interface FigmaConfig {
    figma_file_id: string;
  }

  export interface FramerConfig {
    framer_template_id: string;
  }

  export interface NotionConfig {
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    digital_file_ids: Array<string>;

    external_url?: string | null;

    instructions?: string | null;

    /**
     * Three-way patchable field (mirrors the credit_entitlements pattern):
     *
     * - omitted → preserve persisted (`None`)
     * - `null` → clear (`Some(None)`)
     * - `[...]` → replace (`Some(Some(...))`)
     *
     * On Create / storage we collapse "clear" and empty-array to `None` so the
     * persisted JSONB never carries a `null` legacy_file_ids key.
     */
    legacy_file_ids?: Array<string> | null;
  }

  export interface LicenseKeyConfig {
    activation_message?: string | null;

    activations_limit?: number | null;

    duration_count?: number | null;

    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

export interface EntitlementUpdateParams {
  description?: string | null;

  /**
   * Platform-specific configuration for an entitlement. Each variant uses unique
   * field names so `#[serde(untagged)]` can disambiguate correctly.
   */
  integration_config?:
    | EntitlementUpdateParams.GitHubConfig
    | EntitlementUpdateParams.DiscordConfig
    | EntitlementUpdateParams.TelegramConfig
    | EntitlementUpdateParams.FigmaConfig
    | EntitlementUpdateParams.FramerConfig
    | EntitlementUpdateParams.NotionConfig
    | EntitlementUpdateParams.DigitalFilesConfig
    | EntitlementUpdateParams.LicenseKeyConfig
    | null;

  metadata?: { [key: string]: string } | null;

  name?: string | null;
}

export namespace EntitlementUpdateParams {
  export interface GitHubConfig {
    /**
     * One of: pull, push, admin, maintain, triage
     */
    permission: string;

    target_id: string;
  }

  export interface DiscordConfig {
    guild_id: string;

    role_id?: string | null;
  }

  export interface TelegramConfig {
    chat_id: string;
  }

  export interface FigmaConfig {
    figma_file_id: string;
  }

  export interface FramerConfig {
    framer_template_id: string;
  }

  export interface NotionConfig {
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    digital_file_ids: Array<string>;

    external_url?: string | null;

    instructions?: string | null;

    /**
     * Three-way patchable field (mirrors the credit_entitlements pattern):
     *
     * - omitted → preserve persisted (`None`)
     * - `null` → clear (`Some(None)`)
     * - `[...]` → replace (`Some(Some(...))`)
     *
     * On Create / storage we collapse "clear" and empty-array to `None` so the
     * persisted JSONB never carries a `null` legacy_file_ids key.
     */
    legacy_file_ids?: Array<string> | null;
  }

  export interface LicenseKeyConfig {
    activation_message?: string | null;

    activations_limit?: number | null;

    duration_count?: number | null;

    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

export interface EntitlementListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter by integration type
   */
  integration_type?:
    | 'discord'
    | 'telegram'
    | 'github'
    | 'figma'
    | 'framer'
    | 'notion'
    | 'digital_files'
    | 'license_key';
}

Entitlements.Files = Files;
Entitlements.Grants = Grants;

export declare namespace Entitlements {
  export {
    type EntitlementCreateResponse as EntitlementCreateResponse,
    type EntitlementRetrieveResponse as EntitlementRetrieveResponse,
    type EntitlementUpdateResponse as EntitlementUpdateResponse,
    type EntitlementListResponse as EntitlementListResponse,
    type EntitlementListResponsesDefaultPageNumberPagination as EntitlementListResponsesDefaultPageNumberPagination,
    type EntitlementCreateParams as EntitlementCreateParams,
    type EntitlementUpdateParams as EntitlementUpdateParams,
    type EntitlementListParams as EntitlementListParams,
  };

  export {
    Files as Files,
    type FileUploadResponse as FileUploadResponse,
    type FileDeleteParams as FileDeleteParams,
  };

  export {
    Grants as Grants,
    type GrantListResponse as GrantListResponse,
    type GrantRevokeResponse as GrantRevokeResponse,
    type GrantListResponsesDefaultPageNumberPagination as GrantListResponsesDefaultPageNumberPagination,
    type GrantListParams as GrantListParams,
    type GrantRevokeParams as GrantRevokeParams,
  };
}
