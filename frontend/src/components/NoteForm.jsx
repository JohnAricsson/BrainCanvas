import React, { useState, useEffect, useRef } from "react";
import { X, Plus, Tag, Save } from "lucide-react";

const NoteForm = ({ type = "add", noteData, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState(null);

  const titleRef = useRef(null);

  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title);
      setContent(noteData.content);
      setTags(noteData.tags || []);
    }
    setTimeout(() => titleRef.current?.focus(), 100);
  }, [type, noteData]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please enter a title for your note.");
      return;
    }
    setError(null);
    onSubmit({ title, content, tags });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {type === "edit" ? "Edit Note" : "New Note"}
          </h2>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              placeholder="e.g., Project Ideas"
              className="w-full text-2xl font-bold bg-white/90 shadow-sm rounded-xl px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-green-900 placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Description
            </label>
            <textarea
              placeholder="Start typing your thoughts here..."
              className="w-full h-40 resize-none bg-white/90 shadow-sm rounded-xl px-4 py-3 border-none focus:outline-none focus:ring-2 focus:ring-green-900 text-base leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="bg-green-50/50 p-4 rounded-2xl">
            <label className="block mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1">
              <Tag size={14} /> Tags
            </label>

            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge badge-success badge-lg py-2 px-3 rounded-lg flex items-center gap-2"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="btn btn-xs btn-circle btn-ghost hover:bg-green-100 text-green-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a tag..."
                className="input input-sm input-ghost w-full bg-white/90 shadow-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-900"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleAddTag}
                className="btn btn-sm btn-square btn-success hover:bg-green-600/20"
                disabled={!tagInput.trim()}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
              <X size={16} /> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn bg-green-900 hover:bg-green-600 text-white"
          >
            {" "}
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn bg-green-900 hover:bg-green-600 px-8 text-white gap-2 shadow-md shadow-green-300/30"
          >
            <Save size={18} /> {type === "edit" ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
