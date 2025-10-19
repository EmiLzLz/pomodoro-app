// Tags.tsx
import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import TagsList from "../components/TagsList";
import TagForm from "../components/TagForm";
import type { Tag } from "../types/Tag";
import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} from "../services/tagService";

function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getTags();
      setTags(data);
      setLoading(false);
    })();
  }, []);

  const handleCreate = async (name: string, color: string) => {
    const newTag = await createTag({ name, color });
    setTags((prev) => [...prev, newTag]);
    setShowForm(false);
  };

  const handleUpdate = (id: string, tag: Tag) => {
    setEditingTag(tag);
    setShowForm(true);
  };

  const saveUpdate = async (name: string, color: string) => {
    if (!editingTag) return;
    const updated = await updateTag(editingTag.id, {
      id: editingTag.id,
      name,
      color,
    });
    setTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setEditingTag(null);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete tag?")) return;
    await deleteTag(id);
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCancel = () => {
    setEditingTag(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <main className="tags-page w-full h-full flex items-center justify-center">
        <p
          className="text-gray-600 font-medium text-lg"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Loading tags...
        </p>
      </main>
    );
  }

  return (
    <main className="tags-page w-full h-full py-8 px-4 overflow-y-auto">
      <div className="tags-page-container w-full max-w-[995px] mx-auto flex flex-col gap-8">
        {/* Header */}
        <header className="tags-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="header-text-wrapper">
            <h1
              className="tags-page-title text-gray-800 font-bold mb-1"
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "40px" }}
            >
              Tags
            </h1>
            <p
              className="tags-page-subtitle text-gray-600 font-normal text-base"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Organize your focus sessions
            </p>
          </div>

          <button
            onClick={() => {
              setEditingTag(null);
              setShowForm(true);
            }}
            className="add-new-tag-button inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4F46E5] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#4338CA] hover:shadow-lg active:scale-95"
            type="button"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Icon path={mdiPlus} size={0.9} />
            Add a new tag
          </button>
        </header>

        {/* Form */}
        {showForm && (
          <section className="tag-form-section">
            <TagForm
              initialName={editingTag?.name}
              initialColor={editingTag?.color}
              onSubmit={editingTag ? saveUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </section>
        )}

        {/* Tags List */}
        <section className="tags-list-section">
          <TagsList
            tags={tags}
            onCreate={() => {
              setEditingTag(null);
              setShowForm(true);
            }}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}

export default Tags;
