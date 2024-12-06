import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../../controllers/bookings/booking.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/all", authenticateToken, checkAdminRole, getAllBookings);
router.get("/", authenticateToken, getBookingById);
router.post("/new", authenticateToken, createBooking);
router.put("/update", authenticateToken, updateBooking);
router.delete("/delete", authenticateToken, deleteBooking);

export default router;
