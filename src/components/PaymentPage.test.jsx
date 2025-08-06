import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentPage from './PaymentPage'; // same folder
import * as razorpayUtils from '../utils/razorpay'; // ✅ fixed relative path

jest.mock('../utils/razorpay', () => ({
  loadRazorpayScript: jest.fn(),
  openRazorpayCheckout: jest.fn(),
}));

const mockEvent = {
  title: 'Test Event',
  price: 500,
};

describe('PaymentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders event title and price', () => {
    render(<PaymentPage event={mockEvent} />);
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
    expect(screen.getByText(/₹500/i)).toBeInTheDocument();
  });

  it('shows alert if Razorpay script fails to load', async () => {
    razorpayUtils.loadRazorpayScript.mockResolvedValue(false);
    window.alert = jest.fn();

    render(<PaymentPage event={mockEvent} />);
    fireEvent.click(screen.getByText(/Proceed to Pay/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to load Razorpay. Please try again.');
    });
  });

  it('calls openRazorpayCheckout on successful script load', async () => {
    razorpayUtils.loadRazorpayScript.mockResolvedValue(true);
    render(<PaymentPage event={mockEvent} />);
    fireEvent.click(screen.getByText(/Proceed to Pay/i));

    await waitFor(() => {
      expect(razorpayUtils.openRazorpayCheckout).toHaveBeenCalledWith(expect.objectContaining({
        amount: 500,
        name: 'Test Event',
        onSuccess: expect.any(Function),
        onFailure: expect.any(Function),
      }));
    });

    // Simulate payment success
    const args = razorpayUtils.openRazorpayCheckout.mock.calls[0][0];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    args.onSuccess({ payment_id: '123' });
    expect(consoleSpy).toHaveBeenCalledWith('Payment success:', { payment_id: '123' });
    consoleSpy.mockRestore();
  });

  it('logs error when script load throws exception', async () => {
    const error = new Error('Failed to load');
    razorpayUtils.loadRazorpayScript.mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    window.alert = jest.fn();

    render(<PaymentPage event={mockEvent} />);
    fireEvent.click(screen.getByText(/Proceed to Pay/i));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error during payment:', error);
      expect(window.alert).toHaveBeenCalledWith('An unexpected error occurred. Please try again.');
    });

    consoleSpy.mockRestore();
  });

  it('handles payment dismissal', async () => {
    razorpayUtils.loadRazorpayScript.mockResolvedValue(true);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<PaymentPage event={mockEvent} />);
    fireEvent.click(screen.getByText(/Proceed to Pay/i));

    await waitFor(() => {
      const args = razorpayUtils.openRazorpayCheckout.mock.calls[0][0];
      args.onFailure();
      expect(consoleSpy).toHaveBeenCalledWith('Payment dismissed');
    });

    consoleSpy.mockRestore();
  });
});
