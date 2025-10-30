// TagSelector.tsx
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from "@mdi/js";
import type { Tag } from "../types/Tag";

interface TagSelectorProps {
  tags: Tag[];
  selectedTag: string;
  onChange: (value: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTag,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedTagData = tags.find((tag) => tag.id === selectedTag);

  const handleSelectTag = (tagId: string) => {
    onChange(tagId);
    setIsOpen(false);
  };

  return (
    <div className="tag-selector-wrapper w-full max-w-md">
      <label
        htmlFor="tag-selector"
        className="tag-selector-label block text-gray-700 font-medium mb-2 text-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Select your Tag
      </label>

      {/* Custom Select */}
      <div className="tag-selector-custom relative">
        <button
          id="tag-selector"
          onClick={() => setIsOpen(!isOpen)}
          className="tag-selector-button w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded transition-all duration-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="tag-selector-current flex items-center gap-2">
            {selectedTagData ? (
              <>
                <span
                  className="tag-color-circle w-[15px] h-[15px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedTagData.color }}
                  aria-hidden="true"
                />
                <span className="tag-name text-gray-800 font-medium text-sm">
                  {selectedTagData.name}
                </span>
              </>
            ) : (
              <span className="tag-placeholder text-gray-400 text-sm">
                Select a tag
              </span>
            )}
          </div>

          <Icon
            path={mdiChevronDown}
            size={0.8}
            className={`tag-selector-icon text-[#4F46E5] transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <>
            {/* Overlay para cerrar al hacer click fuera */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10"
              aria-hidden="true"
            />

            <ul
              className="tag-selector-dropdown absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-20 max-h-20 overflow-y-auto"
              role="listbox"
            >
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <li
                    key={tag.id}
                    role="option"
                    aria-selected={tag.id === selectedTag}
                  >
                    <button
                      onClick={() => handleSelectTag(tag.id)}
                      className={`tag-option w-full flex items-center gap-2 px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50 ${
                        tag.id === selectedTag ? "bg-[#4F46E5]/5" : ""
                      }`}
                      type="button"
                    >
                      <span
                        className="tag-color-circle w-[15px] h-[15px] rounded-full flex-shrink-0"
                        style={{ backgroundColor: tag.color }}
                        aria-hidden="true"
                      />
                      <span className="tag-name text-gray-800 font-medium text-sm">
                        {tag.name}
                      </span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-400 text-sm text-center">
                  No tags available
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TagSelector;
