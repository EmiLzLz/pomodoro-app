import React, { useState } from "react";

interface TagsFormProps {
  initialName?: string;
  initialColor?: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
}

function TagForm({ initialName, initialColor, onSubmit, onCancel }: TagsFormProps) {
  const [nameValue, setNameValue] = useState(initialName || "");
  const [colorValue, setColorValue] = useState(initialColor || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameValue || !colorValue) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit(nameValue, colorValue);

    setNameValue("");
    setColorValue("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tag Name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <input
          type="color"
          placeholder="Tag Color"
          value={colorValue}
          onChange={(e) => setColorValue(e.target.value)}
        />
        <button type="submit">ADD</button>
        <button type="button" onClick={onCancel}>CANCEL</button>
      </form>
    </div>
  );
}

export default TagForm;
