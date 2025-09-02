// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { DefaultPageNumberPagination, type DefaultPageNumberPaginationParams } from '../pagination';

export class UsageEvents extends APIResource {
  /**
   * Fetch detailed information about a single event using its unique event ID. This
   * endpoint is useful for:
   *
   * - Debugging specific event ingestion issues
   * - Retrieving event details for customer support
   * - Validating that events were processed correctly
   * - Getting the complete metadata for an event
   *
   * ## Event ID Format:
   *
   * The event ID should be the same value that was provided during event ingestion
   * via the `/events/ingest` endpoint. Event IDs are case-sensitive and must match
   * exactly.
   *
   * ## Response Details:
   *
   * The response includes all event data including:
   *
   * - Complete metadata key-value pairs
   * - Original timestamp (preserved from ingestion)
   * - Customer and business association
   * - Event name and processing information
   *
   * ## Example Usage:
   *
   * ```text
   * GET /events/api_call_12345
   * ```
   */
  retrieve(eventId: string, options?: Core.RequestOptions): Core.APIPromise<Event> {
    return this._client.get(`/events/${eventId}`, options);
  }

  /**
   * Fetch events from your account with powerful filtering capabilities. This
   * endpoint is ideal for:
   *
   * - Debugging event ingestion issues
   * - Analyzing customer usage patterns
   * - Building custom analytics dashboards
   * - Auditing billing-related events
   *
   * ## Filtering Options:
   *
   * - **Customer filtering**: Filter by specific customer ID
   * - **Event name filtering**: Filter by event type/name
   * - **Meter-based filtering**: Use a meter ID to apply the meter's event name and
   *   filter criteria automatically
   * - **Time range filtering**: Filter events within a specific date range
   * - **Pagination**: Navigate through large result sets
   *
   * ## Meter Integration:
   *
   * When using `meter_id`, the endpoint automatically applies:
   *
   * - The meter's configured `event_name` filter
   * - The meter's custom filter criteria (if any)
   * - If you also provide `event_name`, it must match the meter's event name
   *
   * ## Example Queries:
   *
   * - Get all events for a customer: `?customer_id=cus_abc123`
   * - Get API request events: `?event_name=api_request`
   * - Get events from last 24 hours:
   *   `?start=2024-01-14T10:30:00Z&end=2024-01-15T10:30:00Z`
   * - Get events with meter filtering: `?meter_id=mtr_xyz789`
   * - Paginate results: `?page_size=50&page_number=2`
   */
  list(
    query?: UsageEventListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventsDefaultPageNumberPagination, Event>;
  list(options?: Core.RequestOptions): Core.PagePromise<EventsDefaultPageNumberPagination, Event>;
  list(
    query: UsageEventListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<EventsDefaultPageNumberPagination, Event> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/events', EventsDefaultPageNumberPagination, { query, ...options });
  }

  /**
   * This endpoint allows you to ingest custom events that can be used for:
   *
   * - Usage-based billing and metering
   * - Analytics and reporting
   * - Customer behavior tracking
   *
   * ## Important Notes:
   *
   * - **Duplicate Prevention**:
   *   - Duplicate `event_id` values within the same request are rejected (entire
   *     request fails)
   *   - Subsequent requests with existing `event_id` values are ignored (idempotent
   *     behavior)
   * - **Rate Limiting**: Maximum 1000 events per request
   * - **Time Validation**: Events with timestamps older than 1 hour or more than 5
   *   minutes in the future will be rejected
   * - **Metadata Limits**: Maximum 50 key-value pairs per event, keys max 100 chars,
   *   values max 500 chars
   *
   * ## Example Usage:
   *
   * ```json
   * {
   *   "events": [
   *     {
   *       "event_id": "api_call_12345",
   *       "customer_id": "cus_abc123",
   *       "event_name": "api_request",
   *       "timestamp": "2024-01-15T10:30:00Z",
   *       "metadata": {
   *         "endpoint": "/api/v1/users",
   *         "method": "GET",
   *         "tokens_used": "150"
   *       }
   *     }
   *   ]
   * }
   * ```
   */
  ingest(
    body: UsageEventIngestParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<UsageEventIngestResponse> {
    return this._client.post('/events/ingest', { body, ...options });
  }
}

export class EventsDefaultPageNumberPagination extends DefaultPageNumberPagination<Event> {}

export interface Event {
  business_id: string;

  customer_id: string;

  event_id: string;

  event_name: string;

  timestamp: string;

  /**
   * Arbitrary key-value metadata. Values can be string, integer, number, or boolean.
   */
  metadata?: { [key: string]: string | number | boolean } | null;
}

export interface EventInput {
  /**
   * customer_id of the customer whose usage needs to be tracked
   */
  customer_id: string;

  /**
   * Event Id acts as an idempotency key. Any subsequent requests with the same
   * event_id will be ignored
   */
  event_id: string;

  /**
   * Name of the event
   */
  event_name: string;

  /**
   * Custom metadata. Only key value pairs are accepted, objects or arrays submitted
   * will be rejected.
   */
  metadata?: { [key: string]: string | number | boolean } | null;

  /**
   * Custom Timestamp. Defaults to current timestamp in UTC. Timestamps that are
   * older that 1 hour or after 5 mins, from current timestamp, will be rejected.
   */
  timestamp?: string | null;
}

export interface UsageEventIngestResponse {
  ingested_count: number;
}

export interface UsageEventListParams extends DefaultPageNumberPaginationParams {
  /**
   * Filter events by customer ID
   */
  customer_id?: string;

  /**
   * Filter events created before this timestamp
   */
  end?: string;

  /**
   * Filter events by event name. If both event_name and meter_id are provided, they
   * must match the meter's configured event_name
   */
  event_name?: string;

  /**
   * Filter events by meter ID. When provided, only events that match the meter's
   * event_name and filter criteria will be returned
   */
  meter_id?: string;

  /**
   * Filter events created after this timestamp
   */
  start?: string;
}

export interface UsageEventIngestParams {
  /**
   * List of events to be pushed
   */
  events: Array<EventInput>;
}

UsageEvents.EventsDefaultPageNumberPagination = EventsDefaultPageNumberPagination;

export declare namespace UsageEvents {
  export {
    type Event as Event,
    type EventInput as EventInput,
    type UsageEventIngestResponse as UsageEventIngestResponse,
    EventsDefaultPageNumberPagination as EventsDefaultPageNumberPagination,
    type UsageEventListParams as UsageEventListParams,
    type UsageEventIngestParams as UsageEventIngestParams,
  };
}
