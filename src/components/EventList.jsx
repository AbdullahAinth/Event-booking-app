import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/events';
import "../App.css";

const EventList = ({ selectedCategory }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    const filtered = selectedCategory === 'All'
      ? eventsData
      : eventsData.filter((event) => event.category === selectedCategory);
    setFilteredEvents(filtered);
  }, [selectedCategory]);
  return (
    <div className="event-list-container">
      <h2 className="event-list-header">Upcoming Events</h2>
      <div className="event-list">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img
              src={event.image}
              alt={event.title}
              className="event-image"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x250'; }}
            />
            <div className="event-details">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-category">{event.category}</p>
              <p className="event-date">
                {event.date} at {event.time}
              </p>
              <p className="event-price">${event.price.toFixed(2)}</p>
              <Link to={`/event/${event.id}`} className="details-button">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;