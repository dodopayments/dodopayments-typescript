// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource emails', () => {
  test('list', async () => {
    const responsePromise = client.customers.emails.list('customer_id');
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
      client.customers.emails.list(
        'customer_id',
        { page_number: 0, page_size: 0 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('retrieveBody: only required params', async () => {
    const responsePromise = client.customers.emails.retrieveBody('email_log_id', {
      customer_id: 'customer_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveBody: required and optional params', async () => {
    const response = await client.customers.emails.retrieveBody('email_log_id', {
      customer_id: 'customer_id',
    });
  });
});
