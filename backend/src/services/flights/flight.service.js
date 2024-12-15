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
    const docRef = doc(collection(db, FLIGHT_COLLECTION_NAME));
    flight.flightId = docRef.id;

    flight.createdAt = new Date();
    flight.updatedAt = new Date();

    await setDoc(docRef, flight);
  } catch (error) {
    throw new Error(`Error creating flight: ${error.message}`);
  }
};

export const dbUpdateFlight = async (flightId, updateData) => {
  try {
    const docRef = doc(db, FLIGHT_COLLECTION_NAME, flightId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Flight not found");
    }

    updateData.updatedAt = new Date();

    await updateDoc(docRef, updateData);
  } catch (error) {
    throw new Error(`Error updating flight: ${error.message}`);
  }
};

export const dbDeleteFlight = async (flightId) => {
  try {
    const docRef = doc(db, FLIGHT_COLLECTION_NAME, flightId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Flight not found");
    }

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
    console.log("Flights created successfully");
  } catch (error) {
    throw new Error(`Error creating flights: ${error.message}`);
  }
};
