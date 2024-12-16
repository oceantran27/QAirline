import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
} from "../../controllers/bookings/booking.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/all", authenticateToken, checkAdminRole, getAllBookings);
router.get("/", authenticateToken, getBooking);
router.post("/new", authenticateToken, createBooking);
router.put("/cancel", authenticateToken, cancelBooking);
// router.put("/update", authenticateToken, updateBooking);
// router.delete("/delete", authenticateToken, deleteBooking);

export default router;
