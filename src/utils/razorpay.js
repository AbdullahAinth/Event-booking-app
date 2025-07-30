export const RAZORPAY_KEY = "rzp_test_SxMhVUf2a1PjeG"; // Replace with your Razorpay test key

export const openRazorpay = ({ amount, event, onSuccess }) => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";

  script.onload = () => {
    const options = {
      key: RAZORPAY_KEY,
      amount: (amount || event.price) * 100, // fallback to event.price if amount not passed
      currency: "INR",
      name: "Event Booking",
      description: `Booking for ${event.title}`,
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  script.onerror = () => {
    alert("Failed to load Razorpay SDK. Please try again later.");
  };

  document.body.appendChild(script);
};
