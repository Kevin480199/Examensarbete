import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto-hide after 3 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`
          px-5 py-3 rounded-lg shadow-lg text-white transition-opacity
          ${type === "success" ? "bg-green-600" : "bg-red-600"}
        `}
      >
        {message}
      </div>
    </div>
  );
}
