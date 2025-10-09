import type { Request, Response } from "express";
import { readSessions, writeSessions } from "../utils/sessionHandler.js";
//import { sessions } from "./data/sessions.json";
import { v4 as uuidv4 } from "uuid";

//list all sessions
export const allSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();
    res.status(200).json(sessions);
  } catch (error) {
    console.log("Sessions cannot be found", error);
    res.status(500).send();
  }
};

//create a new session
export const createSession = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();

    const newSession = {
      id: uuidv4(),
      duration: req.body.duration,
      tag: req.body.tag,
      completedAt: req.body.completed,
      type: req.body.type,
      pomodoroCount: req.body.count,
    };
    sessions.push(newSession);
    await writeSessions(sessions);
    res.status(201).json(newSession);
  } catch (error) {
    console.log("Sessions cannot be added", error);
    res.status(500).send();
  }
};

//Delete sessions
export const deleteSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();
    const sessionId = req.params.id;
    const sessionIndex = sessions.findIndex((u) => u.id === sessionId);

    if (sessionIndex > -1) {
      let updateSessions = sessions.filter((u) => u.id !== sessionId);
      await writeSessions(updateSessions);
      res.status(204).send();
    } else {
      res.status(404).send("Session not found");
    }
  } catch (error) {
    console.log("Session cannot be deleted", error);
    res.status(500).send();
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const sessions = await readSessions();
    const sessionId = req.params.id;
    const session = sessions.find((u) => u.id === sessionId);

    if (session) {
      res.status(200).json(session);
    } else {
      res.status(404).send("Session not found");
    }
  } catch (error) {
    console.log("Session cannot be found", error);
    res.status(500).send();
  }
};
