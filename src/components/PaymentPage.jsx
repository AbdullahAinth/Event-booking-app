import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const handlePayment = () => {
    const options = {
      key: "rzp_test_SxMhVUf2a1PjeG", // Replace with your test key
      amount: bookingData.amount * 100, // amount in paise
      currency: "INR",
      name: "Event Booking App",
      description: `Booking for ${bookingData.eventName}`,
      handler: function (response) {
        // On success, navigate to confirmation with booking data
        navigate("/confirmation", {
          state: { ...bookingData, paymentId: response.razorpay_payment_id },
        });
      },
      prefill: {
        name: bookingData.name,
        email: bookingData.email,
      },
      theme: {
        color: "#6366f1", // Tailwind Indigo-500
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!bookingData) {
    return <p className="text-center mt-10 text-red-500">Invalid Access. No booking data found.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Complete Your Payment</h2>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        <strong>Event:</strong> {bookingData.eventName}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        <strong>Name:</strong> {bookingData.name}
      </p>
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        <strong>Email:</strong> {bookingData.email}
      </p>
      <p className="mb-6 text-gray-800 dark:text-white">
        <strong>Total Amount:</strong> ₹{bookingData.amount}
      </p>

      <button
        onClick={handlePayment}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition duration-300"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
