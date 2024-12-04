import express from "express";
import {
  createMockAdmin,
  createAdmin,
  getCurrentAdmin,
  updateCurrentAdmin,
  deleteCurrentAdmin,
  getAllAdmins,
} from "../../controllers/users/admin.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateToken, getCurrentAdmin);
router.get("/all", authenticateToken, checkAdminRole, getAllAdmins);
router.post("/new", authenticateToken, checkAdminRole, createAdmin);
router.put("/update", authenticateToken, updateCurrentAdmin);
router.delete("/delete", authenticateToken, deleteCurrentAdmin);

router.post("/new_mock", createMockAdmin);
export default router;
