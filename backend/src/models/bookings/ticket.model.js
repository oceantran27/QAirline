class Ticket {
  generateTicketId() {
    const timestamp = Date.now();
    return `TK${timestamp}`;
  }

  constructor(
    ticketId = null,
    bookingId,
    flightId,
    price,
    seatCode,
    flightClass,
    ownerData,
    status = "Active"
  ) {
    this.ticketId = ticketId || this.generateTicketId();
    this.bookingId = bookingId;
    this.flightId = flightId;
    this.price = price;
    this.seatCode = seatCode;
    this.flightClass = flightClass;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.ownerData = ownerData;
    this.status = status;
  }

  isCancelled() {
    return this.status === "Cancelled";
  }

  cancelTicket() {
    this.status = "Cancelled";
  }

  toObject() {
    return {
      ticketId: this.ticketId,
      bookingId: this.bookingId,
      flightId: this.flightId,
      price: this.price,
      seatCode: this.seatCode,
      flightClass: this.flightClass,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ownerData: this.ownerData,
      status: this.status,
    };
  }
}

export default Ticket;
