import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import firebase from "../../database/firebase.js";

const db = getFirestore(firebase);
const BOOKING_COLLECTION_NAME = "bookings";

export const dbGetAllBookings = async () => {
  try {
    const snapshot = await getDocs(collection(db, BOOKING_COLLECTION_NAME));
    const bookings = snapshot.docs.map((doc) => ({
      ...doc.data(),
      bookingId: doc.id,
    }));
    return bookings;
  } catch (error) {
    throw new Error(`Error getting all bookings: ${error.message}`);
  }
};

export const dbGetBooking = async (bookingId) => {
  try {
    console.log(bookingId);
    const docRef = doc(db, BOOKING_COLLECTION_NAME, bookingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("Booking not found");
  } catch (error) {
    throw new Error(`Error getting booking by ID: ${error.message}`);
  }
};

export const dbCreateBooking = async (booking) => {
  try {
    const docRef = doc(
      collection(db, BOOKING_COLLECTION_NAME),
      booking.bookingId
    );
    await setDoc(docRef, booking.toObject());
    return booking;
  } catch (error) {
    throw new Error(`Error creating booking: ${error.message}`);
  }
};

export const dbUpdateBooking = async (bookingId, updateData) => {
  try {
    const docRef = doc(db, BOOKING_COLLECTION_NAME, bookingId);
    await updateDoc(docRef, updateData);
  } catch (error) {
    throw new Error(`Error updating booking: ${error.message}`);
  }
};

export const dbDeleteBooking = async (bookingId) => {
  try {
    const docRef = doc(db, BOOKING_COLLECTION_NAME, bookingId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error(`Error deleting booking: ${error.message}`);
  }
};
