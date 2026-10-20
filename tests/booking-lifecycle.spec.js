const { test, expect } = require('../fixtures/api-fixture');
const { makeBooking } = require('../test-data/booking-data');

test('create booking', async ({ api, token }) => {
  const booking = makeBooking();
  let bookingId;

  try {
    const response = await api.createBooking(booking);
    expect(response.status()).toBe(200);

    const result = await response.json();
    expect(result.bookingid).toEqual(expect.any(Number));
    expect(result.booking).toMatchObject(booking);
    bookingId = result.bookingid;
  } finally {
    if (bookingId) {
      const cleanupResponse = await api.deleteBooking(bookingId, token);
      expect(cleanupResponse.status()).toBe(201);
    }
  }
});

test('read booking by ID', async ({ api, booking }) => {
  const response = await api.getBooking(booking.id);

  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject(booking.data);
});

test('list bookings with the documented filters', async ({ api, booking }) => {
  const allBookingsResponse = await api.getBookings();
  expect(allBookingsResponse.status()).toBe(200);
  expect(await allBookingsResponse.json()).toEqual(
    expect.arrayContaining([expect.objectContaining({ bookingid: booking.id })]),
  );

  for (const filters of [
    { firstname: booking.data.firstname },
    { lastname: booking.data.lastname },
  ]) {
    const response = await api.getBookings(filters);
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(
      expect.arrayContaining([expect.objectContaining({ bookingid: booking.id })]),
    );
  }

  for (const filters of [
    { checkin: booking.data.bookingdates.checkin },
    { checkout: booking.data.bookingdates.checkout },
  ]) {
    const response = await api.getBookings(filters);
    expect(response.status()).toBe(200);
    const results = await response.json();
    expect(Array.isArray(results)).toBe(true);
    for (const result of results) {
      expect(result.bookingid).toEqual(expect.any(Number));
    }
  }
});

test('update booking with PUT', async ({ api, booking, token }) => {
  const updatedBooking = {
    ...booking.data,
    firstname: `Updated${booking.data.firstname}`,
    totalprice: 350,
  };
  const response = await api.updateBooking(booking.id, updatedBooking, token);

  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject(updatedBooking);
});

test('partially update booking with PATCH', async ({ api, booking, token }) => {
  const response = await api.patchBooking(
    booking.id,
    { additionalneeds: 'Late checkout' },
    token,
  );

  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({
    ...booking.data,
    additionalneeds: 'Late checkout',
  });
});

test('delete booking', async ({ api, booking }) => {
  const response = await booking.remove();

  expect(response.status()).toBe(201);

  const lookupResponse = await api.getBooking(booking.id);
  expect(lookupResponse.status()).toBe(404);
});
