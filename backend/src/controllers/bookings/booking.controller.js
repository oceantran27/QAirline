import {
  dbGetAllBookings,
  dbGetBooking,
  dbCreateBooking,
  dbUpdateBooking,
  dbDeleteBooking,
} from "../../services/bookings/booking.service";
import {
  dbCancelTickets,
  dbCreateTickets,
} from "../../services/bookings/ticket.service";
import {
  dbGetCustomerById,
  dbUpdateCustomer,
} from "../../services/users/customer.service";

import Booking from "../../models/bookings/booking.model";
import Ticket from "../../models/bookings/ticket.model";
import { dbRemoveFlightTickets } from "../../services/flights/flight.service";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await dbGetAllBookings();
    return res.status(200).send({
      data: bookings,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getBooking = async (req, res) => {
  try {
    const user = req.user;
    const bookingData = await dbGetBooking(req.query.id);

    if (user.role !== "admin" && user.uid !== bookingData.bookerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    return res.status(200).send({
      data: bookingData,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { departureTicketDataList, returnTicketDataList, ...bookingData } =
      req.body;
    const booking = new Booking(bookingData);
    booking.createdAt = new Date();
    booking.updatedAt = new Date();

    const user = req.user;
    if (user.role !== "admin" && user.uid !== booking.bookerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    const customerRef = await dbGetCustomerById(booking.bookerId);
    if (!customerRef) {
      return res.status(404).send({
        message: "Customer not found",
      });
    }

    let tickets = [];

    for (let ticketData of departureTicketDataList) {
      booking.totalPrice += ticketData.price;

      const ticket = new Ticket(
        null,
        booking.bookingId,
        booking.departureFlightId,
        ticketData.price,
        ticketData.seatCode,
        ticketData.flightClass,
        ticketData.ownerData
      );

      tickets.push(ticket);
      booking.departureIdTickets.push(ticket.ticketId);
    }

    if (booking.tripType === "roundTrip") {
      for (let ticketData of returnTicketDataList) {
        booking.totalPrice += ticketData.price;

        const ticket = new Ticket(
          null,
          booking.bookingId,
          booking.returnFlightId,
          ticketData.price,
          ticketData.seatCode,
          ticketData.flightClass,
          ticketData.ownerData
        );

        tickets.push(ticket);
        booking.returnIdTickets.push(ticket.ticketId);
      }
    }

    await dbCreateTickets(tickets);

    const createdBooking = await dbCreateBooking(booking);

    const updatedBookingHistory = [
      ...customerRef.bookingHistory,
      createdBooking.bookingId,
    ];

    await dbUpdateCustomer(booking.bookerId, {
      bookingHistory: updatedBookingHistory,
    });
    res.status(201).send({
      bookingId: createdBooking.bookingId,
      message: "Booking created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const updateData = req.body;
    const bookingId = req.query.id;

    const bookingData = await dbGetBooking(bookingId);
    if (!bookingData) {
      return res.status(404).send({
        message: "Booking not found",
      });
    }

    const user = req.user;
    if (user.role !== "admin" && user.uid !== bookingData.bookerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbUpdateBooking(bookingId, { ...updateData, updatedAt: new Date() });
    return res.status(200).send({
      message: "Booking updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.query.id;

    const bookingData = await dbGetBooking(bookingId);
    if (!bookingData) {
      return res.status(404).send({
        message: "Booking not found",
      });
    }

    const user = req.user;
    if (user.role !== "admin" && user.uid !== bookingData.bookerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbDeleteBooking(bookingId);
    res.status(200).send({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.query.id;

    const bookingData = await dbGetBooking(bookingId);
    if (!bookingData) {
      return res.status(404).send({
        message: "Booking not found",
      });
    }
    bookingData.status = "Cancelled";

    const user = req.user;
    if (user.role !== "admin" && user.uid !== bookingData.bookerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbCancelTickets(bookingData.ticketList);

    await dbRemoveFlightTickets(bookingData.flightId, bookingData.ticketList);

    await dbUpdateBooking(bookingId, {
      ...bookingData,
      updatedAt: new Date(),
    });
    return res.status(200).send({
      message: "Booking updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
