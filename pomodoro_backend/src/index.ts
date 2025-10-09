//Server
import express from "express";
import sessionsRoutes from "./routes/sessionsRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import tagsRoutes from "./routes/tagsRoutes.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/sessions", sessionsRoutes);
app.use("/tags", tagsRoutes);
app.use("/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World from Express and Typescript");
});

app.listen(port, () => {
  console.log(`Server listen on port: ${port}`);
});
