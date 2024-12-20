import Ticket from "../../models/bookings/ticket.model.js";
import {
  dbGetAllTickets,
  dbGetTicket,
  dbCreateTicket,
  dbUpdateTicket,
  dbDeleteTicket,
  dbCreateTickets,
  dbUpdateSeatCodesForTickets,
  dbGetTicketsByIds,
} from "../../services/bookings/ticket.service.js";
import {
  dbGetFlightById,
  dbRemoveFlightTickets,
} from "../../services/flights/flight.service.js";
import {
  dbGetCustomerById,
  dbUpdateCustomer,
} from "../../services/users/customer.service.js";

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await dbGetAllTickets();
    return res.status(200).send({
      data: tickets,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    const ticketData = await dbGetTicket(req.query.id);

    console.log(user);
    console.log(ticketData);

    // if (
    //   user.role !== "admin" &&
    //   !user.bookingHistory.includes(ticketData.bookingId)
    // ) {
    //   return res.status(403).send({
    //     message: "You do not have permission to perform this action",
    //   });
    // }

    return res.status(200).send({
      data: ticketData,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const flightId = req.query.flightId;
    const flight = await dbGetFlightById(flightId);
    const tickets = await dbGetTicketsByIds(flight.ticketList);
    return res.status(200).send({
      data: tickets,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createTicket = async (req, res) => {
  try {
    const ticket = req.body;
    ticket.createdAt = new Date();
    ticket.updatedAt = new Date();

    if (
      user.role !== "admin" &&
      !user.bookingHistory.includes(ticketData.bookingId)
    ) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    const customerRef = await dbGetCustomerById(ticket.bookerId);
    if (!customerRef) {
      return res.status(404).send({
        message: "Customer not found",
      });
    }

    const createdTicket = await dbCreateTicket(ticket);

    const updatedTicketHistory = [
      ...customerRef.ticketHistory,
      createdTicket.ticketId,
    ];

    await dbUpdateCustomer(ticket.bookerId, {
      ticketHistory: updatedTicketHistory,
    });

    res.status(201).send({
      message: "Ticket created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const updateData = req.body;
    const ticketId = req.query.id;

    const ticketData = await dbGetTicket(ticketId);
    if (!ticketData) {
      return res.status(404).send({
        message: "Ticket not found",
      });
    }

    if (
      user.role !== "admin" &&
      !user.bookingHistory.includes(ticketData.bookingId)
    ) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbUpdateTicket(ticketId, { ...updateData, updatedAt: new Date() });
    return res.status(200).send({
      message: "Ticket updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.query.id;

    const ticketData = await dbGetTicket(ticketId);
    if (!ticketData) {
      return res.status(404).send({
        message: "Ticket not found",
      });
    }

    const user = req.user;
    if (
      user.role !== "admin" &&
      !user.bookingHistory.includes(ticketData.bookingId)
    ) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbDeleteTicket(ticketId);
    res.status(200).send({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const cancelTicket = async (req, res) => {
  try {
    const ticketId = req.query.id;

    const ticketData = await dbGetTicket(ticketId);
    if (!ticketData) {
      return res.status(404).send({
        message: "Ticket not found",
      });
    }
    ticketData.status = "Cancelled";

    const user = req.user;
    if (
      user.role !== "admin" &&
      !user.bookingHistory.includes(ticketData.bookingId)
    ) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    await dbRemoveFlightTickets(ticketData.flightId, [ticketId]);

    await dbUpdateTicket(ticketId, { ...ticketData, updatedAt: new Date() });
    return res.status(200).send({
      message: "Ticket cancelled successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createTickets = async (req, res) => {
  try {
    const ticketDataList = req.body;
    let tickets = [];
    for (let ticketData of ticketDataList) {
      let ticket = new Ticket(
        null,
        ticketData.bookingId,
        ticketData.flightId,
        ticketData.price,
        null,
        ticketData.flightClass,
        ticketData.ownerData
      );
      tickets.push(ticket);
    }
    await dbCreateTickets(tickets);
    res.status(201).send({
      message: "Tickets created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateSeatCodeTickets = async (req, res) => {
  try {
    const ticketDataList = req.body;
    await dbUpdateSeatCodesForTickets(ticketDataList);
    res.status(200).send({
      message: "Tickets updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
