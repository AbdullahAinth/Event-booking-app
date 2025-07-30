import React, { useEffect, useState } from "react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking, index) => (
            <li key={index} className="booking-card">
              <h3>{booking.event.title}</h3>
              <p>
                <strong>Payment ID:</strong> {booking.razorpayPaymentId}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
