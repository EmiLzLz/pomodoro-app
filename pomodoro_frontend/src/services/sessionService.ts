import type {Session} from "../types/Session";

const url = import.meta.env.VITE_API_URL + "/sessions";

export const getSessions = async (): Promise<Session[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // If the response is not ok, throw an error with the status.
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Session[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch sessions data", error);
    // re-throw the error
    throw error;
  }
};

export const createSession = async (
  session: Omit<Session, 'id'>
): Promise<Session> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to create Session", error);
    // re-throw the error
    throw error;
  }
};

export const deleteSession = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete session", error);
    // re-throw the error
    throw error;
  }
};

export const getSession = async (id: string): Promise<Session> => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to get the session", error);
    // re-throw the error
    throw error;
  }
};
