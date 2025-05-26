import { ObjectId } from "mongodb";
import { db } from "../../database/mongo.js"; // Đường dẫn đến file kết nối MongoDB

const FLIGHT_COLLECTION_NAME = "flights";

export const dbGetAllFlights = async () => {
  try {
    const flights = await db
      .collection(FLIGHT_COLLECTION_NAME)
      .find()
      .toArray();
    return flights.map((flight) => ({
      ...flight,
      flightId: flight._id.toString(), // Chuyển _id thành chuỗi
    }));
  } catch (error) {
    throw new Error(`Error getting all flights: ${error.message}`);
  }
};

export const dbGetFlightById = async (flightId) => {
  try {
    const flight = await db
      .collection(FLIGHT_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(flightId) });
    if (flight) {
      return { ...flight, flightId: flight._id.toString() };
    }
    throw new Error("Flight not found");
  } catch (error) {
    throw new Error(`Error getting flight by ID: ${error.message}`);
  }
};

export const dbCreateFlight = async (flight) => {
  try {
    flight._id = new ObjectId(); // Tạo _id mới
    flight.createdAt = new Date();
    flight.updatedAt = new Date();
    await db.collection(FLIGHT_COLLECTION_NAME).insertOne(flight);
    return { ...flight, flightId: flight._id.toString() };
  } catch (error) {
    throw new Error(`Error creating flight: ${error.message}`);
  }
};

export const dbUpdateFlight = async (flightId, updateData) => {
  try {
    const updateDataWithTimestamp = { ...updateData, updatedAt: new Date() };
    const result = await db
      .collection(FLIGHT_COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(flightId) },
        { $set: updateDataWithTimestamp }
      );
    if (result.matchedCount === 0) {
      throw new Error("Flight not found");
    }
  } catch (error) {
    throw new Error(`Error updating flight: ${error.message}`);
  }
};

export const dbUpdateFlights = async (flights) => {
  try {
    const bulkOps = flights.map((flight) => ({
      updateOne: {
        filter: { _id: new ObjectId(flight.flightId) },
        update: { $set: { ...flight, updatedAt: new Date() } },
      },
    }));
    await db.collection(FLIGHT_COLLECTION_NAME).bulkWrite(bulkOps);
    console.log("Flights updated successfully");
  } catch (error) {
    throw new Error(`Error updating flights: ${error.message}`);
  }
};

export const dbDeleteFlight = async (flightId) => {
  try {
    const result = await db
      .collection(FLIGHT_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(flightId) });
    if (result.deletedCount === 0) {
      throw new Error("Flight not found");
    }
  } catch (error) {
    throw new Error(`Error deleting flight: ${error.message}`);
  }
};

export const dbIsFlightDelayed = (flight) => {
  return flight.status === "Delayed";
};

export const dbCreateFlights = async (flights) => {
  try {
    const flightsToInsert = flights.map((flight) => ({
      ...flight,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await db.collection(FLIGHT_COLLECTION_NAME).insertMany(flightsToInsert);
    return flightsToInsert.map((flight) => ({
      ...flight,
      flightId: flight._id.toString(),
    }));
  } catch (error) {
    throw new Error(`Error creating flights: ${error.message}`);
  }
};

export const dbRemoveFlightTickets = async (flightId, cancelTickets) => {
  try {
    const flight = await db
      .collection(FLIGHT_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(flightId) });
    if (!flight) {
      throw new Error("Flight not found");
    }

    const tickets = await Promise.all(
      cancelTickets.map((ticketId) => dbGetTicket(ticketId))
    );

    const cancelSeats = tickets
      .filter((ticket) => ticket)
      .map((ticket) => ticket.seatCode);

    flight.ticketList = flight.ticketList.filter(
      (ticketId) => !cancelTickets.includes(ticketId)
    );
    flight.bookedSeats = flight.bookedSeats.filter(
      (seat) => !cancelSeats.includes(seat)
    );
    flight.updatedAt = new Date();

    await db
      .collection(FLIGHT_COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(flightId) }, { $set: flight });
  } catch (error) {
    throw new Error(`Error canceling flights: ${error.message}`);
  }
};

export const dbAddTicketsToFlights = async (flightTicketsList) => {
  try {
    const bulkOps = flightTicketsList.map(({ flightId, tickets }) => ({
      updateOne: {
        filter: { _id: new ObjectId(flightId) },
        update: {
          $addToSet: { ticketList: { $each: tickets } },
          $set: { updatedAt: new Date() },
        },
      },
    }));
    await db.collection(FLIGHT_COLLECTION_NAME).bulkWrite(bulkOps);
  } catch (error) {
    throw new Error(`Error adding tickets to flights: ${error.message}`);
  }
};
