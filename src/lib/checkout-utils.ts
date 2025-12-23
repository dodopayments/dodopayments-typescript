/**
 * Utility functions for working with Dodo Payments checkout sessions,
 * specifically for handling language settings in iframe overlays.
 */

/**
 * Ensures a checkout URL includes the language parameter.
 * This is particularly important for Chromium-based browsers (Chrome, Brave, Edge)
 * which block third-party cookies and localStorage in iframes.
 *
 * @param checkoutUrl - The checkout URL returned from the API
 * @param language - The desired language code (e.g., 'en', 'de', 'es', 'fr')
 * @returns The checkout URL with the language parameter included
 *
 * @example
 * ```typescript
 * const session = await client.checkoutSessions.create({
 *   product_cart: [{ product_id: 'prod_123', quantity: 1 }],
 *   customization: {
 *     force_language: 'de'
 *   }
 * });
 *
 * // Ensure the language is in the URL for iframe compatibility
 * const urlWithLang = ensureLanguageInUrl(session.checkout_url, 'de');
 *
 * // Now safe to use in iframe overlay
 * DodoPayment.Checkout.open({ checkoutUrl: urlWithLang });
 * ```
 */
export function ensureLanguageInUrl(checkoutUrl: string, language: string): string {
  try {
    const url = new URL(checkoutUrl);
    
    // Check if language is already in the URL
    if (!url.searchParams.has('lang') && !url.searchParams.has('language')) {
      url.searchParams.set('lang', language);
    }
    
    return url.toString();
  } catch (error) {
    // If URL parsing fails, return the original URL
    console.warn('Failed to parse checkout URL:', error);
    return checkoutUrl;
  }
}

/**
 * Extracts the language parameter from a checkout URL if present.
 *
 * @param checkoutUrl - The checkout URL to check
 * @returns The language code if found, or null if not present
 *
 * @example
 * ```typescript
 * const lang = getLanguageFromUrl('https://checkout.dodo.com/...?lang=de');
 * console.log(lang); // 'de'
 * ```
 */
export function getLanguageFromUrl(checkoutUrl: string): string | null {
  try {
    const url = new URL(checkoutUrl);
    return url.searchParams.get('lang') || url.searchParams.get('language');
  } catch (error) {
    return null;
  }
}

/**
 * Type guard to check if customization includes force_language
 */
export function hasForceLanguage(
  customization: any
): customization is { force_language: string } {
  return Boolean(
    customization &&
    typeof customization === 'object' &&
    typeof customization.force_language === 'string' &&
    customization.force_language.length > 0
  );
}
