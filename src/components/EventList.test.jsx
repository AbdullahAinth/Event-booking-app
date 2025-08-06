import React from 'react';
import { render, screen } from '@testing-library/react';
import EventList from './EventList';
import { BrowserRouter } from 'react-router-dom';

const mockEvents = [
  {
    id: '1',
    name: 'Test Event',
    description: 'Test description',
    date: '2025-08-05',
    location: 'Test City',
    price: 500,
    image: 'test.jpg',
  },
];

describe('EventList', () => {
  it('renders no events message when list is empty', () => {
    render(
      <BrowserRouter>
        <EventList events={[]} />
      </BrowserRouter>
    );
    expect(screen.getByText(/No events available/i)).toBeInTheDocument();
  });

  it('renders events when provided', () => {
    render(
      <BrowserRouter>
        <EventList events={mockEvents} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
    expect(screen.getByText(/Test City/i)).toBeInTheDocument();
  });
});