import { readFile, writeFile } from "fs/promises";
import type Session from "../types/Session.ts";

const filePath = "src/data/sessions.json";

export async function writeSessions(sessions: Session[]): Promise<void> {
  try {
    //write array
    const jsonString = JSON.stringify(sessions, null, 2);
    await writeFile(filePath, jsonString, "utf8");

    console.log("Successfully wrote data to sessions.json");
  } catch (error) {
    console.error("Error writing sessions: ", error);
    throw error;
  }
}

export async function readSessions(): Promise<Session[]> {

  try {
    // read array
    console.log("Reading session array from file...");
    const fileContents = await readFile(filePath, "utf8");

    const sessions: Session[] = JSON.parse(fileContents);
    console.log("Successfully read Sessions");
    return sessions;

  } catch (error) {
    console.error("Error reading sessions: ", error);
    return []; // Empty array if the file doesnt exist
  }
}
