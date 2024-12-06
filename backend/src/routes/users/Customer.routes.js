import express from "express";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../../controllers/users/customer.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateToken, getCustomer);
router.get("/all", authenticateToken, checkAdminRole, getAllCustomers);
router.post("/new", createCustomer);
router.put("/update", authenticateToken, updateCustomer);
router.delete("/delete", authenticateToken, deleteCustomer);

export default router;
