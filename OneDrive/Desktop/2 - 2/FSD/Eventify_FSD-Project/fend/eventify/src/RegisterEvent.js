import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegisterEvent.css';

function RegisterEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    EventName: '',
    EventDate: '',
    Description: '',
    TicketPrice: ''
  });

  const [user, setUser] = useState({
    Name: '',
    MobileNumber: '',
    Email: ''
  });

  useEffect(() => {
    if (location.state && location.state.event) {
      setEvent(location.state.event);
    }
  }, [location.state]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the payment page with the event and user details
    navigate('/payment', { state: { event, user } });
  };

  return (
    <div className="register-event-page">
      <header className="RegisterEvent-header">
        <h1>Register Event Page</h1>
        <form onSubmit={handleSubmit} className="register-event-form">
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="EventName"
              value={event.EventName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Event Date:</label>
            <input
              type="date"
              id="eventDate"
              name="EventDate"
              value={event.EventDate.split('T')[0]} // Format date for input
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="Description"
              value={event.Description}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="ticketPrice">Ticket Price:</label>
            <input
              type="number"
              id="ticketPrice"
              name="TicketPrice"
              value={event.TicketPrice}
              readOnly
            />
          </div>
          <h2>User Information</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="Name"
              value={user.Name}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="MobileNumber"
              value={user.MobileNumber}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="Email"
              value={user.Email}
              onChange={handleUserChange}
              required
            />
          </div>
          <button type="submit" className="navigate-button">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default RegisterEvent;
