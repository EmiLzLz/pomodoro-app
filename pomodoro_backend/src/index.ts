//Server
import express from "express";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import tagsRoutes from "./routes/tagsRoutes.js";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/sessions", sessionsRoutes);
app.use("/tags", tagsRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from Express and Typescript");
});

app.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
