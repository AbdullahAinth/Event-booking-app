import React, { useState, useEffect } from 'react';
import { eventsData } from '../data/events';
import "../App.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      // Filter out any malformed bookings before setting the state
      const validBookings = storedBookings.filter(b => b && b.event && typeof b.quantity === 'number' && typeof b.totalPrice === 'number');
      setBookings(validBookings);
    } catch (error) {
      console.error('Failed to parse bookings from localStorage', error);
      setBookings([]);
    }
  }, []);

  return (
    <div className="my-bookings-container">
      <h2 className="my-bookings-header">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings-message">No bookings yet. Go book an event!</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.bookingId} className="booking-card">
              <img
                src={booking.event?.image}
                alt={booking.event?.title}
                className="booking-image"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
              />
              <div className="booking-details">
                <h3>{booking.event?.title}</h3>
                <p><strong>ID:</strong> {booking.bookingId}</p>
                <p><strong>Date:</strong> {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Tickets:</strong> {booking.quantity || 0}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice ? booking.totalPrice.toFixed(2) : '0.00'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;