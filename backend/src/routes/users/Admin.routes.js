import express from "express";
import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "../../controllers/users/Admin.controller";

const router = express.Router();

router.get("/", getAdmins);
router.post("/new", createAdmin);
router.get("/:id", getAdminById);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deleteAdmin);

export default router;
