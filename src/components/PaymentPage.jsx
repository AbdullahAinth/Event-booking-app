// src/components/PaymentPage.jsx
import React from 'react';
import { loadRazorpayScript, openRazorpayCheckout } from '../utils/razorpay';

const PaymentPage = ({ event }) => {
  const handlePayment = async () => {
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert('Failed to load Razorpay. Please try again.');
        return;
      }

      openRazorpayCheckout({
        amount: event.price,
        name: event.title,
        onSuccess: (res) => {
          console.log('Payment success:', res);
        },
        onFailure: () => {
          console.log('Payment dismissed');
        },
      });
    } catch (error) {
      console.error('Error during payment:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>{event.title}</h2>
      <p>Price: ₹{event.price}</p>
      <button onClick={handlePayment}>Proceed to Pay</button>
    </div>
  );
};

export default PaymentPage;
