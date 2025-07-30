export const saveBooking = (booking) => {
    const current = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...current, booking]));
  };
  
  export const getBookings = () => {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  };
  