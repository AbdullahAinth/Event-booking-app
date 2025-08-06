import React from 'react';
import { Link } from 'react-router-dom';
import './EventList.css';

const EventList = ({ events }) => {
  // Handle cases where events is null or an empty array
  if (!events || events.length === 0) {
    return (
      <div className="event-list-container">
        <h2 className="event-list-header">Upcoming Events</h2>
        <p className="no-events-message">No events available.</p>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      <h2 className="event-list-header">Upcoming Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id} className="event-card">
            <img src={event.image} alt={event.name} className="event-image" />
            <div className="event-info">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-description">{event.description}</p>
              <div className="event-meta">
                <span className="event-location">{event.location}</span>
                <span className="event-date">{event.date}</span>
                <span className="event-price">₹{event.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;
