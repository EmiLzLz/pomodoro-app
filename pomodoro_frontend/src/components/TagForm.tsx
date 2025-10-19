// TagForm.tsx
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiClose, mdiPlus } from "@mdi/js";

interface TagFormProps {
  initialName?: string;
  initialColor?: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
}

// Colores predefinidos modernos y vibrantes
const PRESET_COLORS = [
  "#B91C1C", // Red
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#14B8A6", // Teal
];

function TagForm({
  initialName,
  initialColor,
  onSubmit,
  onCancel,
}: TagFormProps) {
  const [nameValue, setNameValue] = useState(initialName || "");
  const [colorValue, setColorValue] = useState(
    initialColor || PRESET_COLORS[0]
  );
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameValue.trim() || !colorValue) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit(nameValue.trim(), colorValue);

    setNameValue("");
    setColorValue(PRESET_COLORS[0]);
    setShowCustomPicker(false);
  };

  return (
    <div className="tag-form-wrapper w-full">
      {/* Title */}
      <h2
        className="tag-form-title text-gray-800 font-bold mb-4"
        style={{ fontFamily: "DM Sans, sans-serif", fontSize: "20px" }}
      >
        {initialName ? "Edit tag" : "Create new tag"}
      </h2>

      {/* Form with Glass Effect */}
      <form
        onSubmit={handleSubmit}
        className="tag-form backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 sm:p-8"
      >
        <div className="form-content-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tag Name Input */}
          <div className="form-group-name">
            <label
              htmlFor="tag-name-input"
              className="form-label block text-gray-800 font-semibold mb-2 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Tag name
            </label>
            <input
              id="tag-name-input"
              type="text"
              placeholder="Study, Job, Language, Tasks, etc..."
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="tag-name-input w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all duration-200"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          {/* Color Picker */}
          <div className="form-group-color">
            <label
              className="form-label block text-gray-800 font-semibold mb-2 text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Color
            </label>

            {/* Preset Colors */}
            <div className="color-presets-wrapper flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setColorValue(color);
                    setShowCustomPicker(false);
                  }}
                  className={`color-preset-btn w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                    colorValue === color
                      ? "ring-4 ring-gray-800 ring-offset-2"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}

              {/* Custom Color Button */}
              <div className="custom-color-picker-wrapper relative">
                <button
                  type="button"
                  onClick={() => setShowCustomPicker(!showCustomPicker)}
                  className={`custom-color-btn w-12 h-12 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center transition-all duration-200 hover:border-gray-600 hover:scale-110 active:scale-95 ${
                    showCustomPicker ? "bg-gray-200" : "bg-white/40"
                  }`}
                  aria-label="Choose custom color"
                >
                  <Icon path={mdiPlus} size={0.8} className="text-gray-600" />
                </button>

                {/* Native Color Input (Hidden) */}
                {showCustomPicker && (
                  <input
                    type="color"
                    value={colorValue}
                    onChange={(e) => setColorValue(e.target.value)}
                    className="absolute top-0 left-0 w-12 h-12 opacity-0 cursor-pointer"
                    aria-label="Custom color picker"
                  />
                )}
              </div>

              {/* Selected Color Display */}
              {!PRESET_COLORS.includes(colorValue) && (
                <div
                  className="selected-custom-color w-12 h-12 rounded-full ring-4 ring-gray-800 ring-offset-2"
                  style={{ backgroundColor: colorValue }}
                  aria-label="Selected custom color"
                />
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#F3F4F6] text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:bg-gray-300 active:scale-95"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Icon path={mdiClose} size={0.8} />
            Cancel
          </button>

          <button
            type="submit"
            className="create-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#4F46E5] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#4338CA] hover:shadow-lg active:scale-95"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Icon path={mdiPlus} size={0.8} />
            {initialName ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TagForm;
