import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Events from './Events';
import AddEvents from './AddEvents';
import ContactUs from './ContactUs';
import RegisterEvent from './RegisterEvent';
import Payment from './Payment'; // Ensure this import is correct
import DownloadTicket from './DownloadTicket'; // Import the DownloadTicket component

import './App.css';
import './navbar.css'; // Import the navbar CSS

function Layout({ children }) {
  return (
    <div className="App">
      <nav className="navbar">
        <a href="#home" className="app-name"> </a>
        <img src={require('./assets/navbarlogo2.png')} alt="Eventify" className="navbar-logo" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/add-events">Add Event</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
          <li><a href="/payment">Payment</a></li> {/* Add Payment link */}
        </ul>
      </nav>
      {children}
      <footer className="footer">
        <p>&copy; 2025 Eventify. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <header className="App-header">
                <img src={require('./assets/eventifylogo.png')} alt="Eventify" className="main-image" />
                <h1>Welcome to Eventify</h1>
                <p>Your one-stop solution for managing and attending events.</p>
                <a href="/events" className="navigate-button">Go to Events</a>
              </header>
            </Layout>
          }
        />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/add-events" element={<Layout><AddEvents /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
        <Route path="/register-event" element={<Layout><RegisterEvent /></Layout>} />
        <Route path="/payment" element={<Layout><Payment /></Layout>} /> {/* Add Payment route */}
        <Route path="/download-ticket" element={<Layout><DownloadTicket /></Layout>} /> {/* Add DownloadTicket route */}
      </Routes>
    </Router>
  );
}

export default App;
