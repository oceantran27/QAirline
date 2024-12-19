class Booking {
  generateBookingId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
    return `BK${timestamp}${randomNumber}`;
  }
  constructor({
    bookingId = null,
    tripType = "oneWay", // "roundTrip" or "oneWay"
    bookerId,
    departureCity,
    arrivalCity,
    departureFlightId,
    returnFlightId = null,
    departureIdTickets = [],
    returnIdTickets = [],
    totalPrice = 0,
    status = "Confirm",
    paymentStatus = "Paid",
  }) {
    this.bookingId = bookingId || this.generateBookingId();
    this.bookerId = bookerId;
    this.tripType = tripType;
    this.departureCity = departureCity;
    this.arrivalCity = arrivalCity;
    this.departureFlightId = departureFlightId;
    this.returnFlightId = returnFlightId;
    this.departureIdTickets = departureIdTickets;
    this.returnIdTickets = returnIdTickets;
    this.totalPrice = totalPrice;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.createdAt = null;
    this.updatedAt = null;
  }

  isConfirmed() {
    return this.status === "Confirmed";
  }

  isPaid() {
    return this.paymentStatus === "Paid";
  }

  cancelBooking() {
    if (this.status === "Pending" || this.status === "Confirmed") {
      this.status = "Cancelled";
      this.paymentStatus = "Refunded";
    }
  }

  toObject() {
    return {
      bookingId: this.bookingId,
      bookerId: this.bookerId,
      tripType: this.tripType,
      departureCity: this.departureCity,
      arrivalCity: this.arrivalCity,
      departureFlightId: this.departureFlightId,
      returnFlightId: this.returnFlightId,
      departureIdTickets: this.departureIdTickets,
      returnIdTickets: this.returnIdTickets,
      totalPrice: this.totalPrice,
      status: this.status,
      paymentStatus: this.paymentStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Booking;
