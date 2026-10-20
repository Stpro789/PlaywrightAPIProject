//Generate order with valid data

import { test, expect } from '@playwright/test';

test('Create a store order - POST /store/order', async ({ request }) => {
  // Request payload
  const requestBody = {
    id: 10,
    petId: 198772,
    quantity: 7,
    shipDate: '2026-10-20T22:20:26.446Z',
    status: 'approved',
    complete: true
  };

  // Send POST request
  const response = await request.post(
    'https://petstore3.swagger.io/api/v3/store/order',
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: requestBody
    }
  );

  // Validate HTTP status code
  expect(response.status()).toBe(200);

  // Parse response body
  const responseBody = await response.json();

  // Validate response fields
  expect(responseBody.id).toBe(10);
  expect(responseBody.petId).toBe(198772);
  expect(responseBody.quantity).toBe(7);
  expect(responseBody.status).toBe('approved');
  expect(responseBody.complete).toBe(true);

  // Validate ship date
  expect(new Date(responseBody.shipDate).toISOString()).toBe(
    new Date(requestBody.shipDate).toISOString()
  );
});