import { Router } from "express";
import { allSessions, createSession, deleteSessions, getSession } from "../controllers/sessionsController.js";

const sessionsRoutes = Router();

sessionsRoutes.get("/", allSessions);
sessionsRoutes.get("/:id", getSession);
sessionsRoutes.post("/", createSession);
sessionsRoutes.delete("/:id", deleteSessions)

export default sessionsRoutes;