// src/components/PaymentMethod.jsx
import React from "react";
import "./PaymentMethod.css";

const paymentOptions = [
  { id: "gpay", label: "Google Pay", icon: "🟢" },
  { id: "phonepe", label: "PhonePe", icon: "🟣" },
  { id: "paytm", label: "Paytm", icon: "🔵" },
  { id: "card", label: "Credit/Debit Card", icon: "💳" },
];

const PaymentMethod = ({ selectedMethod, onSelect }) => {
  return (
    <div className="payment-method-container">
      <h2>Select Payment Method</h2>
      <ul className="payment-options">
        {paymentOptions.map((option) => (
          <li
            key={option.id}
            className={selectedMethod === option.id ? "selected" : ""}
            onClick={() => onSelect(option.id)}
          >
            <span className="icon">{option.icon}</span>
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethod;
