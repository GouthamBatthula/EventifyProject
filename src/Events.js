import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEventClick = (event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.EventDate);
    if (eventDate >= currentDate) {
      navigate('/register-event', { state: { event } });
    }
  };

  return (
    <div className="events-page">
      <header className="Events-header">
        <h1>Upcoming Events</h1>
      </header>
      <div className="events">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => {
            const eventDate = new Date(event.EventDate);
            const isPast = eventDate < new Date();

            return (
              <div
                key={event._id}
                className={`event ${isPast ? 'disabled-event' : ''}`}
                onClick={() => !isPast && handleEventClick(event)}
              >
                <h2>{event.EventName}</h2>
                <p>Date: {eventDate.toLocaleDateString()}</p>
                <p>Description: {event.Description}</p>
                <p>Price per Ticket: ₹ {event.TicketPrice.toFixed(2)}</p>
                {isPast && <p className="closed-text">Registrations Closed</p>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Events;
