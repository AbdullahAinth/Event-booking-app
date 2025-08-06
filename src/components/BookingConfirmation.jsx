// src/components/BookingConfirmation.jsx
import React from "react";
import "./BookingConfirmation.css";

function BookingConfirmation({ bookingData }) {
  if (!bookingData) {
    return <div>No booking information available.</div>;
  }

  const { event, quantity, totalPrice, bookingId } = bookingData;

  return (
    <div className="booking-confirmation">
      <h2>Booking Confirmed!</h2>
      <p data-testid="event-name"><strong>Event:</strong> {event.name}</p>
      <p data-testid="booking-id"><strong>Booking ID:</strong> {bookingId}</p>
      <p data-testid="tickets"><strong>Tickets:</strong> {quantity}</p>
      <p data-testid="total-price"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
      <p>Thank you for booking with us.</p>
    </div>
  );
}

export default BookingConfirmation;
