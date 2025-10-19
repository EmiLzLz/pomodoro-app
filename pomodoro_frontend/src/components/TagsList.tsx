// TagsList.tsx
import React from "react";
import Icon from "@mdi/react";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import type { Tag } from "../types/Tag";

interface TagsListProps {
  tags: Tag[];
  onCreate: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, tag: Tag) => void;
}

function TagsList({ tags, onCreate, onDelete, onUpdate }: TagsListProps) {
  if (tags.length === 0) {
    return (
      <div className="tags-list-empty flex flex-col items-center justify-center py-16 px-4">
        <p
          className="text-gray-500 text-lg mb-6 text-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          There are no tags yet
        </p>
        <button
          onClick={onCreate}
          className="create-first-tag-button px-6 py-2.5 bg-[#4F46E5] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#4338CA] hover:shadow-lg active:scale-95"
          type="button"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          + Create a new tag
        </button>
      </div>
    );
  }

  return (
    <ul className="tags-list-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tags.map((tag) => (
        <li
          key={tag.id}
          className="tag-list-item w-full max-w-[995px] h-[45px] flex items-center justify-between gap-2 px-[10px] py-[9px] backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-white/20"
        >
          {/* Tag Info */}
          <div className="tag-info-wrapper flex items-center gap-2 min-w-0 flex-1">
            <span
              className="tag-color-circle w-[24px] h-[24px] rounded-full flex-shrink-0"
              style={{ backgroundColor: tag.color }}
              aria-hidden="true"
            />
            <span
              className="tag-name-text text-gray-800 font-medium text-sm truncate"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {tag.name}
            </span>
          </div>

          {/* Actions */}
          <div className="tag-actions-wrapper flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onUpdate(tag.id, tag)}
              className="tag-edit-btn p-1.5 text-[#4F46E5] rounded transition-all duration-200 hover:bg-[#4F46E5]/10 active:scale-90"
              aria-label={`Edit ${tag.name}`}
              type="button"
            >
              <Icon path={mdiPencilOutline} size={0.7} />
            </button>
            <button
              onClick={() => onDelete(tag.id)}
              className="tag-delete-btn p-1.5 text-red-500 rounded transition-all duration-200 hover:bg-red-500/10 active:scale-90"
              aria-label={`Delete ${tag.name}`}
              type="button"
            >
              <Icon path={mdiTrashCanOutline} size={0.7} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TagsList;
