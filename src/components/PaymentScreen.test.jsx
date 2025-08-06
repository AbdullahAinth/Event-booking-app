// src/components/PaymentScreen.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import PaymentScreen from './PaymentScreen';
import { ToastContext } from '../contexts/ToastContext';

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock ToastContext
const mockShowToast = jest.fn();
const mockToastContext = { showToast: mockShowToast };

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock Razorpay
let mockRazorpayOpen;
let mockRazorpayOn;
let mockRazorpay;

// This beforeEach hook ensures a fresh mock for each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
  
  mockRazorpayOpen = jest.fn();
  mockRazorpayOn = jest.fn();
  mockRazorpay = jest.fn(() => ({
    open: mockRazorpayOpen,
    on: mockRazorpayOn,
  }));
  Object.defineProperty(window, 'Razorpay', {
    value: mockRazorpay,
    configurable: true, // Crucial for re-mocking
  });
});

// Mock console
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Helper function to render the component with router context
const renderWithRouter = (state) => {
  return render(
    <ToastContext.Provider value={mockToastContext}>
      <MemoryRouter initialEntries={[{ pathname: '/payment-screen', state }]}>
        <PaymentScreen />
      </MemoryRouter>
    </ToastContext.Provider>
  );
};

describe('PaymentScreen', () => {
  const mockEvent = { id: 1, title: 'Music Festival', price: 100 };
  const mockQuantity = 2;

  // Test case 1: Renders the payment summary correctly
  it('renders payment summary with correct event details and total price', () => {
    renderWithRouter({ event: mockEvent, quantity: mockQuantity });
    expect(screen.getByText('Payment Summary')).toBeInTheDocument();
    expect(screen.getByText(mockEvent.title)).toBeInTheDocument();
    expect(screen.getByText(`Price per ticket: $${mockEvent.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`Quantity: ${mockQuantity} Tickets`)).toBeInTheDocument();
    expect(screen.getByText(`Total: $${(mockEvent.price * mockQuantity).toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pay Now/i })).toBeInTheDocument();
  });

  // Test case 2: Redirects to home if no event or quantity is passed
  it('navigates to home if no event or quantity is in location state', async () => {
    renderWithRouter({ event: null, quantity: null });
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  // Test case 3: Razorpay is called with correct options on button click
  it('calls Razorpay with correct options when "Pay Now" is clicked', () => {
    renderWithRouter({ event: mockEvent, quantity: mockQuantity });
    fireEvent.click(screen.getByRole('button', { name: /Pay Now/i }));

    const expectedTotalPrice = mockEvent.price * mockQuantity;
    expect(mockRazorpay).toHaveBeenCalledTimes(1);
    expect(mockRazorpay).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'rzp_test_SxMhVUf2a1PjeG',
        amount: expectedTotalPrice * 100,
        currency: 'INR',
        description: `Booking for ${mockEvent.title}`,
        handler: expect.any(Function),
      })
    );
    expect(mockRazorpayOpen).toHaveBeenCalledTimes(1);
    expect(mockRazorpayOn).toHaveBeenCalledTimes(1);
  });

  // Test case 4: Handles a successful payment and updates localStorage
  it('updates localStorage and navigates on successful payment', () => {
    renderWithRouter({ event: mockEvent, quantity: mockQuantity });
    fireEvent.click(screen.getByRole('button', { name: /Pay Now/i }));

    const options = mockRazorpay.mock.calls[0][0];
    const mockPaymentResponse = { razorpay_payment_id: 'pay_123' };

    // Manually trigger the success handler
    options.handler(mockPaymentResponse);

    // Verify localStorage was updated. `setItem` should be called exactly once.
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    const updatedBookings = JSON.parse(localStorageMock.getItem('bookings'));
    expect(updatedBookings.length).toBe(1);
    expect(updatedBookings[0]).toEqual(
      expect.objectContaining({
        event: mockEvent,
        quantity: mockQuantity,
        totalPrice: mockEvent.price * mockQuantity,
      })
    );

    // Verify toast and navigation
    expect(mockShowToast).toHaveBeenCalledWith('Payment Successful! Your booking is confirmed.', 'success');
    expect(mockNavigate).toHaveBeenCalledWith('/my-bookings');
    expect(mockConsoleLog).toHaveBeenCalledWith('Payment successful. Response:', mockPaymentResponse);
  });

  // Test case 5: Handles the case where Razorpay script is not loaded
  it('shows an error toast and logs error if Razorpay script is not loaded', () => {
    Object.defineProperty(window, 'Razorpay', { value: undefined, configurable: true });

    renderWithRouter({ event: mockEvent, quantity: mockQuantity });
    fireEvent.click(screen.getByRole('button', { name: /Pay Now/i }));

    // Verify error handling
    expect(mockConsoleError).toHaveBeenCalledWith("Razorpay script not loaded. Please check your public/index.html file.");
    expect(mockShowToast).toHaveBeenCalledWith('Payment gateway not available. Please try again later.', 'error');
    expect(mockRazorpay).not.toHaveBeenCalled();
    expect(mockRazorpayOpen).not.toHaveBeenCalled();
  });

  // Test case 6: Handles a failed payment
  it('shows an error toast and logs error on failed payment', () => {
    renderWithRouter({ event: mockEvent, quantity: mockQuantity });
    fireEvent.click(screen.getByRole('button', { name: /Pay Now/i }));

    // Manually trigger the failed payment handler from the Razorpay instance mock
    const failureHandler = mockRazorpayOn.mock.calls.find(call => call[0] === 'payment.failed')[1];
    const mockError = { code: 400, description: 'Invalid card details' };
    failureHandler({ error: mockError });

    // Verify error handling
    expect(mockConsoleError).toHaveBeenCalledWith('Payment failed. Response:', mockError);
    expect(mockShowToast).toHaveBeenCalledWith(`Payment failed: ${mockError.description}`, 'error');
  });
});