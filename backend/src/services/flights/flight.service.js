import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import firebase from "../../database/firebase";
import { dbGetTicket } from "../bookings/ticket.service";

const db = getFirestore(firebase);
const FLIGHT_COLLECTION_NAME = "flights";

export const dbGetAllFlights = async () => {
  try {
    const snapshot = await getDocs(collection(db, FLIGHT_COLLECTION_NAME));
    const flights = snapshot.docs.map((doc) => ({
      ...doc.data(),
      flightId: doc.id,
    }));
    return flights;
  } catch (error) {
    throw new Error(`Error getting all flights: ${error.message}`);
  }
};

export const dbGetFlightById = async (flightId) => {
  try {
    const docRef = doc(db, FLIGHT_COLLECTION_NAME, flightId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("Flight not found");
  } catch (error) {
    throw new Error(`Error getting flight by ID: ${error.message}`);
  }
};

export const dbCreateFlight = async (flight) => {
  try {
    const docRef = doc(collection(db, FLIGHT_COLLECTION_NAME), flight.flightId);

    flight.createdAt = new Date();
    flight.updatedAt = new Date();

    await setDoc(docRef, flight.toObject());
  } catch (error) {
    throw new Error(`Error creating flight: ${error.message}`);
  }
};

export const dbUpdateFlight = async (flightId, updateData) => {
  try {
    const docRef = doc(db, FLIGHT_COLLECTION_NAME, flightId);
    const updateDataWithTimestamp = { ...updateData, updatedAt: new Date() };

    await updateDoc(docRef, updateDataWithTimestamp);
  } catch (error) {
    throw new Error(`Error updating flight: ${error.message}`);
  }
};

export const dbUpdateFlights = async (flights) => {
  try {
    const batch = writeBatch(db);

    flights.forEach((flight) => {
      const flightRef = doc(db, "flights", flight.flightId);
      const updatedFlightData = {
        ...flight,
        updatedAt: new Date(),
      };

      batch.update(flightRef, updatedFlightData);
    });

    await batch.commit();
    console.log("Flights updated successfully");
  } catch (error) {
    throw new Error(`Error updating flights: ${error.message}`);
  }
};

export const dbDeleteFlight = async (flightId) => {
  try {
    const docRef = doc(db, FLIGHT_COLLECTION_NAME, flightId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Error deleting flight: ${error.message}`);
  }
};

export const dbIsFlightDelayed = (flight) => {
  return flight.status === "Delayed";
};

export const dbCreateFlights = async (flights) => {
  try {
    const batch = writeBatch(db);

    flights.forEach((flight) => {
      const docRef = doc(
        collection(db, FLIGHT_COLLECTION_NAME),
        flight.flightId
      );
      flight.createdAt = new Date();
      flight.updatedAt = new Date();
      batch.set(docRef, flight.toObject());
    });

    await batch.commit();
  } catch (error) {
    throw new Error(`Error creating flights: ${error.message}`);
  }
};

export const dbRemoveFlightTickets = async (flightId, cancelTickets) => {
  try {
    const docRef = doc(db, FLIGHT_COLLECTION_NAME, flightId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Flight not found");
    }

    const flight = docSnap.data();

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

    await updateDoc(docRef, flight);
  } catch (error) {
    throw new Error(`Error canceling flights: ${error.message}`);
  }
};

export const dbAddTicketsToFlights = async (flightTicketsList) => {
  try {
    const batch = writeBatch(db);

    const flightIds = flightTicketsList.map(({ flightId }) => flightId);

    const flightRefs = flightIds.map((flightId) =>
      doc(db, FLIGHT_COLLECTION_NAME, flightId)
    );
    const flightSnaps = await Promise.all(
      flightRefs.map((flightRef) => getDoc(flightRef))
    );

    flightSnaps.forEach((flightSnap, index) => {
      if (!flightSnap.exists()) {
        throw new Error(`Flight with ID ${flightIds[index]} not found`);
      }

      const flightData = flightSnap.data();
      const tickets = flightTicketsList[index].tickets;

      const updatedTicketList = [
        ...new Set([...flightData.ticketList, ...tickets]),
      ];

      batch.update(flightRefs[index], {
        ticketList: updatedTicketList,
        updatedAt: new Date(),
      });
    });

    await batch.commit();
  } catch (error) {
    throw new Error(`Error adding tickets to flights: ${error.message}`);
  }
};
