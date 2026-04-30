# CheckoutSessions

Types:

- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionBillingAddress</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionCustomization</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionFlags</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionRequest</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionResponse</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionStatus</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CustomField</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">ProductItemReq</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">SubscriptionData</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">ThemeConfig</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">ThemeModeConfig</a></code>
- <code><a href="./src/resources/checkout-sessions.ts">CheckoutSessionPreviewResponse</a></code>

Methods:

- <code title="post /checkouts">client.checkoutSessions.<a href="./src/resources/checkout-sessions.ts">create</a>({ ...params }) -> CheckoutSessionResponse</code>
- <code title="get /checkouts/{id}">client.checkoutSessions.<a href="./src/resources/checkout-sessions.ts">retrieve</a>(id) -> CheckoutSessionStatus</code>
- <code title="post /checkouts/preview">client.checkoutSessions.<a href="./src/resources/checkout-sessions.ts">preview</a>({ ...params }) -> CheckoutSessionPreviewResponse</code>

# Payments

Types:

- <code><a href="./src/resources/payments.ts">AttachExistingCustomer</a></code>
- <code><a href="./src/resources/payments.ts">BillingAddress</a></code>
- <code><a href="./src/resources/payments.ts">CreateNewCustomer</a></code>
- <code><a href="./src/resources/payments.ts">CustomFieldResponse</a></code>
- <code><a href="./src/resources/payments.ts">CustomerLimitedDetails</a></code>
- <code><a href="./src/resources/payments.ts">CustomerRequest</a></code>
- <code><a href="./src/resources/payments.ts">IntentStatus</a></code>
- <code><a href="./src/resources/payments.ts">NewCustomer</a></code>
- <code><a href="./src/resources/payments.ts">OneTimeProductCartItem</a></code>
- <code><a href="./src/resources/payments.ts">Payment</a></code>
- <code><a href="./src/resources/payments.ts">PaymentMethodTypes</a></code>
- <code><a href="./src/resources/payments.ts">PaymentRefundStatus</a></code>
- <code><a href="./src/resources/payments.ts">RefundListItem</a></code>
- <code><a href="./src/resources/payments.ts">PaymentCreateResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentListResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentRetrieveLineItemsResponse</a></code>

Methods:

- <code title="post /payments">client.payments.<a href="./src/resources/payments.ts">create</a>({ ...params }) -> PaymentCreateResponse</code>
- <code title="get /payments/{payment_id}">client.payments.<a href="./src/resources/payments.ts">retrieve</a>(paymentID) -> Payment</code>
- <code title="get /payments">client.payments.<a href="./src/resources/payments.ts">list</a>({ ...params }) -> PaymentListResponsesDefaultPageNumberPagination</code>
- <code title="get /payments/{payment_id}/line-items">client.payments.<a href="./src/resources/payments.ts">retrieveLineItems</a>(paymentID) -> PaymentRetrieveLineItemsResponse</code>

# Subscriptions

Types:

- <code><a href="./src/resources/subscriptions.ts">AddonCartResponseItem</a></code>
- <code><a href="./src/resources/subscriptions.ts">AttachAddon</a></code>
- <code><a href="./src/resources/subscriptions.ts">CreditEntitlementCartResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">MeterCartResponseItem</a></code>
- <code><a href="./src/resources/subscriptions.ts">MeterCreditEntitlementCartResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">OnDemandSubscription</a></code>
- <code><a href="./src/resources/subscriptions.ts">Subscription</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionStatus</a></code>
- <code><a href="./src/resources/subscriptions.ts">TimeInterval</a></code>
- <code><a href="./src/resources/subscriptions.ts">UpdateSubscriptionPlanReq</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionCreateResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionListResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionChargeResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionPreviewChangePlanResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionRetrieveCreditUsageResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionRetrieveUsageHistoryResponse</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionUpdatePaymentMethodResponse</a></code>

Methods:

- <code title="post /subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">create</a>({ ...params }) -> SubscriptionCreateResponse</code>
- <code title="get /subscriptions/{subscription_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">retrieve</a>(subscriptionID) -> Subscription</code>
- <code title="patch /subscriptions/{subscription_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">update</a>(subscriptionID, { ...params }) -> Subscription</code>
- <code title="get /subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">list</a>({ ...params }) -> SubscriptionListResponsesDefaultPageNumberPagination</code>
- <code title="delete /subscriptions/{subscription_id}/change-plan/scheduled">client.subscriptions.<a href="./src/resources/subscriptions.ts">cancelChangePlan</a>(subscriptionID) -> void</code>
- <code title="post /subscriptions/{subscription_id}/change-plan">client.subscriptions.<a href="./src/resources/subscriptions.ts">changePlan</a>(subscriptionID, { ...params }) -> void</code>
- <code title="post /subscriptions/{subscription_id}/charge">client.subscriptions.<a href="./src/resources/subscriptions.ts">charge</a>(subscriptionID, { ...params }) -> SubscriptionChargeResponse</code>
- <code title="post /subscriptions/{subscription_id}/change-plan/preview">client.subscriptions.<a href="./src/resources/subscriptions.ts">previewChangePlan</a>(subscriptionID, { ...params }) -> SubscriptionPreviewChangePlanResponse</code>
- <code title="get /subscriptions/{subscription_id}/credit-usage">client.subscriptions.<a href="./src/resources/subscriptions.ts">retrieveCreditUsage</a>(subscriptionID) -> SubscriptionRetrieveCreditUsageResponse</code>
- <code title="get /subscriptions/{subscription_id}/usage-history">client.subscriptions.<a href="./src/resources/subscriptions.ts">retrieveUsageHistory</a>(subscriptionID, { ...params }) -> SubscriptionRetrieveUsageHistoryResponsesDefaultPageNumberPagination</code>
- <code title="post /subscriptions/{subscription_id}/update-payment-method">client.subscriptions.<a href="./src/resources/subscriptions.ts">updatePaymentMethod</a>(subscriptionID, { ...params }) -> SubscriptionUpdatePaymentMethodResponse</code>

# Invoices

## Payments

Methods:

- <code title="get /invoices/payments/{payment_id}">client.invoices.payments.<a href="./src/resources/invoices/payments.ts">retrieve</a>(paymentID) -> Response</code>
- <code title="get /invoices/refunds/{refund_id}">client.invoices.payments.<a href="./src/resources/invoices/payments.ts">retrieveRefund</a>(refundID) -> Response</code>

# Licenses

Types:

- <code><a href="./src/resources/licenses.ts">LicenseActivateResponse</a></code>
- <code><a href="./src/resources/licenses.ts">LicenseValidateResponse</a></code>

Methods:

- <code title="post /licenses/activate">client.licenses.<a href="./src/resources/licenses.ts">activate</a>({ ...params }) -> LicenseActivateResponse</code>
- <code title="post /licenses/deactivate">client.licenses.<a href="./src/resources/licenses.ts">deactivate</a>({ ...params }) -> void</code>
- <code title="post /licenses/validate">client.licenses.<a href="./src/resources/licenses.ts">validate</a>({ ...params }) -> LicenseValidateResponse</code>

# LicenseKeys

Types:

- <code><a href="./src/resources/license-keys.ts">LicenseKey</a></code>
- <code><a href="./src/resources/license-keys.ts">LicenseKeyStatus</a></code>

Methods:

- <code title="post /license_keys">client.licenseKeys.<a href="./src/resources/license-keys.ts">create</a>({ ...params }) -> LicenseKey</code>
- <code title="get /license_keys/{id}">client.licenseKeys.<a href="./src/resources/license-keys.ts">retrieve</a>(id) -> LicenseKey</code>
- <code title="patch /license_keys/{id}">client.licenseKeys.<a href="./src/resources/license-keys.ts">update</a>(id, { ...params }) -> LicenseKey</code>
- <code title="get /license_keys">client.licenseKeys.<a href="./src/resources/license-keys.ts">list</a>({ ...params }) -> LicenseKeysDefaultPageNumberPagination</code>

# LicenseKeyInstances

Types:

- <code><a href="./src/resources/license-key-instances.ts">LicenseKeyInstance</a></code>

Methods:

- <code title="get /license_key_instances/{id}">client.licenseKeyInstances.<a href="./src/resources/license-key-instances.ts">retrieve</a>(id) -> LicenseKeyInstance</code>
- <code title="patch /license_key_instances/{id}">client.licenseKeyInstances.<a href="./src/resources/license-key-instances.ts">update</a>(id, { ...params }) -> LicenseKeyInstance</code>
- <code title="get /license_key_instances">client.licenseKeyInstances.<a href="./src/resources/license-key-instances.ts">list</a>({ ...params }) -> LicenseKeyInstancesDefaultPageNumberPagination</code>

# Customers

Types:

- <code><a href="./src/resources/customers/customers.ts">Customer</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerPortalSession</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerListCreditEntitlementsResponse</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerListEntitlementsResponse</a></code>
- <code><a href="./src/resources/customers/customers.ts">CustomerRetrievePaymentMethodsResponse</a></code>

Methods:

- <code title="post /customers">client.customers.<a href="./src/resources/customers/customers.ts">create</a>({ ...params }) -> Customer</code>
- <code title="get /customers/{customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">retrieve</a>(customerID) -> Customer</code>
- <code title="patch /customers/{customer_id}">client.customers.<a href="./src/resources/customers/customers.ts">update</a>(customerID, { ...params }) -> Customer</code>
- <code title="get /customers">client.customers.<a href="./src/resources/customers/customers.ts">list</a>({ ...params }) -> CustomersDefaultPageNumberPagination</code>
- <code title="delete /customers/{customer_id}/payment-methods/{payment_method_id}">client.customers.<a href="./src/resources/customers/customers.ts">deletePaymentMethod</a>(paymentMethodID, { ...params }) -> void</code>
- <code title="get /customers/{customer_id}/credit-entitlements">client.customers.<a href="./src/resources/customers/customers.ts">listCreditEntitlements</a>(customerID) -> CustomerListCreditEntitlementsResponse</code>
- <code title="get /customers/{customer_id}/entitlements">client.customers.<a href="./src/resources/customers/customers.ts">listEntitlements</a>(customerID) -> CustomerListEntitlementsResponse</code>
- <code title="get /customers/{customer_id}/payment-methods">client.customers.<a href="./src/resources/customers/customers.ts">retrievePaymentMethods</a>(customerID) -> CustomerRetrievePaymentMethodsResponse</code>

## CustomerPortal

Methods:

- <code title="post /customers/{customer_id}/customer-portal/session">client.customers.customerPortal.<a href="./src/resources/customers/customer-portal.ts">create</a>(customerID, { ...params }) -> CustomerPortalSession</code>

## Wallets

Types:

- <code><a href="./src/resources/customers/wallets/wallets.ts">CustomerWallet</a></code>
- <code><a href="./src/resources/customers/wallets/wallets.ts">WalletListResponse</a></code>

Methods:

- <code title="get /customers/{customer_id}/wallets">client.customers.wallets.<a href="./src/resources/customers/wallets/wallets.ts">list</a>(customerID) -> WalletListResponse</code>

### LedgerEntries

Types:

- <code><a href="./src/resources/customers/wallets/ledger-entries.ts">CustomerWalletTransaction</a></code>

Methods:

- <code title="post /customers/{customer_id}/wallets/ledger-entries">client.customers.wallets.ledgerEntries.<a href="./src/resources/customers/wallets/ledger-entries.ts">create</a>(customerID, { ...params }) -> CustomerWallet</code>
- <code title="get /customers/{customer_id}/wallets/ledger-entries">client.customers.wallets.ledgerEntries.<a href="./src/resources/customers/wallets/ledger-entries.ts">list</a>(customerID, { ...params }) -> CustomerWalletTransactionsDefaultPageNumberPagination</code>

# Refunds

Types:

- <code><a href="./src/resources/refunds.ts">Refund</a></code>
- <code><a href="./src/resources/refunds.ts">RefundStatus</a></code>

Methods:

- <code title="post /refunds">client.refunds.<a href="./src/resources/refunds.ts">create</a>({ ...params }) -> Refund</code>
- <code title="get /refunds/{refund_id}">client.refunds.<a href="./src/resources/refunds.ts">retrieve</a>(refundID) -> Refund</code>
- <code title="get /refunds">client.refunds.<a href="./src/resources/refunds.ts">list</a>({ ...params }) -> RefundListItemsDefaultPageNumberPagination</code>

# Disputes

Types:

- <code><a href="./src/resources/disputes.ts">Dispute</a></code>
- <code><a href="./src/resources/disputes.ts">DisputeStage</a></code>
- <code><a href="./src/resources/disputes.ts">DisputeStatus</a></code>
- <code><a href="./src/resources/disputes.ts">GetDispute</a></code>
- <code><a href="./src/resources/disputes.ts">DisputeListResponse</a></code>

Methods:

- <code title="get /disputes/{dispute_id}">client.disputes.<a href="./src/resources/disputes.ts">retrieve</a>(disputeID) -> GetDispute</code>
- <code title="get /disputes">client.disputes.<a href="./src/resources/disputes.ts">list</a>({ ...params }) -> DisputeListResponsesDefaultPageNumberPagination</code>

# Payouts

Types:

- <code><a href="./src/resources/payouts/payouts.ts">PayoutListResponse</a></code>

Methods:

- <code title="get /payouts">client.payouts.<a href="./src/resources/payouts/payouts.ts">list</a>({ ...params }) -> PayoutListResponsesDefaultPageNumberPagination</code>

## Breakup

Types:

- <code><a href="./src/resources/payouts/breakup/breakup.ts">BreakupRetrieveResponse</a></code>

Methods:

- <code title="get /payouts/{payout_id}/breakup">client.payouts.breakup.<a href="./src/resources/payouts/breakup/breakup.ts">retrieve</a>(payoutID) -> BreakupRetrieveResponse</code>

### Details

Types:

- <code><a href="./src/resources/payouts/breakup/details.ts">DetailListResponse</a></code>

Methods:

- <code title="get /payouts/{payout_id}/breakup/details">client.payouts.breakup.details.<a href="./src/resources/payouts/breakup/details.ts">list</a>(payoutID, { ...params }) -> DetailListResponsesDefaultPageNumberPagination</code>
- <code title="get /payouts/{payout_id}/breakup/details/csv">client.payouts.breakup.details.<a href="./src/resources/payouts/breakup/details.ts">downloadCsv</a>(payoutID) -> void</code>

# Products

Types:

- <code><a href="./src/resources/products/products.ts">AddMeterToPrice</a></code>
- <code><a href="./src/resources/products/products.ts">AttachCreditEntitlement</a></code>
- <code><a href="./src/resources/products/products.ts">CbbProrationBehavior</a></code>
- <code><a href="./src/resources/products/products.ts">CreditEntitlementMappingResponse</a></code>
- <code><a href="./src/resources/products/products.ts">DigitalProductDelivery</a></code>
- <code><a href="./src/resources/products/products.ts">DigitalProductDeliveryFile</a></code>
- <code><a href="./src/resources/products/products.ts">LicenseKeyDuration</a></code>
- <code><a href="./src/resources/products/products.ts">Price</a></code>
- <code><a href="./src/resources/products/products.ts">Product</a></code>
- <code><a href="./src/resources/products/products.ts">ProductListResponse</a></code>
- <code><a href="./src/resources/products/products.ts">ProductUpdateFilesResponse</a></code>

Methods:

- <code title="post /products">client.products.<a href="./src/resources/products/products.ts">create</a>({ ...params }) -> Product</code>
- <code title="get /products/{id}">client.products.<a href="./src/resources/products/products.ts">retrieve</a>(id) -> Product</code>
- <code title="patch /products/{id}">client.products.<a href="./src/resources/products/products.ts">update</a>(id, { ...params }) -> void</code>
- <code title="get /products">client.products.<a href="./src/resources/products/products.ts">list</a>({ ...params }) -> ProductListResponsesDefaultPageNumberPagination</code>
- <code title="delete /products/{id}">client.products.<a href="./src/resources/products/products.ts">archive</a>(id) -> void</code>
- <code title="post /products/{id}/unarchive">client.products.<a href="./src/resources/products/products.ts">unarchive</a>(id) -> void</code>
- <code title="put /products/{id}/files">client.products.<a href="./src/resources/products/products.ts">updateFiles</a>(id, { ...params }) -> ProductUpdateFilesResponse</code>

## Images

Types:

- <code><a href="./src/resources/products/images.ts">ImageUpdateResponse</a></code>

Methods:

- <code title="put /products/{id}/images">client.products.images.<a href="./src/resources/products/images.ts">update</a>(id, { ...params }) -> ImageUpdateResponse</code>

## ShortLinks

Types:

- <code><a href="./src/resources/products/short-links.ts">ShortLinkCreateResponse</a></code>
- <code><a href="./src/resources/products/short-links.ts">ShortLinkListResponse</a></code>

Methods:

- <code title="post /products/{id}/short_links">client.products.shortLinks.<a href="./src/resources/products/short-links.ts">create</a>(id, { ...params }) -> ShortLinkCreateResponse</code>
- <code title="get /products/short_links">client.products.shortLinks.<a href="./src/resources/products/short-links.ts">list</a>({ ...params }) -> ShortLinkListResponsesDefaultPageNumberPagination</code>

# Misc

Types:

- <code><a href="./src/resources/misc.ts">CountryCode</a></code>
- <code><a href="./src/resources/misc.ts">Currency</a></code>
- <code><a href="./src/resources/misc.ts">TaxCategory</a></code>
- <code><a href="./src/resources/misc.ts">MiscListSupportedCountriesResponse</a></code>

Methods:

- <code title="get /checkout/supported_countries">client.misc.<a href="./src/resources/misc.ts">listSupportedCountries</a>() -> MiscListSupportedCountriesResponse</code>

# Discounts

Types:

- <code><a href="./src/resources/discounts.ts">Discount</a></code>
- <code><a href="./src/resources/discounts.ts">DiscountType</a></code>

Methods:

- <code title="post /discounts">client.discounts.<a href="./src/resources/discounts.ts">create</a>({ ...params }) -> Discount</code>
- <code title="get /discounts/{discount_id}">client.discounts.<a href="./src/resources/discounts.ts">retrieve</a>(discountID) -> Discount</code>
- <code title="patch /discounts/{discount_id}">client.discounts.<a href="./src/resources/discounts.ts">update</a>(discountID, { ...params }) -> Discount</code>
- <code title="get /discounts">client.discounts.<a href="./src/resources/discounts.ts">list</a>({ ...params }) -> DiscountsDefaultPageNumberPagination</code>
- <code title="delete /discounts/{discount_id}">client.discounts.<a href="./src/resources/discounts.ts">delete</a>(discountID) -> void</code>
- <code title="get /discounts/code/{code}">client.discounts.<a href="./src/resources/discounts.ts">retrieveByCode</a>(code) -> Discount</code>

# Addons

Types:

- <code><a href="./src/resources/addons.ts">AddonResponse</a></code>
- <code><a href="./src/resources/addons.ts">AddonUpdateImagesResponse</a></code>

Methods:

- <code title="post /addons">client.addons.<a href="./src/resources/addons.ts">create</a>({ ...params }) -> AddonResponse</code>
- <code title="get /addons/{id}">client.addons.<a href="./src/resources/addons.ts">retrieve</a>(id) -> AddonResponse</code>
- <code title="patch /addons/{id}">client.addons.<a href="./src/resources/addons.ts">update</a>(id, { ...params }) -> AddonResponse</code>
- <code title="get /addons">client.addons.<a href="./src/resources/addons.ts">list</a>({ ...params }) -> AddonResponsesDefaultPageNumberPagination</code>
- <code title="put /addons/{id}/images">client.addons.<a href="./src/resources/addons.ts">updateImages</a>(id) -> AddonUpdateImagesResponse</code>

# Brands

Types:

- <code><a href="./src/resources/brands.ts">Brand</a></code>
- <code><a href="./src/resources/brands.ts">BrandListResponse</a></code>
- <code><a href="./src/resources/brands.ts">BrandUpdateImagesResponse</a></code>

Methods:

- <code title="post /brands">client.brands.<a href="./src/resources/brands.ts">create</a>({ ...params }) -> Brand</code>
- <code title="get /brands/{id}">client.brands.<a href="./src/resources/brands.ts">retrieve</a>(id) -> Brand</code>
- <code title="patch /brands/{id}">client.brands.<a href="./src/resources/brands.ts">update</a>(id, { ...params }) -> Brand</code>
- <code title="get /brands">client.brands.<a href="./src/resources/brands.ts">list</a>() -> BrandListResponse</code>
- <code title="put /brands/{id}/images">client.brands.<a href="./src/resources/brands.ts">updateImages</a>(id) -> BrandUpdateImagesResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookDetails</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">WebhookRetrieveSecretResponse</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">AbandonedCheckoutDetectedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">AbandonedCheckoutRecoveredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditAddedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditBalanceLowWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditDeductedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditExpiredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditManualAdjustmentWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditOverageChargedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditOverageResetWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditRolledOverWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditRolloverForfeitedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeAcceptedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeCancelledWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeChallengedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeExpiredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeLostWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeOpenedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeWonWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DunningRecoveredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DunningStartedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantDeliveredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantRevokedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">LicenseKeyCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentCancelledWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentProcessingWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentSucceededWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">RefundFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">RefundSucceededWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionActiveWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionCancelledWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionExpiredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionOnHoldWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionPlanChangedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionRenewedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">AbandonedCheckoutDetectedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">AbandonedCheckoutRecoveredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditAddedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditBalanceLowWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditDeductedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditExpiredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditManualAdjustmentWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditOverageChargedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditOverageResetWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditRolledOverWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">CreditRolloverForfeitedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeAcceptedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeCancelledWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeChallengedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeExpiredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeLostWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeOpenedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DisputeWonWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DunningRecoveredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">DunningStartedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantDeliveredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">EntitlementGrantRevokedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">LicenseKeyCreatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentCancelledWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentProcessingWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">PaymentSucceededWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">RefundFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">RefundSucceededWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionActiveWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionCancelledWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionExpiredWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionFailedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionOnHoldWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionPlanChangedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionRenewedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">SubscriptionUpdatedWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">UnsafeUnwrapWebhookEvent</a></code>
- <code><a href="./src/resources/webhooks/webhooks.ts">UnwrapWebhookEvent</a></code>

Methods:

- <code title="post /webhooks">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">create</a>({ ...params }) -> WebhookDetails</code>
- <code title="get /webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">retrieve</a>(webhookID) -> WebhookDetails</code>
- <code title="patch /webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">update</a>(webhookID, { ...params }) -> WebhookDetails</code>
- <code title="get /webhooks">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">list</a>({ ...params }) -> WebhookDetailsCursorPagePagination</code>
- <code title="delete /webhooks/{webhook_id}">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">delete</a>(webhookID) -> void</code>
- <code title="get /webhooks/{webhook_id}/secret">client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">retrieveSecret</a>(webhookID) -> WebhookRetrieveSecretResponse</code>
- <code>client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">unsafeUnwrap</a>(body) -> void</code>
- <code>client.webhooks.<a href="./src/resources/webhooks/webhooks.ts">unwrap</a>(body) -> void</code>

## Headers

Types:

- <code><a href="./src/resources/webhooks/headers.ts">HeaderRetrieveResponse</a></code>

Methods:

- <code title="get /webhooks/{webhook_id}/headers">client.webhooks.headers.<a href="./src/resources/webhooks/headers.ts">retrieve</a>(webhookID) -> HeaderRetrieveResponse</code>
- <code title="patch /webhooks/{webhook_id}/headers">client.webhooks.headers.<a href="./src/resources/webhooks/headers.ts">update</a>(webhookID, { ...params }) -> void</code>

# WebhookEvents

Types:

- <code><a href="./src/resources/webhook-events.ts">WebhookEventType</a></code>
- <code><a href="./src/resources/webhook-events.ts">WebhookPayload</a></code>

# UsageEvents

Types:

- <code><a href="./src/resources/usage-events.ts">Event</a></code>
- <code><a href="./src/resources/usage-events.ts">EventInput</a></code>
- <code><a href="./src/resources/usage-events.ts">UsageEventIngestResponse</a></code>

Methods:

- <code title="get /events/{event_id}">client.usageEvents.<a href="./src/resources/usage-events.ts">retrieve</a>(eventID) -> Event</code>
- <code title="get /events">client.usageEvents.<a href="./src/resources/usage-events.ts">list</a>({ ...params }) -> EventsDefaultPageNumberPagination</code>
- <code title="post /events/ingest">client.usageEvents.<a href="./src/resources/usage-events.ts">ingest</a>({ ...params }) -> UsageEventIngestResponse</code>

# Meters

Types:

- <code><a href="./src/resources/meters.ts">Conjunction</a></code>
- <code><a href="./src/resources/meters.ts">FilterOperator</a></code>
- <code><a href="./src/resources/meters.ts">Meter</a></code>
- <code><a href="./src/resources/meters.ts">MeterAggregation</a></code>
- <code><a href="./src/resources/meters.ts">MeterFilter</a></code>

Methods:

- <code title="post /meters">client.meters.<a href="./src/resources/meters.ts">create</a>({ ...params }) -> Meter</code>
- <code title="get /meters/{id}">client.meters.<a href="./src/resources/meters.ts">retrieve</a>(id) -> Meter</code>
- <code title="get /meters">client.meters.<a href="./src/resources/meters.ts">list</a>({ ...params }) -> MetersDefaultPageNumberPagination</code>
- <code title="delete /meters/{id}">client.meters.<a href="./src/resources/meters.ts">archive</a>(id) -> void</code>
- <code title="post /meters/{id}/unarchive">client.meters.<a href="./src/resources/meters.ts">unarchive</a>(id) -> void</code>

# Balances

Types:

- <code><a href="./src/resources/balances.ts">BalanceLedgerEntry</a></code>

Methods:

- <code title="get /balances/ledger">client.balances.<a href="./src/resources/balances.ts">retrieveLedger</a>({ ...params }) -> BalanceLedgerEntriesDefaultPageNumberPagination</code>

# CreditEntitlements

Types:

- <code><a href="./src/resources/credit-entitlements/credit-entitlements.ts">CbbOverageBehavior</a></code>
- <code><a href="./src/resources/credit-entitlements/credit-entitlements.ts">CreditEntitlement</a></code>

Methods:

- <code title="post /credit-entitlements">client.creditEntitlements.<a href="./src/resources/credit-entitlements/credit-entitlements.ts">create</a>({ ...params }) -> CreditEntitlement</code>
- <code title="get /credit-entitlements/{id}">client.creditEntitlements.<a href="./src/resources/credit-entitlements/credit-entitlements.ts">retrieve</a>(id) -> CreditEntitlement</code>
- <code title="patch /credit-entitlements/{id}">client.creditEntitlements.<a href="./src/resources/credit-entitlements/credit-entitlements.ts">update</a>(id, { ...params }) -> void</code>
- <code title="get /credit-entitlements">client.creditEntitlements.<a href="./src/resources/credit-entitlements/credit-entitlements.ts">list</a>({ ...params }) -> CreditEntitlementsDefaultPageNumberPagination</code>
- <code title="delete /credit-entitlements/{id}">client.creditEntitlements.<a href="./src/resources/credit-entitlements/credit-entitlements.ts">delete</a>(id) -> void</code>
- <code title="post /credit-entitlements/{id}/undelete">client.creditEntitlements.<a href="./src/resources/credit-entitlements/credit-entitlements.ts">undelete</a>(id) -> void</code>

## Balances

Types:

- <code><a href="./src/resources/credit-entitlements/balances.ts">CreditLedgerEntry</a></code>
- <code><a href="./src/resources/credit-entitlements/balances.ts">CustomerCreditBalance</a></code>
- <code><a href="./src/resources/credit-entitlements/balances.ts">LedgerEntryType</a></code>
- <code><a href="./src/resources/credit-entitlements/balances.ts">BalanceCreateLedgerEntryResponse</a></code>
- <code><a href="./src/resources/credit-entitlements/balances.ts">BalanceListGrantsResponse</a></code>

Methods:

- <code title="get /credit-entitlements/{credit_entitlement_id}/balances/{customer_id}">client.creditEntitlements.balances.<a href="./src/resources/credit-entitlements/balances.ts">retrieve</a>(customerID, { ...params }) -> CustomerCreditBalance</code>
- <code title="get /credit-entitlements/{credit_entitlement_id}/balances">client.creditEntitlements.balances.<a href="./src/resources/credit-entitlements/balances.ts">list</a>(creditEntitlementID, { ...params }) -> CustomerCreditBalancesDefaultPageNumberPagination</code>
- <code title="post /credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/ledger-entries">client.creditEntitlements.balances.<a href="./src/resources/credit-entitlements/balances.ts">createLedgerEntry</a>(customerID, { ...params }) -> BalanceCreateLedgerEntryResponse</code>
- <code title="get /credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/grants">client.creditEntitlements.balances.<a href="./src/resources/credit-entitlements/balances.ts">listGrants</a>(customerID, { ...params }) -> BalanceListGrantsResponsesDefaultPageNumberPagination</code>
- <code title="get /credit-entitlements/{credit_entitlement_id}/balances/{customer_id}/ledger">client.creditEntitlements.balances.<a href="./src/resources/credit-entitlements/balances.ts">listLedger</a>(customerID, { ...params }) -> CreditLedgerEntriesDefaultPageNumberPagination</code>

# Entitlements

Types:

- <code><a href="./src/resources/entitlements/entitlements.ts">EntitlementCreateResponse</a></code>
- <code><a href="./src/resources/entitlements/entitlements.ts">EntitlementRetrieveResponse</a></code>
- <code><a href="./src/resources/entitlements/entitlements.ts">EntitlementUpdateResponse</a></code>
- <code><a href="./src/resources/entitlements/entitlements.ts">EntitlementListResponse</a></code>

Methods:

- <code title="post /entitlements">client.entitlements.<a href="./src/resources/entitlements/entitlements.ts">create</a>({ ...params }) -> EntitlementCreateResponse</code>
- <code title="get /entitlements/{id}">client.entitlements.<a href="./src/resources/entitlements/entitlements.ts">retrieve</a>(id) -> EntitlementRetrieveResponse</code>
- <code title="patch /entitlements/{id}">client.entitlements.<a href="./src/resources/entitlements/entitlements.ts">update</a>(id, { ...params }) -> EntitlementUpdateResponse</code>
- <code title="get /entitlements">client.entitlements.<a href="./src/resources/entitlements/entitlements.ts">list</a>({ ...params }) -> EntitlementListResponsesDefaultPageNumberPagination</code>
- <code title="delete /entitlements/{id}">client.entitlements.<a href="./src/resources/entitlements/entitlements.ts">delete</a>(id) -> void</code>

## Files

Types:

- <code><a href="./src/resources/entitlements/files.ts">FileUploadResponse</a></code>

Methods:

- <code title="delete /entitlements/{id}/files/{file_id}">client.entitlements.files.<a href="./src/resources/entitlements/files.ts">delete</a>(fileID, { ...params }) -> void</code>
- <code title="post /entitlements/{id}/files">client.entitlements.files.<a href="./src/resources/entitlements/files.ts">upload</a>(id) -> FileUploadResponse</code>

## Grants

Types:

- <code><a href="./src/resources/entitlements/grants.ts">GrantListResponse</a></code>
- <code><a href="./src/resources/entitlements/grants.ts">GrantRevokeResponse</a></code>

Methods:

- <code title="get /entitlements/{id}/grants">client.entitlements.grants.<a href="./src/resources/entitlements/grants.ts">list</a>(id, { ...params }) -> GrantListResponsesDefaultPageNumberPagination</code>
- <code title="delete /entitlements/{id}/grants/{grant_id}">client.entitlements.grants.<a href="./src/resources/entitlements/grants.ts">revoke</a>(grantID, { ...params }) -> GrantRevokeResponse</code>
