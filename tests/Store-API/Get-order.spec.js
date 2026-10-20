//generate a code for testing the Store API's get method

import { test, expect } from '@playwright/test';

test('Get store order by ID - GET /store/order/101', async ({ request }) => {
  // Send GET request
  const response = await request.get(
    'https://petstore3.swagger.io/api/v3/store/order/101',
    {
      headers: {
        accept: 'application/json'
      }
    }
  );

  // Validate HTTP status code
  expect(response.status()).toBe(200);

  // Parse response body
  const responseBody = await response.json();

  // Validate order details
  expect(responseBody.id).toBe(101);
  expect(responseBody).toHaveProperty('petId');
  expect(responseBody).toHaveProperty('quantity');
  expect(responseBody).toHaveProperty('shipDate');
  expect(responseBody).toHaveProperty('status');
  expect(responseBody).toHaveProperty('complete');
});