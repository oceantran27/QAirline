class Booking {
  constructor({
    bookingId,
    customerId,
    flightId,
    bookingDate,
    ticketCount,
    totalPrice,
    status,
    paymentStatus,
  }) {
    this.bookingId = bookingId;
    this.customerId = customerId;
    this.flightId = flightId;
    this.bookingDate = new Date(bookingDate);
    this.ticketCount = ticketCount;
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
}

export default Booking;
