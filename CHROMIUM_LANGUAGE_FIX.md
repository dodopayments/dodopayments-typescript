# Chromium Language Issue Fix

## Problem
When using the checkout overlay (`DodoPayment.Checkout.open()`), the language dropdown doesn't work in Chromium-based browsers (Chrome, Brave, Edge). The `force_language` parameter also doesn't work. This is due to Chromium's third-party cookie and storage restrictions in iframes.

## Root Cause
Chromium browsers block third-party cookies and localStorage access in iframes by default for privacy/security. The checkout overlay uses an iframe, which prevents the language preference from being stored or retrieved.

## Solution
Pass the language as a URL query parameter when opening the checkout. This ensures the language is explicitly set without relying on cookies or localStorage.

### Backend Fix (This SDK)
When creating a checkout session, use the `force_language` parameter in the `customization` object:

```typescript
import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: process.env['DODO_PAYMENTS_API_KEY'],
  environment: 'test_mode',
});

const checkoutSessionResponse = await client.checkoutSessions.create({
  product_cart: [{ product_id: 'product_id', quantity: 1 }],
  customization: {
    force_language: 'de', // or 'en', 'es', 'fr', etc.
  },
});

// The checkoutUrl will now include the language parameter
console.log(checkoutSessionResponse.checkout_url);
```

### Frontend Fix (JavaScript SDK)
When opening the checkout overlay, ensure the URL includes the language parameter:

```javascript
// If using the Dodo Payments JavaScript SDK
DodoPayment?.Checkout.open({
  checkoutUrl: checkoutSessionResponse.checkout_url, // URL already has language param
});

// Or manually append language if needed
const urlWithLang = new URL(checkoutSessionResponse.checkout_url);
if (!urlWithLang.searchParams.has('lang')) {
  urlWithLang.searchParams.set('lang', 'de'); // or user's preferred language
}

DodoPayment?.Checkout.open({
  checkoutUrl: urlWithLang.toString(),
});
```

## Additional Notes
- This issue only affects Chromium browsers when using the iframe overlay
- Firefox and direct URL navigation work fine
- The hosted checkout (direct redirect) works correctly in all browsers
- Once the checkout backend properly includes language in the URL, no frontend workarounds should be needed

## Testing
1. Create a checkout session with `force_language` set
2. Verify the returned `checkout_url` includes a language parameter
3. Open the checkout in Chrome/Brave using the overlay
4. Confirm the language is correct and doesn't revert to English
