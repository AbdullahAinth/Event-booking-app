import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, onClose, type = "info" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast ${type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

export default Toast;
