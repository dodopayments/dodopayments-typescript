// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import DodoPayments from 'dodopayments';
import { Response } from 'node-fetch';

const client = new DodoPayments({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource disputes', () => {
  test('retrieve', async () => {
    const responsePromise = client.disputes.retrieve('dispute_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.disputes.retrieve('dispute_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.disputes.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.disputes.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      DodoPayments.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.disputes.list(
        {
          created_at_gte: '2019-12-27T18:11:19.117Z',
          created_at_lte: '2019-12-27T18:11:19.117Z',
          customer_id: 'customer_id',
          dispute_stage: 'pre_dispute',
          dispute_status: 'dispute_opened',
          page_number: 0,
          page_size: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(DodoPayments.NotFoundError);
  });
});
