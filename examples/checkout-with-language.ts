/**
 * Example: Creating a checkout session with language support for Chromium browsers
 *
 * This example demonstrates how to create a checkout session with proper language
 * handling for iframe overlays in Chromium-based browsers.
 */

import DodoPayments, { ensureLanguageInUrl } from 'dodopayments';

async function createCheckoutWithLanguage() {
  // Initialize the client
  const client = new DodoPayments({
    bearerToken: process.env['DODO_PAYMENTS_API_KEY'],
    environment: 'test_mode', // or 'live_mode'
  });

  // Create a checkout session with German language
  const checkoutSession = await client.checkoutSessions.create({
    product_cart: [
      {
        product_id: 'prod_abc123',
        quantity: 1,
      },
    ],
    customization: {
      force_language: 'de', // Force German language
      theme: 'system',
    },
    return_url: 'https://yoursite.com/checkout/success',
  });

  console.log('Checkout session created:', checkoutSession.session_id);

  // Ensure the language parameter is in the URL for iframe compatibility
  // This is crucial for Chromium browsers (Chrome, Brave, Edge)
  const checkoutUrl = ensureLanguageInUrl(
    checkoutSession.checkout_url,
    'de'
  );

  console.log('Checkout URL with language:', checkoutUrl);

  // Now you can safely use this URL with the checkout overlay
  // DodoPayment.Checkout.open({ checkoutUrl });

  return {
    sessionId: checkoutSession.session_id,
    checkoutUrl,
  };
}

// Example with dynamic language selection
async function createCheckoutWithUserLanguage(userLanguage: string) {
  const client = new DodoPayments({
    bearerToken: process.env['DODO_PAYMENTS_API_KEY'],
    environment: 'test_mode',
  });

  // Create checkout session
  const checkoutSession = await client.checkoutSessions.create({
    product_cart: [
      {
        product_id: 'prod_abc123',
        quantity: 2,
      },
    ],
    customization: {
      force_language: userLanguage,
    },
    customer: {
      email: 'customer@example.com',
      name: 'John Doe',
    },
  });

  // Ensure language is in URL
  const checkoutUrl = ensureLanguageInUrl(
    checkoutSession.checkout_url,
    userLanguage
  );

  return {
    sessionId: checkoutSession.session_id,
    checkoutUrl,
  };
}

// Example usage
async function main() {
  try {
    // Create checkout with German language
    const germanCheckout = await createCheckoutWithLanguage();
    console.log('German checkout created successfully');

    // Create checkout with user's preferred language
    const userCheckout = await createCheckoutWithUserLanguage('es'); // Spanish
    console.log('Spanish checkout created successfully');

    // Example output:
    // German checkout URL: https://checkout.dodopayments.com/session/abc123?lang=de
    // Spanish checkout URL: https://checkout.dodopayments.com/session/xyz456?lang=es
  } catch (error) {
    console.error('Error creating checkout:', error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}

export { createCheckoutWithLanguage, createCheckoutWithUserLanguage };
