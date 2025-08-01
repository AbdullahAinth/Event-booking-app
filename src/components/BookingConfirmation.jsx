import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../App.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;
  const mockBookingData = {
    bookingId: 'MOCK-12345',
    eventName: 'Mock Event',
    eventDate: '2025-12-25',
    quantity: 2,
    totalPrice: 100.00
  };
  const finalBookingData = bookingData || mockBookingData;
  return (
    <div className="booking-confirmation">
      <div className="confirmation-card">
        <h2 className="confirmation-header">Booking Confirmed! 🎉</h2>
        <p className="confirmation-message">Your booking for <strong>{finalBookingData.eventName}</strong> has been successfully processed.</p>
        <div className="booking-details-summary">
          <p><strong>Booking ID:</strong> {finalBookingData.bookingId}</p>
          <p><strong>Event Date:</strong> {finalBookingData.eventDate}</p>
          <p><strong>Tickets:</strong> {finalBookingData.quantity}</p>
          <p><strong>Total Price:</strong> ${finalBookingData.totalPrice.toFixed(2)}</p>
        </div>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;