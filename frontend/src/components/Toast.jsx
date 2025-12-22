import React, { useEffect } from "react";
import { CheckCircle, AlertTriangle, X } from "lucide-react";

const Toast = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`absolute top-20 right-6 transition-all duration-400 ease-in-out z-50 ${
        isShown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-l-4 min-w-[280px] bg-white dark:bg-gray-800 ${
          type === "delete" || type === "error"
            ? "border-red-500 after:bg-red-500/10"
            : "border-green-500 after:bg-green-500/10"
        }`}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            type === "delete" || type === "error"
              ? "bg-red-50 text-red-500"
              : "bg-green-50 text-green-500"
          }`}
        >
          {type === "delete" || type === "error" ? (
            <AlertTriangle size={20} />
          ) : (
            <CheckCircle size={20} />
          )}
        </div>

        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {message}
        </p>

        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
