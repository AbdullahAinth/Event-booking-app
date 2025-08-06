// src/components/EventDetail.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventDetail from './EventDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '1' }),
}));

describe('EventDetail Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test('renders event details when event is found', () => {
    const mockEvent = {
      id: '1',
      name: 'Test Event',
      date: '2025-08-10',
      location: 'New Delhi',
      description: 'A sample event description',
      price: 200,
    };

    localStorage.setItem('events', JSON.stringify([mockEvent]));

    render(
      <MemoryRouter initialEntries={['/event/1']}>
        <Routes>
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === 'Date: 2025-08-10')).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === 'Location: New Delhi')).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === 'Description: A sample event description')).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === 'Price: ₹200')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Buy Now'));
    expect(mockNavigate).toHaveBeenCalledWith('/payment/1', {
      state: { event: mockEvent },
    });
  });

  test('displays "Event not found" when event is not in list', () => {
    localStorage.setItem('events', JSON.stringify([{ id: '2', name: 'Other Event' }]));

    render(
      <MemoryRouter initialEntries={['/event/1']}>
        <Routes>
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Event not found')).toBeInTheDocument();
  });

  test('displays "Event not found" when events list is empty', () => {
    localStorage.setItem('events', JSON.stringify([]));

    render(
      <MemoryRouter initialEntries={['/event/1']}>
        <Routes>
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Event not found')).toBeInTheDocument();
  });

  test('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('events', 'not-a-json');

    render(
      <MemoryRouter initialEntries={['/event/1']}>
        <Routes>
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Event not found')).toBeInTheDocument();
  });

  test('handles missing localStorage key gracefully', () => {
    render(
      <MemoryRouter initialEntries={['/event/1']}>
        <Routes>
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Event not found')).toBeInTheDocument();
  });
});
