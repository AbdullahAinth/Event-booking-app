// src/components/PaymentMethod.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentMethod from './PaymentMethod';

describe('PaymentMethod', () => {
  const paymentOptions = ['Google Pay', 'PhonePe', 'Paytm', 'Credit/Debit Card'];

  test('renders all payment options', () => {
    const handleSelect = jest.fn();
    render(<PaymentMethod selectedMethod="" onSelect={handleSelect} />);

    paymentOptions.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('highlights the selected payment method', () => {
    const handleSelect = jest.fn();
    render(<PaymentMethod selectedMethod="paytm" onSelect={handleSelect} />);

    const selectedOption = screen.getByText(/Paytm/i);
    expect(selectedOption.parentElement).toHaveClass('selected');
  });

  test('calls onSelect with the correct method when clicked', () => {
    const handleSelect = jest.fn();
    render(<PaymentMethod selectedMethod="" onSelect={handleSelect} />);

    const gpayOption = screen.getByText(/Google Pay/i);
    fireEvent.click(gpayOption);
    expect(handleSelect).toHaveBeenCalledWith('gpay');
  });
});
