import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the ToastContext
export const ToastContext = createContext();

// Create the ToastProvider component to manage toast state
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Adds a new toast to the state with a unique ID.
   * @param {string} message The message to display.
   * @param {string} type The type of toast (e.g., 'success', 'error', 'info').
   */
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  /**
   * Removes a toast from the state by its ID.
   * @param {number} id The unique ID of the toast to remove.
   */
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // The value provided to the context
  const value = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to consume the ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};