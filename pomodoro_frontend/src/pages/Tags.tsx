import React, { useEffect, useState } from "react";
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
  // UI state to show form (CREATE or EDIT)
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getTags();
      setTags(data);
      setLoading(false);
    })();
  }, []);

  // CREATE
  const handleCreate = async (name: string, color: string) => {
    const newTag = await createTag({ name, color });
    setTags((prev) => [...prev, newTag]);
    setShowForm(false);
  };

  // UPDATE
  const handleUpdate = (id: string) => {
    const tag = tags.find((t) => t.id === id) || null;
    setEditingTag(tag);
    setShowForm(true);
  };

  // SAVE UPDATE
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

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Delete tag?")) return;
    await deleteTag(id);
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCancel = () => {
    setEditingTag(null);
    setShowForm(false);
  };

  if (loading) return <p>Loading tags...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Tags</h2>
        <button
          onClick={() => {
            setEditingTag(null);
            setShowForm(true);
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add New Tag
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <TagForm
            initialName={editingTag?.name}
            initialColor={editingTag?.color}
            onSubmit={editingTag ? saveUpdate : handleCreate}
            onCancel={handleCancel}
          />
        </div>
      )}

      <TagsList
        tags={tags}
        onCreate={() => {
          setEditingTag(null);
          setShowForm(true);
        }}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Tags;
