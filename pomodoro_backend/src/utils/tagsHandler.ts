import { readFile, writeFile } from "fs/promises";
import type Tag from "../types/Tag.ts";

const filePath = "src/data/tags.json";

export async function writeTags(tags: Tag[]): Promise<void> {
  try {
    //write array
    const jsonString = JSON.stringify(tags, null, 2);
    await writeFile(filePath, jsonString, "utf-8");

    console.log("Successfully wrote data to tags.json");
  } catch (error) {
    console.error("Error writing tags: ", error);
    throw error;
  }
}

export async function readTags(): Promise<Tag[]> {
  try {
    //read array
    console.log("Reading session from file...");
    const fileContents = await readFile(filePath, "utf8");

    const tags: Tag[] = JSON.parse(fileContents);
    console.log("Successfully read Tags");
    return tags;
  } catch (error) {
    console.error("Error reading tags: ", error);
    return []; // Empty array if the file doesnt exist
  }
}
