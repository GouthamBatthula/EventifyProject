import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Events component has mounted');
    // Fetch data from the backend
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        console.log('Fetched events:', response.data);
        setEvents(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEventClick = (event) => {
    navigate('/register-event', { state: { event } });
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
          events.map((event) => (
            <div key={event._id} className="event" onClick={() => handleEventClick(event)}>
              <h2>{event.EventName}</h2>
              <p>Date: {new Date(event.EventDate).toLocaleDateString()}</p>
              <p>Description: {event.Description}</p>
              <p>Price per Ticket: ₹ {event.TicketPrice.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
