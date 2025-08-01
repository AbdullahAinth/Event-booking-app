// src/utils/localStorage.js

/**
 * Saves a new booking to local storage.
 * @param {object} booking - The booking object to save, including event, quantity, totalAmount, etc.
 */
export const saveBooking = (booking) => {
    try {
      const current = JSON.parse(localStorage.getItem("bookings") || "[]");
      localStorage.setItem("bookings", JSON.stringify([...current, booking]));
    } catch (e) {
      console.error("Error saving booking to localStorage:", e);
    }
  };
  
  /**
   * Retrieves all bookings from local storage.
   * @returns {Array} An array of booking objects.
   */
  export const getBookings = () => {
    try {
      return JSON.parse(localStorage.getItem("bookings") || "[]");
    } catch (e) {
      console.error("Error parsing bookings from localStorage:", e);
      return []; // Return an empty array on error to prevent app crash
    }
  };