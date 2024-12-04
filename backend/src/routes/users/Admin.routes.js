import express from "express";
import {
  createMockAdmin,
  createAdmin,
  getCurrentAdmin,
  updateCurrentAdmin,
  deleteCurrentAdmin,
  getAllAdmins,
} from "../../controllers/users/admin.controller";

const router = express.Router();

router.get("/", getCurrentAdmin);
router.get("/all", getAllAdmins);
router.post("/new", createAdmin);
router.put("/update", updateCurrentAdmin);
router.delete("/delete", deleteCurrentAdmin);

router.post("/new_mock", createMockAdmin);
export default router;
