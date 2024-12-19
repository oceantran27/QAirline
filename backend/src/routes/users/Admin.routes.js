import express from "express";
import {
  createAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAllAdmins,
  changePassword,
} from "../../controllers/users/admin.controller";
import {
  authenticateToken,
  authenticateTokenWithoutCache,
  checkAdminRole,
} from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/", authenticateTokenWithoutCache, checkAdminRole, getAdmin);
router.get("/all", authenticateToken, checkAdminRole, getAllAdmins);
router.post("/new", authenticateToken, checkAdminRole, createAdmin);
router.put("/update", authenticateToken, checkAdminRole, updateAdmin);
router.delete("/delete", authenticateToken, checkAdminRole, deleteAdmin);
router.put(
  "/change-password",
  authenticateToken,
  checkAdminRole,
  changePassword
);

router.post("/new_mock", createAdmin);
export default router;
