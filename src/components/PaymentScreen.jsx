import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContext } from '../contexts/ToastContext';
import "../App.css";

// This component simulates the payment process using a mock Razorpay integration.
const PaymentScreen = () => {
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { event, quantity } = location.state || {};

  // If there's no event data, navigate back to the home page.
  if (!event || !quantity) {
    useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const totalPrice = event.price * quantity;

  // This function would be called by the Razorpay handler on successful payment.
  const handleSuccess = (response) => {
    // In a real app, you would verify the payment with your backend server.
    console.log('Payment successful. Response:', response);
    
    const bookingId = `BK${Math.floor(Math.random() * 10000)}`;
    const newBooking = {
      bookingId,
      event,
      quantity,
      totalPrice,
      bookingDate: new Date().toISOString(),
    };
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    showToast('Payment Successful! Your booking is confirmed.', 'success');
    navigate('/my-bookings');
  };

  const handlePayment = () => {
    // Check if the Razorpay object is available.
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded. Please check your public/index.html file.");
      showToast('Payment gateway not available. Please try again later.', 'error');
      return;
    }

    // This is a mock data object for the Razorpay checkout.
    // In a real application, a lot of this data would be fetched from a backend API.
    const options = {
      // -------------------------------------------------------------
      // IMPORTANT: Replace 'YOUR_RAZORPAY_KEY_ID' with your actual key.
      // The 401 error means this key is missing or incorrect.
      // -------------------------------------------------------------
      key: 'rzp_test_SxMhVUf2a1PjeG', 
      amount: totalPrice * 100, // Amount in paise
      currency: 'INR',
      name: 'Event Booking App',
      description: `Booking for ${event.title}`,
      image: 'https://placehold.co/100x100', // A logo for your company
      handler: handleSuccess, // The function to be called on a successful payment.
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#6366f1', // Matches our app's accent color
      },
    };

    // Create a new Razorpay instance and open the checkout.
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      // Handle failed payments
      console.error('Payment failed. Response:', response.error);
      showToast(`Payment failed: ${response.error.description}`, 'error');
    });
    rzp1.open();
  };

  return (
    <div className="payment-screen-container">
      <div className="payment-summary-card">
        <h2>Payment Summary</h2>
        <div className="summary-item">
          <h3>{event.title}</h3>
          <p>Price per ticket: ${event.price.toFixed(2)}</p>
          <p>Quantity: {quantity} Tickets</p>
        </div>
        <div className="total-price">
          <h3>Total: ${(event.price * quantity).toFixed(2)}</h3>
        </div>
        <button onClick={handlePayment} className="pay-button">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
