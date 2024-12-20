import express from "express";
import {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  searchFlight,
  getFlightSuggestions,
} from "../../controllers/flights/flight.controller.js";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/Auth.middleware.js";

const router = express.Router();

router.get("/search", searchFlight);
router.get("/all", getAllFlights);
router.get("/", getFlightById);
router.post("/new", authenticateToken, checkAdminRole, createFlight);
router.put("/update", authenticateToken, checkAdminRole, updateFlight);
router.delete("/delete", authenticateToken, checkAdminRole, deleteFlight);
router.get("/all", getAllFlights);
router.get("/suggest", getFlightSuggestions);

export default router;
