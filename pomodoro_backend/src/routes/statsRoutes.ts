import { Router } from "express";
import {
  getStreak,
  getTodayPomodoros,
  getWeekPomodoros,
} from "../controllers/statsController.js";

const statsRoutes = Router();

statsRoutes.get("/today", getTodayPomodoros);
statsRoutes.get("/week", getWeekPomodoros);
statsRoutes.get("/streak", getStreak);

export default statsRoutes;
