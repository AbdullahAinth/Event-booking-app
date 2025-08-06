import React from 'react';
import { render, screen } from '@testing-library/react';
import MyBookings from './MyBookings';
import { getBookings } from '../utils/localStorage';

// Mock localStorage utility functions
jest.mock('../utils/localStorage', () => ({
  getBookings: jest.fn(),
}));

describe('MyBookings', () => {
  it('renders a list of bookings from localStorage', () => {
    // Mock the return value of getBookings for this test
    getBookings.mockReturnValueOnce([
      { id: 123, event: { title: 'Test Event 1', date: '2025-01-01', location: 'Venue A' }, numTickets: 2 },
      { id: 456, event: { title: 'Test Event 2', date: '2025-02-02', location: 'Venue B' }, numTickets: 1 },
    ]);

    render(<MyBookings />);

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Date: 2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('Tickets: 2')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    expect(screen.getByText('Tickets: 1')).toBeInTheDocument();
  });

  it('renders "No bookings yet. Go book an event!" when localStorage is empty', () => {
    getBookings.mockReturnValueOnce([]);
    render(<MyBookings />);

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    // Corrected the expected text to match the component's output
    expect(screen.getByText('No bookings yet. Go book an event!')).toBeInTheDocument();
  });

  it('renders "No bookings yet. Go book an event!" when getBookings returns null', () => {
    getBookings.mockReturnValueOnce(null);
    render(<MyBookings />);

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    // Corrected the expected text to match the component's output
    expect(screen.getByText('No bookings yet. Go book an event!')).toBeInTheDocument();
  });
});