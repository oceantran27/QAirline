import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  cancelTicket,
  createTickets,
  updateSeatCodeTickets,
} from "../../controllers/bookings/ticket.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/all", authenticateToken, checkAdminRole, getAllTickets);
router.get("/", authenticateToken, getTicket);
router.put("/update-seats", authenticateToken, updateSeatCodeTickets);
// router.post("/new", authenticateToken, createTickets);
// router.put("/update", authenticateToken, updateTicket);
// router.delete("/delete", authenticateToken, deleteTicket);
router.put("/cancel", authenticateToken, cancelTicket);

export default router;
