import React from "react";
import { Pencil, Trash2, Calendar, Tag, Pin } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
  const { title, content, tags, isPinned, createdAt } = note;

  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border ${
        isPinned ? "border-yellow-400" : "border-green-100"
      } bg-green-100 relative`}
    >
      {/* Pinned Indicator */}
      {isPinned && (
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400 rounded-t-xl"></div>
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Title + Pin */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold text-green-900 line-clamp-1">
            {title}
          </h2>
          <button
            onClick={onPin}
            className={`btn btn-ghost btn-xs btn-circle ${
              isPinned ? "text-yellow-500 fill-yellow-500" : "text-green-800"
            }`}
          >
            <Pin size={18} />
          </button>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-green-600 mb-3 font-medium">
          <Calendar size={14} />
          <span>
            {new Date(createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Content */}
        <p className="text-green-800 text-sm leading-relaxed line-clamp-3 mb-4 min-h-[60px]">
          {content || "No content available"}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="badge badge-ghost badge-sm text-xs font-medium text-green-700 bg-green-100"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-green-100">
          <div className="text-green-400">
            <Tag size={16} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="btn btn-square btn-sm btn-ghost hover:bg-green-200 hover:text-green-700 transition-colors"
              aria-label="Edit Note"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={onDelete}
              className="btn btn-square btn-sm btn-ghost hover:bg-red-100 hover:text-red-600 transition-colors"
              aria-label="Delete Note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
