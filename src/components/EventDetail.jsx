// src/components/EventDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let events = [];
  try {
    events = JSON.parse(localStorage.getItem('events') || '[]');
  } catch (error) {
    events = [];
  }

  const event = events.find((e) => e.id === id || e.id === parseInt(id));

  const handleBuyNow = () => {
    if (!event) return;

    navigate(`/payment/${event.id}`, { state: { event } });
  };

  if (!event) {
    return <div className="event-detail">Event not found</div>;
  }

  return (
    <div className="event-detail">
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Price:</strong> ₹{event.price}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default EventDetail;
