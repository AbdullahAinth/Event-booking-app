// src/components/Payment.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  useEffect(() => {
    if (!event) {
      navigate("/");
      return;
    }

    const options = {
      key: "rzp_test_YourTestKeyHere", // ✅ replace with your Razorpay test key
      amount: event.price * 100, // amount in paise
      currency: "INR",
      name: "Event Booking App",
      description: `Ticket for ${event.name}`,
      image: "/vite.svg",
      handler: function (response) {
        const booking = {
          eventId: event.id,
          eventName: event.name,
          date: new Date().toISOString(),
          paymentId: response.razorpay_payment_id,
        };
        const existing = JSON.parse(localStorage.getItem("bookings")) || [];
        localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
        navigate("/booking-confirmation", { state: { booking } });
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#6366f1", // dark mode purple
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    return () => {
      rzp.close();
    };
  }, [event, navigate]);

  return (
    <div className="payment-container">
      <h2>Redirecting to Razorpay...</h2>
    </div>
  );
};

export default Payment;
