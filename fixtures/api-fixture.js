const { test: base, expect } = require('@playwright/test');
const { BookingApi } = require('../src/api/booking-api');
const { credentials, makeBooking } = require('../test-data/booking-data');

const test = base.extend({
  api: async ({ request }, use) => {
    await use(new BookingApi(request));
  },
  token: async ({ api }, use) => {
    const response = await api.authenticate(credentials);
    if (response.status() !== 200) {
      throw new Error(`Authentication failed with status ${response.status()}`);
    }

    const { token } = await response.json();
    if (!token) {
      throw new Error('Authentication response did not include a token');
    }

    await use(token);
  },
  booking: async ({ api, token }, use) => {
    const booking = makeBooking();
    const response = await api.createBooking(booking);
    if (response.status() !== 200) {
      throw new Error(`Booking setup failed with status ${response.status()}`);
    }

    const { bookingid: bookingId } = await response.json();
    if (!bookingId) {
      throw new Error('Booking setup response did not include a booking ID');
    }

    let deleted = false;
    await use({
      id: bookingId,
      data: booking,
      remove: async () => {
        const deleteResponse = await api.deleteBooking(bookingId, token);
        deleted = deleteResponse.status() === 201;
        return deleteResponse;
      },
    });

    if (!deleted) {
      const cleanupResponse = await api.deleteBooking(bookingId, token);
      if (cleanupResponse.status() !== 201) {
        throw new Error(`Booking cleanup failed with status ${cleanupResponse.status()}`);
      }
    }
  },
});

module.exports = { test, expect };
