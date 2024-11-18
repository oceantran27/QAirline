import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../../controllers/users/Customer.controller";

const router = express.Router();

router.get("/", getCustomers);
router.post("/new", createCustomer);
router.get("/:id", getCustomerById);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

export default router;
