// src/components/Payment.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./Payment.css";

const Payment = ({ event }) => {
  const { theme } = useTheme();

  const handlePayment = () => {
    if (!event) return;

    const options = {
      key: "rzp_test_SxMhVUf2a1PjeG", // Replace with your Razorpay test key
      amount: event.price * 100,
      currency: "INR",
      name: "Event Booking",
      description: event.title,
      handler: function (response) {
        alert("Payment successful! Razorpay Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: theme === "dark" ? "#0ef" : "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className={`payment-container ${theme}`}>
      <h2>Ready to Book?</h2>
      <p>Use Razorpay test card: <strong>4111 1111 1111 1111</strong> | Exp: <strong>12/34</strong> | CVV: <strong>123</strong></p>
      <button className="proceed-btn" onClick={handlePayment}>
        Proceed to Pay ₹{event.price}
      </button>
    </div>
  );
};

export default Payment;
