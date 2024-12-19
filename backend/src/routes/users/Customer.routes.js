import express from "express";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  changePassword,
} from "../../controllers/users/customer.controller";
import {
  authenticateToken,
  authenticateTokenWithoutCache,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateTokenWithoutCache, getCustomer);
router.get("/all", authenticateToken, checkAdminRole, getAllCustomers);
router.post("/new", createCustomer);
router.put("/update", authenticateToken, updateCustomer);
router.delete("/delete", authenticateToken, deleteCustomer);
router.put("/change-password", authenticateToken, changePassword);

export default router;
