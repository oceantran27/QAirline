import express from "express";
import {
  getAllNews,
  getNews,
  createNews,
  createBulkNews,
  updateNews,
  deleteNews,
  getNewsByStatus,
} from "../../controllers/news/news.controller.js";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/Auth.middleware.js";
import upload from "../../middleware/uploadImage.middleware.js";

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
router.put(
  "/update",
  authenticateToken,
  checkAdminRole,
  upload.single("news-image"),
  updateNews
);
router.delete("/delete", authenticateToken, checkAdminRole, deleteNews);
router.get("/status", getNewsByStatus);

export default router;
