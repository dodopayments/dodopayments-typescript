// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource invoices', () => {
  test('list', async () => {
    const responsePromise = client.invoices.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.invoices.list(
        {
          collection_method: 'auto_charge',
          created_at_gte: '2019-12-27T18:11:19.117Z',
          created_at_lte: '2019-12-27T18:11:19.117Z',
          customer_id: 'customer_id',
          due_at_gte: '2019-12-27T18:11:19.117Z',
          due_at_lte: '2019-12-27T18:11:19.117Z',
          page_number: 0,
          page_size: 0,
          status: ['open'],
          subscription_id: 'subscription_id',
          tags: ['refunded'],
          total_amount_gte: 0,
          total_amount_lte: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.invoices.create({
      collection_method: 'auto_charge',
      currency: 'AED',
      customer_id: 'customer_id',
      items: [
        {
          description: 'description',
          kind: 'custom',
          tax_category: 'digital_products',
          unit_amount: 0,
        },
      ],
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
    const response = await client.invoices.create({
      collection_method: 'auto_charge',
      currency: 'AED',
      customer_id: 'customer_id',
      items: [
        {
          description: 'description',
          kind: 'custom',
          tax_category: 'digital_products',
          unit_amount: 0,
          quantity: 0,
        },
      ],
      billing_address: {
        country: 'AF',
        city: 'city',
        state: 'state',
        street: 'street',
        zipcode: 'zipcode',
      },
      cc_emails: ['string'],
      customer_email: 'customer_email',
      discount_ids: ['string'],
      due_at: '2019-12-27T18:11:19.117Z',
      dunning: { reminders_enabled: true, offsets_days: [0] },
      memo: 'memo',
      metadata: { foo: 'string' },
      payment_terms: { type: 'due_on_receipt' },
      review_required: true,
      tax_id: 'tax_id',
      'Idempotency-Key': 'Idempotency-Key',
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.invoices.retrieve('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: only required params', async () => {
    const responsePromise = client.invoices.update('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.invoices.update('invoice_id', {
      'If-Match': 'If-Match',
      billing_address: {
        country: 'AF',
        city: 'city',
        state: 'state',
        street: 'street',
        zipcode: 'zipcode',
      },
      cc_emails: ['string'],
      collection_method: 'auto_charge',
      currency: 'AED',
      customer_email: 'customer_email',
      customer_id: 'customer_id',
      discount_ids: ['string'],
      due_at: '2019-12-27T18:11:19.117Z',
      dunning: { reminders_enabled: true, offsets_days: [0] },
      items: [
        {
          description: 'description',
          kind: 'custom',
          tax_category: 'digital_products',
          unit_amount: 0,
          quantity: 0,
        },
      ],
      memo: 'memo',
      metadata: { foo: 'string' },
      payment_terms: { type: 'due_on_receipt' },
      review_required: true,
      tax_id: 'tax_id',
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.invoices.delete('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.invoices.delete('invoice_id', { 'If-Match': 'If-Match' });
  });

  test('preview: required and optional params', async () => {
    const response = await client.invoices.preview({
      collection_method: 'auto_charge',
      currency: 'AED',
      customer_id: 'customer_id',
      items: [
        {
          description: 'description',
          kind: 'custom',
          tax_category: 'digital_products',
          unit_amount: 0,
          quantity: 0,
        },
      ],
      format: 'json',
      billing_address: {
        country: 'AF',
        city: 'city',
        state: 'state',
        street: 'street',
        zipcode: 'zipcode',
      },
      cc_emails: ['string'],
      customer_email: 'customer_email',
      discount_ids: ['string'],
      due_at: '2019-12-27T18:11:19.117Z',
      dunning: { reminders_enabled: true, offsets_days: [0] },
      memo: 'memo',
      metadata: { foo: 'string' },
      payment_terms: { type: 'due_on_receipt' },
      review_required: true,
      tax_id: 'tax_id',
    });
  });

  test('previewExisting: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.invoices.previewExisting('invoice_id', { format: 'json' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('finalize: only required params', async () => {
    const responsePromise = client.invoices.finalize('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('finalize: required and optional params', async () => {
    const response = await client.invoices.finalize('invoice_id', {
      'If-Match': 'If-Match',
      cc_emails: ['string'],
      customer_email: 'customer_email',
      send: true,
    });
  });

  test('send: only required params', async () => {
    const responsePromise = client.invoices.send('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('send: required and optional params', async () => {
    const response = await client.invoices.send('invoice_id', { 'If-Match': 'If-Match' });
  });

  test('void: only required params', async () => {
    const responsePromise = client.invoices.void('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('void: required and optional params', async () => {
    const response = await client.invoices.void('invoice_id', { 'If-Match': 'If-Match' });
  });

  test('retry: only required params', async () => {
    const responsePromise = client.invoices.retry('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retry: required and optional params', async () => {
    const response = await client.invoices.retry('invoice_id', { 'If-Match': 'If-Match' });
  });

  test('duplicate', async () => {
    const responsePromise = client.invoices.duplicate('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('markUncollectable: only required params', async () => {
    const responsePromise = client.invoices.markUncollectable('invoice_id', { 'If-Match': 'If-Match' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('markUncollectable: required and optional params', async () => {
    const response = await client.invoices.markUncollectable('invoice_id', { 'If-Match': 'If-Match' });
  });

  test('addNote: only required params', async () => {
    const responsePromise = client.invoices.addNote('invoice_id', { text: 'text' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('addNote: required and optional params', async () => {
    const response = await client.invoices.addNote('invoice_id', { text: 'text' });
  });

  test('listEvents', async () => {
    const responsePromise = client.invoices.listEvents('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createHostedLink', async () => {
    const responsePromise = client.invoices.createHostedLink('invoice_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateDunning: only required params', async () => {
    const responsePromise = client.invoices.updateDunning('invoice_id', {
      action: 'pause',
      'If-Match': 'If-Match',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateDunning: required and optional params', async () => {
    const response = await client.invoices.updateDunning('invoice_id', {
      action: 'pause',
      'If-Match': 'If-Match',
      offsets_days: [0],
    });
  });
});
