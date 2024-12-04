import express from "express";
import {
  createCustomer,
  getCurrentCustomer,
  updateCurrentCustomer,
  deleteCurrentCustomer,
} from "../../controllers/users/customer.controller";
import { getAllCustomers } from "../../controllers/users/admin.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateToken, getCurrentCustomer);
router.get("/all", authenticateToken, checkAdminRole, getAllCustomers);
router.post("/new", createCustomer);
router.put("/update", authenticateToken, updateCurrentCustomer);
router.delete("/delete", authenticateToken, deleteCurrentCustomer);

export default router;
