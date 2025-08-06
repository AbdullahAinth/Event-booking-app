import React, { useState, useEffect } from 'react';
import { getBookings } from '../utils/localStorage';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from localStorage when the component mounts
    const fetchedBookings = getBookings();
    setBookings(fetchedBookings || []); // Ensure it's an array even if localStorage is empty
  }, []);

  return (
    <div className="my-bookings-container">
      <h2 className="my-bookings-header">My Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <div className="booking-details">
                <h3>{booking.event.title}</h3>
                <p>Date: {booking.event.date}</p>
                <p>Location: {booking.event.location}</p>
                <p>Tickets: {booking.numTickets}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-bookings-message">No bookings yet. Go book an event!</p>
      )}
    </div>
  );
};

export default MyBookings;
