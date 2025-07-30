import React from "react";
import { Link } from "react-router-dom";
import "./EventList.css";

const events = [
  {
    id: 1,
    title: "Music Concert",
    description: "An evening of live music performances by top artists.",
  },
  {
    id: 2,
    title: "Tech Conference",
    description: "Explore the latest in technology and innovation.",
  },
  {
    id: 3,
    title: "Art Workshop",
    description: "A hands-on workshop for budding artists.",
  },
];

const EventList = () => {
  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>
      <div className="events">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <Link to={`/event/${event.id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
