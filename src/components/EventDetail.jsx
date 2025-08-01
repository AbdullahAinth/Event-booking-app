import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/events';
import "../App.css";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const event = eventsData.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div className="event-detail-container">Event not found!</div>;
  }
  const handleProceedToPayment = () => {
    navigate('/payment-screen', { state: { event, quantity } });
  };
  return (
    <div className="event-detail-container">
      <div className="event-detail-card">
        <img src={event.image} alt={event.title} className="event-detail-image" />
        <div className="event-detail-content">
          <h2 className="event-detail-title">{event.title}</h2>
          <p className="event-detail-category">{event.category}</p>
          <p className="event-detail-description">{event.description}</p>
          <div className="event-detail-info">
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Price:</strong> ${event.price.toFixed(2)}</p>
          </div>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="book-btn" onClick={handleProceedToPayment}>
            Book Now (${(event.price * quantity).toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;