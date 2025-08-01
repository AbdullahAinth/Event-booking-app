// src/utils/razorpay.js
export const RAZORPAY_KEY = "rzp_test_SxMhVUf2a1PjeG"; // Your test key

/**
 * Opens the Razorpay checkout modal.
 * @param {object} options - Configuration options for Razorpay.
 * @param {number} options.amount - Total amount in Rupees (will be converted to paise).
 * @param {object} options.event - The event object being booked.
 * @param {function} options.onSuccess - Callback function for successful payment.
 * @param {function} [options.onFailure] - Optional callback function for payment failure.
 * @param {string} [options.themeColor] - Optional theme color for the Razorpay modal.
 */
export const openRazorpay = ({ amount, event, onSuccess, onFailure, themeColor }) => {
  // Ensure the Razorpay SDK script is loaded
  if (!window.Razorpay) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true; // Make script loading asynchronous

    script.onload = () => {
      // Once script is loaded, proceed with opening Razorpay
      initiateRazorpayCheckout(amount, event, onSuccess, onFailure, themeColor);
    };

    script.onerror = () => {
      console.error("Razorpay SDK failed to load. Please check your internet connection.");
      if (onFailure) {
        onFailure({ description: "Razorpay SDK failed to load." });
      }
    };

    document.body.appendChild(script);
  } else {
    // If script is already loaded, just initiate checkout
    initiateRazorpayCheckout(amount, event, onSuccess, onFailure, themeColor);
  }
};

/**
 * Internal function to initiate the Razorpay checkout.
 */
const initiateRazorpayCheckout = (amount, event, onSuccess, onFailure, themeColor) => {
  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // Convert amount to paise
    currency: "INR",
    name: "Eventify",
    description: `Booking for ${event.title}`,
    image: "/logo.png", // Ensure this path is correct or use a placeholder
    handler: function (response) {
      onSuccess(response);
    },
    prefill: {
      name: "Test User", // Pre-fill for test mode
      email: "test@example.com", // Pre-fill for test mode
      contact: "9999999999", // Pre-fill for test mode
    },
    notes: {
      eventId: event.id,
      eventName: event.title,
    },
    theme: {
      color: themeColor || "#6366f1", // Use provided theme color or default
    },
  };

  const rzp = new window.Razorpay(options);

  // Handle payment failure specifically
  rzp.on("payment.failed", function (response) {
    if (onFailure) {
      onFailure(response.error);
    } else {
      console.error("Payment failed:", response.error);
    }
  });

  rzp.open();
};