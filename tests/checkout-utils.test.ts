import { ensureLanguageInUrl, getLanguageFromUrl, hasForceLanguage } from '../src/lib/checkout-utils';

describe('Checkout Utils', () => {
  describe('ensureLanguageInUrl', () => {
    it('should add language parameter if not present', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123';
      const result = ensureLanguageInUrl(url, 'de');
      expect(result).toBe('https://checkout.dodopayments.com/session/abc123?lang=de');
    });

    it('should not add language parameter if already present as lang', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?lang=en';
      const result = ensureLanguageInUrl(url, 'de');
      expect(result).toBe('https://checkout.dodopayments.com/session/abc123?lang=en');
    });

    it('should not add language parameter if already present as language', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?language=fr';
      const result = ensureLanguageInUrl(url, 'de');
      expect(result).toBe('https://checkout.dodopayments.com/session/abc123?language=fr');
    });

    it('should preserve existing query parameters', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?theme=dark&return=true';
      const result = ensureLanguageInUrl(url, 'es');
      const resultUrl = new URL(result);
      expect(resultUrl.searchParams.get('theme')).toBe('dark');
      expect(resultUrl.searchParams.get('return')).toBe('true');
      expect(resultUrl.searchParams.get('lang')).toBe('es');
    });

    it('should handle invalid URLs gracefully', () => {
      const invalidUrl = 'not-a-valid-url';
      const result = ensureLanguageInUrl(invalidUrl, 'de');
      expect(result).toBe(invalidUrl);
    });

    it('should handle URLs with fragments', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123#section';
      const result = ensureLanguageInUrl(url, 'de');
      expect(result).toContain('lang=de');
      expect(result).toContain('#section');
    });
  });

  describe('getLanguageFromUrl', () => {
    it('should extract language from lang parameter', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?lang=de';
      const result = getLanguageFromUrl(url);
      expect(result).toBe('de');
    });

    it('should extract language from language parameter', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?language=fr';
      const result = getLanguageFromUrl(url);
      expect(result).toBe('fr');
    });

    it('should prioritize lang over language parameter', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?lang=de&language=fr';
      const result = getLanguageFromUrl(url);
      expect(result).toBe('de');
    });

    it('should return null if no language parameter present', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123';
      const result = getLanguageFromUrl(url);
      expect(result).toBeNull();
    });

    it('should handle invalid URLs gracefully', () => {
      const invalidUrl = 'not-a-valid-url';
      const result = getLanguageFromUrl(invalidUrl);
      expect(result).toBeNull();
    });

    it('should handle empty string parameter', () => {
      const url = 'https://checkout.dodopayments.com/session/abc123?lang=';
      const result = getLanguageFromUrl(url);
      // URLSearchParams returns null for empty values
      expect(result).toBeNull();
    });
  });

  describe('hasForceLanguage', () => {
    it('should return true for object with valid force_language', () => {
      const customization = { force_language: 'de' };
      expect(hasForceLanguage(customization)).toBe(true);
    });

    it('should return false for object without force_language', () => {
      const customization = { theme: 'dark' };
      expect(hasForceLanguage(customization)).toBe(false);
    });

    it('should return false for null', () => {
      expect(hasForceLanguage(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(hasForceLanguage(undefined)).toBe(false);
    });

    it('should return false for non-string force_language', () => {
      const customization = { force_language: 123 };
      expect(hasForceLanguage(customization)).toBe(false);
    });

    it('should return false for empty string force_language', () => {
      const customization = { force_language: '' };
      expect(hasForceLanguage(customization)).toBe(false);
    });

    it('should return true for object with force_language and other properties', () => {
      const customization = {
        force_language: 'en',
        theme: 'dark',
        show_order_details: true,
      };
      expect(hasForceLanguage(customization)).toBe(true);
    });
  });
});
