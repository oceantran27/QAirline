import express from "express";
import { getStatistic } from "../controllers/statistic.controller.js";

const router = express.Router();

router.get("/", getStatistic);

export default router;
