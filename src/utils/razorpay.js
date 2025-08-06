// src/utils/razorpay.js

const RAZORPAY_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${RAZORPAY_SRC}"]`);
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function openRazorpayCheckout(options) {
  const rzp = new window.Razorpay(options);
  rzp.open();
}
