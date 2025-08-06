import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Updated to match the actual link text in Navbar.jsx
    expect(screen.getByText(/Events/i)).toBeInTheDocument();
    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
  });

  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/EventGo/i)).toBeInTheDocument();
  });
});
