import type { Request, Response } from "express";
import { readTags, writeTags } from "../utils/tagsHandler.js";
import { v4 as uuidv4 } from "uuid";

//All tags
export const allTags = async (req: Request, res: Response) => {
  try {
    const tags = await readTags();
    res.status(200).json(tags);
  } catch (error) {
    console.log("Tags cannot be found", error);
    res.status(500).send();
  }
};

//create a Tag
export const createTag = async (req: Request, res: Response) => {
  try {
    const tags = await readTags();

    const newTag = {
      id: uuidv4(),
      name: req.body.name,
      color: req.body.color,
    };
    tags.push(newTag);
    await writeTags(tags);
    res.status(201).json(newTag);
  } catch (error) {
    console.log("Tag cannot be added", error);
    res.status(500).send();
  }
};

// Delete tag
export const deleteTag = async (req: Request, res: Response) => {
  try {
    const tags = await readTags();
    const tagId = req.params.id;
    const tagIndex = tags.findIndex((u) => u.id === tagId);

    if (tagIndex > -1) {
      let updateTags = tags.filter((u) => u.id !== tagId);
      await writeTags(updateTags);
      res.status(204).send();
    } else {
      res.status(404).send("Tag not found");
    }
  } catch (error) {
    console.log("Session cannot be deleted", error);
    res.status(500).send();
  }
};

//Update Tag
export const updateTag = async (req: Request, res: Response) => {
  try {
    const tags = await readTags();
    const tagId = req.params.id;
    const tag = tags.find((u) => u.id === tagId);

    if (tag) {
      Object.assign(tag, req.body);
      await writeTags(tags);
      res.status(200).json(tag);
    } else {
      res.status(404).send("Tag not found");
    }
  } catch (error) {
    console.log("Tag cannot be found", error);
    res.status(500).send();
  }
};
