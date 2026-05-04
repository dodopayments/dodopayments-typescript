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

/**
 * Detailed view of a single entitlement: identity, integration type,
 * integration-specific configuration, and metadata.
 */
export interface Entitlement {
  /**
   * Unique identifier of the entitlement.
   */
  id: string;

  /**
   * Identifier of the business that owns this entitlement.
   */
  business_id: string;

  /**
   * Timestamp when the entitlement was created.
   */
  created_at: string;

  /**
   * Integration-specific configuration. For `digital_files` entitlements this
   * includes presigned download URLs for each attached file.
   */
  integration_config: IntegrationConfigResponse;

  /**
   * Platform integration this entitlement uses.
   */
  integration_type: EntitlementIntegrationType;

  /**
   * Always `true` for entitlements returned by the public API; soft-deleted
   * entitlements are not returned.
   */
  is_active: boolean;

  /**
   * Arbitrary key-value metadata supplied at creation or via PATCH.
   */
  metadata: { [key: string]: string };

  /**
   * Display name supplied at creation.
   */
  name: string;

  /**
   * Timestamp when the entitlement was last modified.
   */
  updated_at: string;

  /**
   * Optional description supplied at creation.
   */
  description?: string | null;
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
 * Integration-specific configuration supplied when creating or updating an
 * entitlement. The shape required matches the entitlement's `integration_type`.
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
     * Permission to grant on the repository.
     */
    permission: 'pull' | 'push' | 'admin' | 'maintain' | 'triage';

    /**
     * Repository or organisation slug to grant access to.
     */
    target_id: string;
  }

  export interface DiscordConfig {
    /**
     * Discord guild (server) ID.
     */
    guild_id: string;

    /**
     * Optional Discord role to assign within the guild.
     */
    role_id?: string | null;
  }

  export interface TelegramConfig {
    /**
     * Telegram chat ID. For groups this is typically a negative integer.
     */
    chat_id: string;
  }

  export interface FigmaConfig {
    /**
     * Figma file identifier to grant access to.
     */
    figma_file_id: string;
  }

  export interface FramerConfig {
    /**
     * Framer template identifier to grant access to.
     */
    framer_template_id: string;
  }

  export interface NotionConfig {
    /**
     * Notion template identifier to grant access to.
     */
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    /**
     * Files attached to this entitlement. Add files via
     * `POST /entitlements/{id}/files` and remove them via
     * `DELETE /entitlements/{id}/files/{file_id}`.
     */
    digital_file_ids: Array<string>;

    /**
     * Optional external URL shown to the customer alongside the files.
     */
    external_url?: string | null;

    /**
     * Optional human-readable delivery instructions shown to the customer alongside
     * the files.
     */
    instructions?: string | null;

    /**
     * Three-way patchable list of legacy file identifiers:
     *
     * - omitted → preserve the current value
     * - `null` → clear
     * - `[...]` → replace
     *
     * On create, an omitted field, an explicit `null`, or an empty array all result in
     * no legacy files attached.
     */
    legacy_file_ids?: Array<string> | null;
  }

  export interface LicenseKeyConfig {
    /**
     * Optional message displayed when a customer activates the license key (≤ 2500
     * characters).
     */
    activation_message?: string | null;

    /**
     * Maximum activations allowed per issued license key. Omit for unlimited.
     */
    activations_limit?: number | null;

    /**
     * Validity duration of issued license keys. Provide both `duration_count` and
     * `duration_interval` together for a fixed duration; omit both for non-expiring
     * keys.
     */
    duration_count?: number | null;

    /**
     * Unit of `duration_count`.
     */
    duration_interval?: SubscriptionsAPI.TimeInterval | null;
  }
}

/**
 * Integration-specific configuration on an entitlement read response.
 *
 * For `digital_files` entitlements the response includes presigned download URLs
 * for each attached file; other integrations match the shape supplied at creation.
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
    /**
     * Permission to grant on the repository.
     */
    permission: 'pull' | 'push' | 'admin' | 'maintain' | 'triage';

    /**
     * Repository or organisation slug to grant access to.
     */
    target_id: string;
  }

  export interface DiscordConfig {
    /**
     * Discord guild (server) ID.
     */
    guild_id: string;

    /**
     * Optional Discord role to assign within the guild.
     */
    role_id?: string | null;
  }

  export interface TelegramConfig {
    /**
     * Telegram chat ID. For groups this is typically a negative integer.
     */
    chat_id: string;
  }

  export interface FigmaConfig {
    /**
     * Figma file identifier to grant access to.
     */
    figma_file_id: string;
  }

  export interface FramerConfig {
    /**
     * Framer template identifier to grant access to.
     */
    framer_template_id: string;
  }

  export interface NotionConfig {
    /**
     * Notion template identifier to grant access to.
     */
    notion_template_id: string;
  }

  export interface DigitalFilesConfig {
    /**
     * Populated digital-files payload with each file's metadata and a short-lived
     * presigned download URL.
     */
    digital_files: DigitalFilesConfig.DigitalFiles;
  }

  export namespace DigitalFilesConfig {
    /**
     * Populated digital-files payload with each file's metadata and a short-lived
     * presigned download URL.
     */
    export interface DigitalFiles {
      /**
       * One entry per attached file.
       */
      files: Array<DigitalFiles.File>;

      /**
       * Optional external URL, passed through from the entitlement configuration.
       */
      external_url?: string | null;

      /**
       * Optional human-readable delivery instructions, passed through from the
       * entitlement configuration.
       */
      instructions?: string | null;
    }

    export namespace DigitalFiles {
      /**
       * One file in a resolved digital-files payload.
       */
      export interface File {
        /**
         * Short-lived presigned URL for downloading the file.
         */
        download_url: string;

        /**
         * Seconds until `download_url` expires.
         */
        expires_in: number;

        /**
         * Identifier of the attached file.
         */
        file_id: string;

        /**
         * Original filename of the attached file.
         */
        filename: string;

        /**
         * Optional content-type declared at upload.
         */
        content_type?: string | null;

        /**
         * Optional size of the file in bytes.
         */
        file_size?: number | null;
      }
    }
  }

  export interface LicenseKeyConfig {
    /**
     * Optional message displayed when a customer activates the license key (≤ 2500
     * characters).
     */
    activation_message?: string | null;

    /**
     * Maximum activations allowed per issued license key. Omit for unlimited.
     */
    activations_limit?: number | null;

    /**
     * Validity duration of issued license keys. Provide both `duration_count` and
     * `duration_interval` together for a fixed duration; omit both for non-expiring
     * keys.
     */
    duration_count?: number | null;

    /**
     * Unit of `duration_count`.
     */
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
   * Additional metadata for the entitlement
   */
  metadata?: { [key: string]: string };
}

export interface EntitlementUpdateParams {
  description?: string | null;

  /**
   * Integration-specific configuration supplied when creating or updating an
   * entitlement. The shape required matches the entitlement's `integration_type`.
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
