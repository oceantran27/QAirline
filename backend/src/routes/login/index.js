import express from "express";
import {
  handleAdminLogin,
  handleCustomerLogin,
  handleLogin,
} from "../../controllers/login";

const router = express.Router();

router.post("/", handleLogin);
router.post("/admin", handleAdminLogin);
router.post("/customer", handleCustomerLogin);

export default router;
