# Checkout

## SupportedCountries

Types:

- <code><a href="./src/resources/checkout/supported-countries.ts">CountryCodeAlpha2</a></code>
- <code><a href="./src/resources/checkout/supported-countries.ts">SupportedCountryListResponse</a></code>

Methods:

- <code title="get /checkout/supported_countries">client.checkout.supportedCountries.<a href="./src/resources/checkout/supported-countries.ts">list</a>() -> SupportedCountryListResponse</code>

# Customers

Types:

- <code><a href="./src/resources/customers.ts">Customer</a></code>

Methods:

- <code title="get /customers/{customer_id}">client.customers.<a href="./src/resources/customers.ts">retrieve</a>(customerId) -> Customer</code>
- <code title="get /customers">client.customers.<a href="./src/resources/customers.ts">list</a>({ ...params }) -> CustomersDefaultPageNumberPagination</code>

# Disputes

Types:

- <code><a href="./src/resources/disputes.ts">Dispute</a></code>

Methods:

- <code title="get /disputes/{dispute_id}">client.disputes.<a href="./src/resources/disputes.ts">retrieve</a>(disputeId) -> Dispute</code>
- <code title="get /disputes">client.disputes.<a href="./src/resources/disputes.ts">list</a>({ ...params }) -> DisputesDefaultPageNumberPagination</code>

# Payments

Types:

- <code><a href="./src/resources/payments.ts">Payment</a></code>
- <code><a href="./src/resources/payments.ts">PaymentCreateResponse</a></code>
- <code><a href="./src/resources/payments.ts">PaymentListResponse</a></code>

Methods:

- <code title="post /payments">client.payments.<a href="./src/resources/payments.ts">create</a>({ ...params }) -> PaymentCreateResponse</code>
- <code title="get /payments/{payment_id}">client.payments.<a href="./src/resources/payments.ts">retrieve</a>(paymentId) -> Payment</code>
- <code title="get /payments">client.payments.<a href="./src/resources/payments.ts">list</a>({ ...params }) -> PaymentListResponsesDefaultPageNumberPagination</code>

# Payouts

Types:

- <code><a href="./src/resources/payouts.ts">PayoutListResponse</a></code>

Methods:

- <code title="get /payouts">client.payouts.<a href="./src/resources/payouts.ts">list</a>({ ...params }) -> PayoutListResponsesDefaultPageNumberPagination</code>

# Products

Types:

- <code><a href="./src/resources/products/products.ts">Product</a></code>
- <code><a href="./src/resources/products/products.ts">ProductCreateResponse</a></code>
- <code><a href="./src/resources/products/products.ts">ProductListResponse</a></code>

Methods:

- <code title="post /products">client.products.<a href="./src/resources/products/products.ts">create</a>({ ...params }) -> ProductCreateResponse</code>
- <code title="get /products/{id}">client.products.<a href="./src/resources/products/products.ts">retrieve</a>(id) -> Product</code>
- <code title="patch /products/{id}">client.products.<a href="./src/resources/products/products.ts">update</a>(id, { ...params }) -> void</code>
- <code title="get /products">client.products.<a href="./src/resources/products/products.ts">list</a>({ ...params }) -> ProductListResponsesDefaultPageNumberPagination</code>

## Images

Types:

- <code><a href="./src/resources/products/images.ts">ImageUpdateResponse</a></code>

Methods:

- <code title="put /products/{id}/images">client.products.images.<a href="./src/resources/products/images.ts">update</a>(id) -> ImageUpdateResponse</code>

# Refunds

Types:

- <code><a href="./src/resources/refunds.ts">Refund</a></code>

Methods:

- <code title="post /refunds">client.refunds.<a href="./src/resources/refunds.ts">create</a>({ ...params }) -> Refund</code>
- <code title="get /refunds/{refund_id}">client.refunds.<a href="./src/resources/refunds.ts">retrieve</a>(refundId) -> Refund</code>
- <code title="get /refunds">client.refunds.<a href="./src/resources/refunds.ts">list</a>({ ...params }) -> RefundsDefaultPageNumberPagination</code>

# Subscriptions

Types:

- <code><a href="./src/resources/subscriptions.ts">Subscription</a></code>
- <code><a href="./src/resources/subscriptions.ts">SubscriptionCreateResponse</a></code>

Methods:

- <code title="post /subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">create</a>({ ...params }) -> SubscriptionCreateResponse</code>
- <code title="get /subscriptions/{subscription_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">retrieve</a>(subscriptionId) -> Subscription</code>
- <code title="patch /subscriptions/{subscription_id}">client.subscriptions.<a href="./src/resources/subscriptions.ts">update</a>(subscriptionId, { ...params }) -> Subscription</code>
- <code title="get /subscriptions">client.subscriptions.<a href="./src/resources/subscriptions.ts">list</a>({ ...params }) -> SubscriptionsDefaultPageNumberPagination</code>

# WebhookEvents

Types:

- <code><a href="./src/resources/webhook-events.ts">WebhookEventLog</a></code>
- <code><a href="./src/resources/webhook-events.ts">WebhookEventListResponse</a></code>

Methods:

- <code title="get /webhook_events/{webhook_event_id}">client.webhookEvents.<a href="./src/resources/webhook-events.ts">retrieve</a>(webhookEventId) -> WebhookEventLog</code>
- <code title="get /webhook_events">client.webhookEvents.<a href="./src/resources/webhook-events.ts">list</a>({ ...params }) -> WebhookEventListResponse</code>
