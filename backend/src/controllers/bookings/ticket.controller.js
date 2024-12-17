import {
  dbGetAllTickets,
  dbGetTicket,
  dbCreateTicket,
  dbUpdateTicket,
  dbDeleteTicket,
} from "../../services/bookings/ticket.service";
import {
  dbGetCustomerById,
  dbUpdateCustomer,
} from "../../services/users/customer.service";

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

    if (
      user.role !== "admin" &&
      !user.bookingHistory.includes(ticketData.bookingId)
    ) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    return res.status(200).send({
      data: ticketData,
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