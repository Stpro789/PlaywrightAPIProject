import { test, expect } from '@playwright/test';

test('Delete a store order', async ({ request }) => {
  const baseURL = 'https://petstore3.swagger.io/api/v3/store/order';
  const order = {
    id: Date.now() % 2_000_000_000,
    petId: 198772,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: false,
  };
  const createResponse = await request.post(baseURL, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: order,
  });
  expect(createResponse.status()).toBe(200);
  const createdOrder = await createResponse.json();
  expect(createdOrder.id).toBe(order.id);

  let deleted = false;
  try {
    const response = await request.delete(`${baseURL}/${createdOrder.id}`, {
      headers: {
        accept: '*/*',
      },
    });
    deleted = response.status() === 200;
    expect(response.status()).toBe(200);
    expect(await response.text()).toBe('');

    const lookupResponse = await request.get(`${baseURL}/${createdOrder.id}`);
    expect(lookupResponse.status()).toBe(404);
  } finally {
    if (!deleted) {
      const cleanupResponse = await request.delete(`${baseURL}/${createdOrder.id}`);
      expect(cleanupResponse.status()).toBe(200);
    }
  }
});