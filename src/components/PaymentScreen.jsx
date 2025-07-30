import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/PaymentScreen.css";

const PaymentScreen = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedEvent = location.state?.event || { title: "Event", price: 500 };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_SxMhVUf2a1PjeG", 
      amount: selectedEvent.price * 100,
      currency: "INR",
      name: "Event Booking",
      description: selectedEvent.title,
      image: "https://yourlogo.com/logo.png", 
      handler: function (response) {
        // Handle success
        navigate("/confirmation", {
          state: {
            event: selectedEvent,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: "Guest User",
        email: "guest@example.com",
        contact: "9999999999",
      },
      theme: {
        color: theme === "dark" ? "#0f172a" : "#6366f1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className={`payment-screen ${theme}`}>
      <h2>Choose Payment Method</h2>

      <div className="payment-options">
        <label><input type="radio" name="payment" defaultChecked /> UPI</label>
        <label><input type="radio" name="payment" /> Credit/Debit Card</label>
        <label><input type="radio" name="payment" /> Netbanking</label>
      </div>

      <button className="pay-button" onClick={handlePayment}>
        Proceed to Pay ₹{selectedEvent.price}
      </button>
    </div>
  );
};

export default PaymentScreen;
