import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../../controllers/bookings/ticket.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/all", authenticateToken, checkAdminRole, getAllTickets);
router.get("/", authenticateToken, getTicket);
router.post("/new", authenticateToken, createTicket);
router.put("/update", authenticateToken, updateTicket);
router.delete("/delete", authenticateToken, deleteTicket);

export default router;
