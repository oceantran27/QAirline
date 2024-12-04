import express from "express";
import {
  createCustomer,
  getCurrentCustomer,
  updateCurrentCustomer,
  deleteCurrentCustomer,
} from "../../controllers/users/customer.controller";

import { getAllCustomers } from "../../controllers/users/admin.controller";

const router = express.Router();

router.get("/", getCurrentCustomer);
router.get("/all", getAllCustomers);
router.post("/new", createCustomer);
router.put("/update", updateCurrentCustomer);
router.delete("/delete", deleteCurrentCustomer);

export default router;
