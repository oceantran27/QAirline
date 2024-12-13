import firebase from "../../database/firebase";
import Booking from "../../models/bookings/booking.model";
import {
  dbGetAllBookings,
  dbGetBookingById,
  dbCreateBooking,
  dbUpdateBooking,
  dbDeleteBooking,
} from "../../services/bookings/booking.service";
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
import { dbUpdateCustomer } from "../users/customer.controller";

const db = getFirestore(firebase);
const BOOKING_COLLECTION_NAME = "bookings";

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

export const getBookingById = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin" && user.uid !== bookingData.customerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    const bookingData = await dbGetBookingById(req.query.id);
    const booking = new Booking({ ...bookingData });
    return res.status(200).send({
      data: booking,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    booking.createdAt = new Date();
    booking.updatedAt = new Date();

    const user = req.user;
    if (user.role !== "admin" && user.uid !== booking.customerId) {
      return res.status(403).send({
        message: "You do not have permission to perform this action",
      });
    }

    // Kiểm tra booking đã tồn tại chưa
    const existingBooking = await dbGetBookingById(booking.bookingId);
    if (existingBooking) {
      return res.status(400).send({
        message: "Booking already exists",
      });
    }

    const customerRef = await dbgetCustomer(booking.customerId);
    if (!customerRef) {
      return res.status(404).send({
        message: "Customer not found",
      });
    }

    const updatedBookingHistory = [
      ...customerRef.bookingHistory,
      booking.bookingId,
    ];

    await dbUpdateCustomer(booking.customerId, {
      bookingHistory: updatedBookingHistory,
    });

    await dbCreateBooking(booking);
    res.status(201).send({
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
    const docRef = doc(db, BOOKING_COLLECTION_NAME, updateData.bookingId);
    const docSnap = await getDoc(docRef);
    const bookingData = docSnap.data();
    if (docSnap.exists()) {
      const user = req.user;
      if (user.role !== "admin" && user.uid !== bookingData.customerId) {
        return res.status(403).send({
          message: "You do not have permission to perform this action",
        });
      }

      await updateDoc(docRef, { ...updateData, updatedAt: new Date() });
      return res.status(200).send({
        message: "Booking updated successfully",
      });
    } else {
      return res.status(404).send({
        message: "Booking not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const docRef = doc(db, BOOKING_COLLECTION_NAME, req.query.id);
    const docSnap = await getDoc(docRef);
    const bookingData = docSnap.data();
    if (docSnap.exists()) {
      const user = req.user;
      if (user.role !== "admin" && user.uid !== bookingData.customerId) {
        return res.status(403).send({
          message: "You do not have permission to perform this action",
        });
      }
      await deleteDoc(docRef);
      res.status(200).send({
        message: "Booking deleted successfully",
      });
    } else {
      return res.status(404).send({
        message: "Booking not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
