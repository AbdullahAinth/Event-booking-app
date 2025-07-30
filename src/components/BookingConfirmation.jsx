import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="confirmation-container">
        <p>No booking found.</p>
        <button onClick={() => navigate("/")}>Go to Events</button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <h1>Booking Confirmed!</h1>
      <p>
        <strong>Event:</strong> {booking.event.title}
      </p>
      <p>
        <strong>Price Paid:</strong> ₹{booking.event.price}
      </p>
      <p>
        <strong>Payment ID:</strong> {booking.razorpayPaymentId}
      </p>
      <button onClick={() => navigate("/")}>Back to Events</button>
    </div>
  );
};

export default BookingConfirmation;
