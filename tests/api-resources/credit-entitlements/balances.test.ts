// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource balances', () => {
  test('retrieve: only required params', async () => {
    const responsePromise = client.creditEntitlements.balances.retrieve('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.creditEntitlements.balances.retrieve('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
    });
  });

  test('list', async () => {
    const responsePromise = client.creditEntitlements.balances.list('credit_entitlement_id');
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
      client.creditEntitlements.balances.list(
        'credit_entitlement_id',
        {
          customer_id: 'customer_id',
          page_number: 0,
          page_size: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('createLedgerEntry: only required params', async () => {
    const responsePromise = client.creditEntitlements.balances.createLedgerEntry('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
      amount: 'amount',
      entry_type: 'credit',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createLedgerEntry: required and optional params', async () => {
    const response = await client.creditEntitlements.balances.createLedgerEntry('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
      amount: 'amount',
      entry_type: 'credit',
      expires_at: '2019-12-27T18:11:19.117Z',
      idempotency_key: 'idempotency_key',
      metadata: { foo: 'string' },
      reason: 'reason',
    });
  });

  test('listGrants: only required params', async () => {
    const responsePromise = client.creditEntitlements.balances.listGrants('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listGrants: required and optional params', async () => {
    const response = await client.creditEntitlements.balances.listGrants('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
      page_number: 0,
      page_size: 0,
      status: 'active',
    });
  });

  test('listLedger: only required params', async () => {
    const responsePromise = client.creditEntitlements.balances.listLedger('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listLedger: required and optional params', async () => {
    const response = await client.creditEntitlements.balances.listLedger('customer_id', {
      credit_entitlement_id: 'credit_entitlement_id',
      end_date: '2019-12-27T18:11:19.117Z',
      page_number: 0,
      page_size: 0,
      start_date: '2019-12-27T18:11:19.117Z',
      transaction_type: 'transaction_type',
    });
  });
});
