import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ toast, onClose }) => {
  const { id, message, type = 'info', timeout = 3000 } = toast;

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        onClose(id);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [id, timeout, onClose]);

  const handleClose = () => {
    onClose(id);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div
      className={`toast ${type} toast-show`}
      role="alert"
      aria-atomic="true"
      aria-live="polite"
    >
      <span className="toast-icon">{getIcon()}</span>
      <div className="toast-message">{String(message)}</div>
      <button
        className="toast-close"
        onClick={handleClose}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
