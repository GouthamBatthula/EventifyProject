import React, { useState } from 'react';
import axios from 'axios';
import './AddEvents.css';

function AddEvents() {
  const [event, setEvent] = useState({ EventName: '', EventDate: '', Description: '', TicketPrice: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    setMessage(''); // Clear the message
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!event.EventName || !event.EventDate || !event.Description || !event.TicketPrice) {
      setMessage('All fields are required!');
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(event.EventDate)) {
      setMessage('Please enter a valid date (yyyy-mm-dd).');
      return;
    }

    // Check if the date is in the future
    const currentDate = new Date();
    const eventDate = new Date(event.EventDate);
    if (eventDate <= currentDate) {
      setMessage('Date must be in the future🥱.');
      return;
    }

    setIsSubmitting(true);
    axios.post('http://localhost:5000/api/data', {
      ...event,
      EventDate: eventDate.toISOString()
    })
      .then((response) => {
        setEvent({ EventName: '', EventDate: '', Description: '', TicketPrice: '' });
        setMessage('Event added successfully! 😄');
      })
      .catch((error) => {
        console.error('Error adding event:', error.response ? error.response.data : error.message);
        setMessage('Failed to add event. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="add-events-page">
      <header className="AddEvents-header">
        <h1>Add New Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="EventName"
              value={event.EventName}
              onChange={handleChange}
              placeholder="Enter Event Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Event Date:</label>
            <input
              type="date"
              id="eventDate"
              name="EventDate"
              value={event.EventDate}
              onChange={handleChange}
              placeholder="yyyy-mm-dd"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDescription">Event Description:</label>
            <textarea
              id="eventDescription"
              name="Description"
              value={event.Description}
              onChange={handleChange}
              placeholder="Enter Event Description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticketPrice">Ticket Price:</label>
            <input
              type="number"
              step="0.01"
              id="ticketPrice"
              name="TicketPrice"
              value={event.TicketPrice}
              onChange={handleChange}
              placeholder="Enter Price per Ticket"
              required
            />
          </div>
          <button type="submit" className="navigate-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Add Event'}
          </button>
        </form>
        {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
      </header>
    </div>
  );
}

export default AddEvents;
