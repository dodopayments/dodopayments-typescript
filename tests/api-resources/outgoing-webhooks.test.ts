// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Dodopayments from 'dodopayments';
import { Response } from 'node-fetch';

const client = new Dodopayments({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource outgoingWebhooks', () => {
  test('create: only required params', async () => {
    const responsePromise = client.outgoingWebhooks.create({
      business_id: 'business_id',
      data: {
        business_id: 'business_id',
        created_at: '2019-12-27T18:11:19.117Z',
        currency: 'AED',
        customer: { customer_id: 'customer_id', email: 'email', name: 'name' },
        disputes: [
          {
            amount: 'amount',
            business_id: 'business_id',
            created_at: '2019-12-27T18:11:19.117Z',
            currency: 'currency',
            dispute_id: 'dispute_id',
            dispute_stage: 'pre_dispute',
            dispute_status: 'dispute_opened',
            payment_id: 'payment_id',
          },
        ],
        payment_id: 'payment_id',
        refunds: [
          {
            business_id: 'business_id',
            created_at: '2019-12-27T18:11:19.117Z',
            payment_id: 'payment_id',
            refund_id: 'refund_id',
            status: 'succeeded',
          },
        ],
        total_amount: 0,
        payload_type: 'Payment',
      },
      timestamp: '2019-12-27T18:11:19.117Z',
      type: 'payment.succeeded',
      'webhook-id': 'webhook-id',
      'webhook-signature': 'webhook-signature',
      'webhook-timestamp': 'webhook-timestamp',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.outgoingWebhooks.create({
      business_id: 'business_id',
      data: {
        business_id: 'business_id',
        created_at: '2019-12-27T18:11:19.117Z',
        currency: 'AED',
        customer: { customer_id: 'customer_id', email: 'email', name: 'name' },
        disputes: [
          {
            amount: 'amount',
            business_id: 'business_id',
            created_at: '2019-12-27T18:11:19.117Z',
            currency: 'currency',
            dispute_id: 'dispute_id',
            dispute_stage: 'pre_dispute',
            dispute_status: 'dispute_opened',
            payment_id: 'payment_id',
          },
        ],
        payment_id: 'payment_id',
        refunds: [
          {
            business_id: 'business_id',
            created_at: '2019-12-27T18:11:19.117Z',
            payment_id: 'payment_id',
            refund_id: 'refund_id',
            status: 'succeeded',
            amount: 0,
            currency: 'AED',
            reason: 'reason',
          },
        ],
        total_amount: 0,
        payment_link: 'payment_link',
        payment_method: 'payment_method',
        payment_method_type: 'payment_method_type',
        product_cart: [{ product_id: 'product_id', quantity: 0 }],
        status: 'succeeded',
        subscription_id: 'subscription_id',
        tax: 0,
        updated_at: '2019-12-27T18:11:19.117Z',
        payload_type: 'Payment',
      },
      timestamp: '2019-12-27T18:11:19.117Z',
      type: 'payment.succeeded',
      'webhook-id': 'webhook-id',
      'webhook-signature': 'webhook-signature',
      'webhook-timestamp': 'webhook-timestamp',
    });
  });
});
