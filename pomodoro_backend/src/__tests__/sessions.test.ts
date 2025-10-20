// @ts-ignore
import request from "supertest";
import { describe, test, expect } from "vitest";
import app from "../app.js";

describe("Sessions endpoint", () => {
  //id
  let sessionId: string;

  //individual tests

  // Get sessions
  describe("GET /sessions", () => {
    test("Fetch all sessions", async () => {
      const response = await request(app).get("/sessions");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  // Create a new session
  describe("POST /sessions", () => {
    test("Post a new session", async () => {
      const response = await request(app).post("/sessions").send({
        duration: 25,
        tag: "focus",
        completedAt: "2025-10-20T10:00:00Z",
        type: "work",
        pomodoroCount: 3,
      });
      expect(response.status).toBe(201);
      sessionId = response.body.id;
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("duration");
      expect(response.body).toHaveProperty("tag");
      expect(response.body).toHaveProperty("completedAt");
      expect(response.body).toHaveProperty("pomodoroCount");
      expect(response.body).toHaveProperty("type");
    });
  });

  // Get a session
  describe("GET /sessions/:id", () => {
    test("GET a session", async () => {
      const response = await request(app).get(`/sessions/${sessionId}`);
      expect(response.status).toBe(200);
    });
  });

  // Delete a session
  describe("DELETE /sessions/:id", () => {
    test("Delete a session", async () => {
      const response = await request(app).delete(`/sessions/${sessionId}`);
      expect(response.status).toBe(204);
    });
  });
});
