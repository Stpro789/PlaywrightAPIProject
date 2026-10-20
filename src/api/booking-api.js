class BookingApi {
  constructor(request) {
    this.request = request;
  }

  getBookings(filters = {}) {
    return this.request.get('/booking', { params: filters });
  }

  getBooking(bookingId) {
    return this.request.get(`/booking/${bookingId}`);
  }

  createBooking(booking) {
    return this.request.post('/booking', { data: booking });
  }

  authenticate(credentials) {
    return this.request.post('/auth', { data: credentials });
  }

  updateBooking(bookingId, booking, token) {
    return this.request.put(`/booking/${bookingId}`, {
      data: booking,
      headers: this.authHeaders(token),
    });
  }

  patchBooking(bookingId, updates, token) {
    return this.request.patch(`/booking/${bookingId}`, {
      data: updates,
      headers: this.authHeaders(token),
    });
  }

  deleteBooking(bookingId, token) {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: this.authHeaders(token),
    });
  }

  healthCheck() {
    return this.request.get('/ping');
  }

  authHeaders(token) {
    return { Cookie: `token=${token}` };
  }
}

module.exports = { BookingApi };
