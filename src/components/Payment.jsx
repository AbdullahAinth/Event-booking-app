// src/components/Payment.jsx

import React from "react";
import { openRazorpayPayment } from "../utils/razorpay";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const handlePayment = () => {
    if (!event) return;
    openRazorpayPayment(event.price, event, () => {
      const booking = {
        id: Date.now(),
        eventId: event.id,
        eventTitle: event.title,
        amountPaid: event.price,
        date: new Date().toISOString(),
      };

      const existingBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];
      const updatedBookings = [...existingBookings, booking];
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      navigate("/confirmation", { state: { booking } });
    });
  };

  if (!event) {
    return <p className="error-text">Event not found or not passed correctly.</p>;
  }

  return (
    <div className="payment-screen">
      <h2>Payment for: {event.title}</h2>
      <p>Amount: ₹{event.price}</p>
      <button onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
};

export default Payment;
