// src/components/ToastContainer.jsx
import React from "react";
import { useToast } from "../contexts/ToastContext";
import "../styles/ToastContainer.css"; // (Create this later)

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <div key={index} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
