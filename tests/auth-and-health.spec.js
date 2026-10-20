const { test, expect } = require('../fixtures/api-fixture');

test('health endpoint reports that the API is available', async ({ api }) => {
  const response = await api.healthCheck();

  expect(response.status()).toBe(201);
  expect(await response.text()).toBe('Created');
});

test('authentication rejects invalid credentials', async ({ api }) => {
  const response = await api.authenticate({
    username: 'invalid-user',
    password: 'invalid-password',
  });

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ reason: 'Bad credentials' });
});

test('lookup of an unknown booking returns not found', async ({ api }) => {
  const response = await api.getBooking(999999999);

  expect(response.status()).toBe(404);
});
