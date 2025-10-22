import express from "express";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import tagsRoutes from "./routes/tagsRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use("/sessions", sessionsRoutes);
app.use("/tags", tagsRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from Express and Typescript");
});

export default app;
