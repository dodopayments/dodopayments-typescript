// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Moderation extends APIResource {
  /**
   * Screens text, an image, or both, and returns a verdict: `allow`, `flag` or
   * `deny`. The API is fail-closed: do not generate when you get no verdict.
   *
   * **Pricing.** Dodo Payments charges $0.30 per 1000 billable screens and debits
   * the fee from your balance. A billable screen is a live-mode screen that returns
   * a verdict. Errors and test-mode screens are free.
   *
   * **429.** Honour `Retry-After` and retry. A 429 is a throughput limit, not a
   * verdict.
   *
   * **Test mode** returns mock verdicts and never calls the model. The default
   * verdict is `allow`. Put one of these strings in `text` to select another
   * outcome: `dodo_mock_flag` (`flag`), `dodo_mock_deny` (`deny`),
   * `dodo_mock_overloaded` (429) or `dodo_mock_not_ready` (503).
   */
  screen(body: ModerationScreenParams, options?: RequestOptions): APIPromise<ModerationScreenResponse> {
    return this._client.post('/moderation/screen', { body, ...options });
  }

  /**
   * Shows how many billable screens you made and how close you are to your next
   * charge.
   *
   * **Billing.** A billable screen is a live-mode screen that returns a verdict.
   * Dodo Payments charges $0.30 for each full block of 1000 billable screens and
   * debits the fee from your balance. Each full block is charged within one hour.
   * Screens that do not fill a block stay unbilled until they do. Errors and
   * test-mode screens are free and are not counted.
   */
  retrieveUsage(options?: RequestOptions): APIPromise<ModerationRetrieveUsageResponse> {
    return this._client.get('/moderation/usage', options);
  }
}

/**
 * A moderation category.
 */
export type ModerationCategory =
  | 'violent_crimes'
  | 'sex_related_crimes'
  | 'child_sexual_exploitation'
  | 'suicide_and_self_harm'
  | 'indiscriminate_weapons'
  | 'intellectual_property'
  | 'defamation'
  | 'non_violent_crimes'
  | 'hate'
  | 'privacy'
  | 'specialized_advice'
  | 'sexual_content'
  | 'non_consensual_intimate_imagery'
  | 'minor_coded_language'
  | 'real_person_likeness'
  | 'living_artist_style'
  | 'prompt_injection';

/**
 * How each score in `categories` was measured.
 */
export interface ModerationCategoryProvenance {
  /**
   * Child sexual exploitation.
   */
  child_sexual_exploitation: ModerationProvenance;

  /**
   * False depiction that is likely to injure the reputation of a real person.
   */
  defamation: ModerationProvenance;

  /**
   * Demeaning people because of a protected characteristic.
   */
  hate: ModerationProvenance;

  /**
   * Chemical, biological, radiological, nuclear or explosive weapons.
   */
  indiscriminate_weapons: ModerationProvenance;

  /**
   * Copyright or trademark infringement.
   */
  intellectual_property: ModerationProvenance;

  /**
   * Imitation of the signature style of a specific living artist.
   */
  living_artist_style: ModerationProvenance;

  /**
   * Age-coded language that suggests the subject is a minor.
   */
  minor_coded_language: ModerationProvenance;

  /**
   * Non-consensual intimate imagery: undressing, nudifying or sexualising a real
   * person.
   */
  non_consensual_intimate_imagery: ModerationProvenance;

  /**
   * Non-violent crimes.
   */
  non_violent_crimes: ModerationProvenance;

  /**
   * Sensitive private information about a person.
   */
  privacy: ModerationProvenance;

  /**
   * An attempt to override or manipulate the instructions of the system.
   */
  prompt_injection: ModerationProvenance;

  /**
   * The likeness of a real, identifiable, named person.
   */
  real_person_likeness: ModerationProvenance;

  /**
   * Sex-related crimes.
   */
  sex_related_crimes: ModerationProvenance;

  /**
   * Sexually explicit or pornographic content.
   */
  sexual_content: ModerationProvenance;

  /**
   * Unqualified financial, medical, legal or electoral advice.
   */
  specialized_advice: ModerationProvenance;

  /**
   * Suicide and self-harm.
   */
  suicide_and_self_harm: ModerationProvenance;

  /**
   * Violent crimes.
   */
  violent_crimes: ModerationProvenance;
}

/**
 * The probability, from 0 to 1, that the screen falls in each category.
 */
export interface ModerationCategoryScores {
  /**
   * Child sexual exploitation.
   */
  child_sexual_exploitation: number;

  /**
   * False depiction that is likely to injure the reputation of a real person.
   */
  defamation: number;

  /**
   * Demeaning people because of a protected characteristic.
   */
  hate: number;

  /**
   * Chemical, biological, radiological, nuclear or explosive weapons.
   */
  indiscriminate_weapons: number;

  /**
   * Copyright or trademark infringement.
   */
  intellectual_property: number;

  /**
   * Imitation of the signature style of a specific living artist.
   */
  living_artist_style: number;

  /**
   * Age-coded language that suggests the subject is a minor.
   */
  minor_coded_language: number;

  /**
   * Non-consensual intimate imagery: undressing, nudifying or sexualising a real
   * person.
   */
  non_consensual_intimate_imagery: number;

  /**
   * Non-violent crimes.
   */
  non_violent_crimes: number;

  /**
   * Sensitive private information about a person.
   */
  privacy: number;

  /**
   * An attempt to override or manipulate the instructions of the system.
   */
  prompt_injection: number;

  /**
   * The likeness of a real, identifiable, named person.
   */
  real_person_likeness: number;

  /**
   * Sex-related crimes.
   */
  sex_related_crimes: number;

  /**
   * Sexually explicit or pornographic content.
   */
  sexual_content: number;

  /**
   * Unqualified financial, medical, legal or electoral advice.
   */
  specialized_advice: number;

  /**
   * Suicide and self-harm.
   */
  suicide_and_self_harm: number;

  /**
   * Violent crimes.
   */
  violent_crimes: number;
}

/**
 * The verdict. `allow` means the content passed. `deny` means block the content.
 * `flag` means apply your own judgement. It is not a soft deny.
 */
export type ModerationDecision = 'allow' | 'flag' | 'deny';

/**
 * How a score was measured. `targeted` means a check for that one category
 * measured it. `broad` means the general check that covers all categories measured
 * it.
 */
export type ModerationProvenance = 'targeted' | 'broad';

/**
 * Your moderation usage.
 */
export interface ModerationRetrieveUsageResponse {
  /**
   * Your billable screens per UTC day for the last 30 days, charged or not. A day
   * with no screens is not in the list.
   */
  daily: Array<ModerationRetrieveUsageResponse.Daily>;

  /**
   * Billable screens still needed to fill the next block of 1000. A full block is
   * charged within one hour, so this value is 1000 when your unbilled screens fill
   * whole blocks.
   */
  screens_to_next_block: number;

  /**
   * Billable screens that Dodo Payments has not charged for yet.
   */
  unbilled_screens: number;
}

export namespace ModerationRetrieveUsageResponse {
  export interface Daily {
    /**
     * The UTC day.
     */
    date: string;

    /**
     * Billable screens on that day.
     */
    screens: number;
  }
}

/**
 * The verdict of one screen.
 */
export interface ModerationScreenResponse {
  /**
   * The probability, from 0 to 1, that the screen falls in each category.
   */
  categories: ModerationCategoryScores;

  /**
   * True when real-person likeness and sexual content together crossed their
   * combined threshold, the pattern of a sexual deepfake.
   */
  compound_triggered: boolean;

  /**
   * The verdict. `allow` means the content passed. `deny` means block the content.
   * `flag` means apply your own judgement. It is not a soft deny.
   */
  decision: ModerationDecision;

  /**
   * The time the screen took, in milliseconds.
   */
  latency_ms: number;

  /**
   * True when the text was also screened in a normalized form, with obfuscation such
   * as invisible or look-alike characters removed.
   */
  normalized_applied: boolean;

  /**
   * Human-readable reasons for the decision. The wording can change, so do not parse
   * it.
   */
  notes: Array<string>;

  /**
   * The number of yes/no questions the model answered for this screen.
   */
  passes: number;

  /**
   * How each score in `categories` was measured.
   */
  provenance: ModerationCategoryProvenance;

  /**
   * The `request_id` you sent, or null.
   */
  request_id: string | null;

  /**
   * The categories whose score crossed the threshold of the category. It can be
   * empty on a `flag` from the general check. `notes` then gives the reason.
   */
  triggered: Array<ModerationCategory>;
}

export interface ModerationScreenParams {
  /**
   * The image to screen, as base64, with or without a `data:image/...;base64,`
   * prefix. The formats are JPEG, PNG, WebP, GIF and BMP. The limit is 6991530
   * base64 characters, and the decoded image must be at most 5 MiB.
   */
  image?: string | null;

  /**
   * Your identifier for this screen, up to 128 characters, with no control
   * characters. The response returns it in `request_id`.
   */
  request_id?: string | null;

  /**
   * The text to screen, up to 8000 characters.
   */
  text?: string | null;
}

export declare namespace Moderation {
  export {
    type ModerationCategory as ModerationCategory,
    type ModerationCategoryProvenance as ModerationCategoryProvenance,
    type ModerationCategoryScores as ModerationCategoryScores,
    type ModerationDecision as ModerationDecision,
    type ModerationProvenance as ModerationProvenance,
    type ModerationRetrieveUsageResponse as ModerationRetrieveUsageResponse,
    type ModerationScreenResponse as ModerationScreenResponse,
    type ModerationScreenParams as ModerationScreenParams,
  };
}
