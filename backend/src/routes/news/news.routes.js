import express from "express";
import {
  getAllNews,
  getNews,
  createNews,
  createBulkNews,
  updateNews,
  deleteNews,
  getNewsByStatus,
} from "../../controllers/news/news.controller";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/auth.middleware";
import upload from "../../middleware/uploadImage.middleware";

const router = express.Router();

router.get("/all", getAllNews);
router.get("/", getNews);
router.post(
  "/create",
  authenticateToken,
  checkAdminRole,
  upload.single("news-image"),
  createNews
);
router.post("/bulk-create", authenticateToken, checkAdminRole, createBulkNews);
router.put("/update", authenticateToken, checkAdminRole, updateNews);
router.delete("/delete", authenticateToken, checkAdminRole, deleteNews);
router.get("/status", getNewsByStatus);

export default router;
