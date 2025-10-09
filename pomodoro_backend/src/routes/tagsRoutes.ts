import { Router } from "express";
import {
  allTags,
  createTag,
  deleteTag,
  updateTag,
} from "../controllers/TagController.js";

const tagsRoutes = Router();

tagsRoutes.get("/", allTags);
tagsRoutes.put("/:id", updateTag);
tagsRoutes.post("/", createTag);
tagsRoutes.delete("/:id", deleteTag);

export default tagsRoutes;
