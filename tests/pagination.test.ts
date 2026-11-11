import DodoPayments from 'dodopayments';

// Simulates a 0-indexed page-number API: omitting `page_number` returns page 0.
function makeClient(pages: string[][]) {
  const requestedPages: (string | null)[] = [];
  const fetch = async (url: string | URL | Request): Promise<Response> => {
    const pageNumber = new URL(url.toString()).searchParams.get('page_number');
    requestedPages.push(pageNumber);
    const items = (pages[Number(pageNumber ?? 0)] ?? []).map((id) => ({ product_id: id }));
    return new Response(JSON.stringify({ items }), { headers: { 'Content-Type': 'application/json' } });
  };

  const client = new DodoPayments({
    baseURL: 'http://localhost:5000/',
    bearerToken: 'My Bearer Token',
    maxRetries: 0,
    fetch,
  });
  return { client, requestedPages };
}

describe('DefaultPageNumberPagination', () => {
  const pages = [
    ['a', 'b'],
    ['c', 'd'],
    ['e', 'f'],
  ];

  test('auto-pagination visits every page starting from page 0', async () => {
    const { client, requestedPages } = makeClient(pages);

    const ids: string[] = [];
    for await (const product of client.products.list({ page_size: 2 })) {
      ids.push(product.product_id);
    }

    expect(ids).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
    expect(requestedPages).toEqual([null, '1', '2', '3']);
  });

  test('getNextPage requests page 1 after the default first page', async () => {
    const { client, requestedPages } = makeClient(pages);

    const first = await client.products.list({ page_size: 2 });
    expect(first.hasNextPage()).toBe(true);
    const second = await first.getNextPage();

    expect(second.items.map((p) => p.product_id)).toEqual(['c', 'd']);
    expect(requestedPages).toEqual([null, '1']);
  });

  test('continues from an explicit page_number', async () => {
    const { client, requestedPages } = makeClient(pages);

    const ids: string[] = [];
    for await (const product of client.products.list({ page_size: 2, page_number: 1 })) {
      ids.push(product.product_id);
    }

    expect(ids).toEqual(['c', 'd', 'e', 'f']);
    expect(requestedPages).toEqual(['1', '2', '3']);
  });
});
