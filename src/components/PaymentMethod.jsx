// src/components/PaymentMethod.jsx
import React, { useState } from "react";
import "./PaymentMethod.css";

const paymentOptions = [
  { id: "gpay", label: "Google Pay", icon: "🟢" },
  { id: "phonepe", label: "PhonePe", icon: "🟣" },
  { id: "paytm", label: "Paytm", icon: "🔵" },
  { id: "card", label: "Credit/Debit Card", icon: "💳" },
];

const PaymentMethod = ({ onProceed }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelect = (id) => {
    setSelectedMethod(id);
  };

  const handleProceed = () => {
    if (!selectedMethod) return alert("Please select a payment method");
    // Simulate storing method or pass to Razorpay logic
    onProceed(selectedMethod);
  };

  return (
    <div className="payment-method-container">
      <h2>Select Payment Method</h2>
      <ul className="payment-options">
        {paymentOptions.map((option) => (
          <li
            key={option.id}
            className={selectedMethod === option.id ? "selected" : ""}
            onClick={() => handleSelect(option.id)}
          >
            <span className="icon">{option.icon}</span>
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
      <button className="proceed-btn" onClick={handleProceed}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default PaymentMethod;
