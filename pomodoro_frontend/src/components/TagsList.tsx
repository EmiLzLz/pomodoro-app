import React from "react";
import type { Tag } from "../types/Tag";

interface tagsListProps {
  tags: Tag[];
  onCreate: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, tag: Tag) => void;
}

function TagsList({ tags, onCreate, onDelete, onUpdate }: tagsListProps) {
  return (
    <div className="tagsList-container">
      <h2>Tags</h2>
      <button onClick={onCreate}>+ Create a new tag</button>
      <div className="separator h-4 bg-amber-600"></div>
      {tags.length === 0 ? (
        <p>There is not Tags yet</p>
      ) : (
        <ul>
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <span>{tag.name}</span>
              <div
                style={{ width: 20, height: 20, backgroundColor: tag.color }}
              ></div>
              <div className="space-x-2">
                <button
                  onClick={() => onUpdate(tag.id, tag)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(tag.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsList;
