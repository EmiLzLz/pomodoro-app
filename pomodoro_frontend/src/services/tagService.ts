import type { Tag } from "../types/Tag";

const url = import.meta.env.VITE_API_URL + "tags";

export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: Tag[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tags", error);
    throw error;
  }
};

export const createTag = async (tag: Omit<Tag, "id">): Promise<Tag> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch tags data", error);
    throw error;
  }
};

export const deleteTag = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("HTTP error! Status: ${response.status}");
    }
  } catch (error) {
    console.error("Failed to delete Tag");
    throw error;
  }
};

export const updateTag = async (id: string, tag: Tag): Promise<Tag> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to update Tag", error);
    throw error;
  }
};
