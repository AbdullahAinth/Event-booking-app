// src/components/ToastContainer.jsx
import React, { useEffect } from "react";
import { useToast } from "../contexts/ToastContext";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/ToastContainer.css";

const ToastContainer = ({ testToasts = null }) => {
  const { toasts, removeToast } = useToast();
  const { theme } = useTheme();

  const displayedToasts = testToasts || toasts;

  useEffect(() => {
    const timers = displayedToasts.map((toast) => {
      const timeout = toast.timeout || 3000;
      return setTimeout(() => {
        removeToast(toast.id);
      }, timeout);
    });

    return () => timers.forEach(clearTimeout);
  }, [displayedToasts, removeToast]);

  return (
    <div role="region" className={`toast-container ${theme === 'dark' ? 'dark' : ''}`}>
      {displayedToasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
