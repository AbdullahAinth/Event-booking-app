import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { openRazorpay } from "../utils/razorpay";
import "./EventDetail.css";

const events = [
  {
    id: 1,
    title: "Music Concert",
    description: "An evening of live music performances by top artists.",
    price: 499,
  },
  {
    id: 2,
    title: "Tech Conference",
    description: "Explore the latest in technology and innovation.",
    price: 999,
  },
  {
    id: 3,
    title: "Art Workshop",
    description: "A hands-on workshop for budding artists.",
    price: 299,
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === parseInt(id));

  const handleBuyNow = async () => {
    openRazorpay({
      amount: event.price,
      event,
      onSuccess: (response) => {
        const bookingData = {
          event,
          razorpayPaymentId: response.razorpay_payment_id,
          timestamp: new Date().toISOString(),
        };

        // Store booking in localStorage
        const stored = localStorage.getItem("bookings");
        const bookings = stored ? JSON.parse(stored) : [];
        bookings.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // Navigate to confirmation page
        navigate("/confirmation", {
          state: { booking: bookingData },
        });
      },
    });
  };

  if (!event) return <p>Event not found.</p>;

  return (
    <div className="event-detail">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p className="price">₹{event.price}</p>
      <button onClick={handleBuyNow} className="buy-button">
        Buy Now
      </button>
    </div>
  );
};

export default EventDetail;
