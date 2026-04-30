// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SubscriptionsAPI from '../subscriptions';
import * as FilesAPI from './files';
import { FileDeleteParams, FileUploadResponse, Files } from './files';
import * as GrantsAPI from './grants';
import {
  EntitlementGrant,
  EntitlementGrantsDefaultPageNumberPagination,
  GrantListParams,
  GrantRevokeParams,
  Grants,
  LicenseKeyGrant,
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
  create(body: EntitlementCreateParams, options?: RequestOptions): APIPromise<Entitlement> {
    return this._client.post('/entitlements', { body, ...options });
  }

  /**
   * GET /entitlements/{id}
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Entitlement> {
    return this._client.get(path`/entitlements/${id}`, options);
  }

  /**
   * PATCH /entitlements/{id}
   */
  update(id: string, body: EntitlementUpdateParams, options?: RequestOptions): APIPromise<Entitlement> {
    return this._client.patch(path`/entitlements/${id}`, { body, ...options });
  }

  /**
   * GET /entitlements
   */
  list(
    query: EntitlementListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<EntitlementsDefaultPageNumberPagination, Entitlement> {
    return this._client.getAPIList('/entitlements', DefaultPageNumberPagination<Entitlement>, {
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

export type EntitlementsDefaultPageNumberPagination = DefaultPageNumberPagination<Entitlement>;

export interface Entitlement {
  id: string;

  business_id: string;

  created_at: string;

  /**
   * Public-facing variant of [`IntegrationConfig`]. Mirrors every variant shape on
   * the wire EXCEPT `DigitalFiles`, which is replaced with a hydrated
   * `digital_files` object (resolved download URLs etc.). The persisted JSONB stays
   * ID-only via [`IntegrationConfig`]; this enum is response-only.
   */
  integration_config: IntegrationConfigResponse;

  integration_type: EntitlementIntegrationType;

  is_active: boolean;

  name: string;

  updated_at: string;

  description?: string | null;

  metadata?: unknown;
}

export type EntitlementIntegrationType =
  | 'discord'
  | 'telegram'
  | 'github'
  | 'figma'
  | 'framer'
  | 'notion'
  | 'digital_files'
  | 'license_key';

/**
 * Platform-specific configuration for an entitlement. Each variant uses unique
 * field names so `#[serde(untagged)]` can disambiguate correctly.
 */
export type IntegrationConfig =
  | IntegrationConfig.GitHubConfig
  | IntegrationConfig.DiscordConfig
  | IntegrationConfig.TelegramConfig
  | IntegrationConfig.FigmaConfig
  | IntegrationConfig.FramerConfig
  | IntegrationConfig.NotionConfig
  | IntegrationConfig.DigitalFilesConfig
  | IntegrationConfig.LicenseKeyConfig;

export namespace IntegrationConfig {
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

/**
 * Public-facing variant of [`IntegrationConfig`]. Mirrors every variant shape on
 * the wire EXCEPT `DigitalFiles`, which is replaced with a hydrated
 * `digital_files` object (resolved download URLs etc.). The persisted JSONB stays
 * ID-only via [`IntegrationConfig`]; this enum is response-only.
 */
export type IntegrationConfigResponse =
  | IntegrationConfigResponse.GitHubConfig
  | IntegrationConfigResponse.DiscordConfig
  | IntegrationConfigResponse.TelegramConfig
  | IntegrationConfigResponse.FigmaConfig
  | IntegrationConfigResponse.FramerConfig
  | IntegrationConfigResponse.NotionConfig
  | IntegrationConfigResponse.DigitalFilesConfig
  | IntegrationConfigResponse.LicenseKeyConfig;

export namespace IntegrationConfigResponse {
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
  integration_config: IntegrationConfig;

  /**
   * Which platform integration this entitlement uses
   */
  integration_type: EntitlementIntegrationType;

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

export interface EntitlementUpdateParams {
  description?: string | null;

  /**
   * Platform-specific configuration for an entitlement. Each variant uses unique
   * field names so `#[serde(untagged)]` can disambiguate correctly.
   */
  integration_config?: IntegrationConfig | null;

  metadata?: { [key: string]: string } | null;

  name?: string | null;
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
    type Entitlement as Entitlement,
    type EntitlementIntegrationType as EntitlementIntegrationType,
    type IntegrationConfig as IntegrationConfig,
    type IntegrationConfigResponse as IntegrationConfigResponse,
    type EntitlementsDefaultPageNumberPagination as EntitlementsDefaultPageNumberPagination,
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
    type EntitlementGrant as EntitlementGrant,
    type LicenseKeyGrant as LicenseKeyGrant,
    type EntitlementGrantsDefaultPageNumberPagination as EntitlementGrantsDefaultPageNumberPagination,
    type GrantListParams as GrantListParams,
    type GrantRevokeParams as GrantRevokeParams,
  };
}
