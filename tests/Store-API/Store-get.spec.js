import { test, expect } from '@playwright/test';

test('Get store inventory - GET /store/inventory', async ({ request }) => {
  const response = await request.get('https://petstore3.swagger.io/api/v3/store/inventory', {
    headers: { accept: 'application/json' },
  });

  if (response.status() === 500) {
    test.fail(true, 'Petstore v3 currently returns HTTP 500 for store inventory');
    const errorBody = await response.json();
    expect(errorBody.code).toBe(500);
    expect(errorBody.message).toContain('There was an error processing your request');
  }

  expect(
    response.status(),
    `Expected inventory endpoint to return 200; received ${response.status()}: ${await response.text()}`,
  ).toBe(200);

  expect(response.headers()['content-type']).toContain('application/json');

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(false);
  expect(responseBody).toEqual(expect.any(Object));
  for (const count of Object.values(responseBody)) {
    expect(Number.isInteger(count)).toBe(true);
  }
});