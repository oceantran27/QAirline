class Booking {
  generateTicketId() {
    const timestamp = Date.now();
    return `BK${timestamp}`;
  }
  constructor({
    bookingId = null,
    bookerId,
    flightId,
    ticketList = [], //ticketId
    totalPrice = 0,
    status = "Confirm",
    paymentStatus = "Paid",
  }) {
    this.bookingId = bookingId || this.generateTicketId();
    this.bookerId = bookerId;
    this.flightId = flightId;
    this.ticketList = ticketList;
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
      flightId: this.flightId,
      ticketList: this.ticketList,
      totalPrice: this.totalPrice,
      status: this.status,
      paymentStatus: this.paymentStatus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Booking;
