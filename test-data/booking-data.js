const credentials = Object.freeze({
  username: 'admin',
  password: 'password123',
});

function makeBooking() {
  const uniqueId = `${Date.now()}${process.pid}`;
  const checkin = new Date().toISOString().slice(0, 10);
  const checkoutDate = new Date();
  checkoutDate.setUTCDate(checkoutDate.getUTCDate() + 1);

  return {
    firstname: `API${uniqueId}`,
    lastname: 'Automation',
    totalprice: 275,
    depositpaid: true,
    bookingdates: {
      checkin,
      checkout: checkoutDate.toISOString().slice(0, 10),
    },
    additionalneeds: 'Breakfast',
  };
}

module.exports = { credentials, makeBooking };
