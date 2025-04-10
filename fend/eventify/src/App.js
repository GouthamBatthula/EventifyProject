import React, { useState, useEffect } from 'react'; // Add useState and useEffect
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Events from './Events';
import AddEvents from './AddEvents';
import ContactUs from './ContactUs';
import RegisterEvent from './RegisterEvent';
import Payment from './Payment'; // Ensure this import is correct
import DownloadTicket from './DownloadTicket'; // Import the DownloadTicket component
import Login from './Login';
import Register from './Register';
import Profile from './profile'; // Import the Profile component
import './App.css';
import './navbar.css'; // Import the navbar CSS

function Layout({ children, user, handleLogout }) {
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown

  return (
    <div className="App">
      <nav className="navbar">
        <a href="#home" className="app-name"> </a>
        <img src={require('./assets/navbarlogo2.png')} alt="Eventify" className="navbar-logo" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/events">Events</a></li>
          {user && user.role === 'admin' && ( // Show "Add Event" only for admin
            <li><a href="/add-events">Add Event</a></li>
          )}
          <li><a href="/contact-us">Contact Us</a></li>
          {/* Profile Dropdown */}
          <li
            className="profile-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span>👤 Profile ▾</span>
            {showDropdown && (
              <div className="dropdown-menu expanded">
                {user ? (
                  <>
                    <span className="dropdown-item">Hello, {user.name}</span>
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <Link to="/my-bookings" className="dropdown-item">My Bookings</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item">Login</Link>
                    <Link to="/register" className="dropdown-item">Register</Link>
                  </>
                )}
              </div>
            )}
          </li>
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
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    if (name && role) {
     setUser({ name, role });
    }
    } , []);

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
    localStorage.clear(); // Clear localStorage
    console.log("User logged out");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <header className="App-header">
                <img src={require('./assets/eventifylogo.png')} alt="Eventify" className="main-image" />
                <h1>Welcome to Eventify</h1>
                {user ? (
                  <p>Welcome, {user.name}!</p> // Display welcome message if user is logged in
                ) : (
                  <p>Your one-stop solution for managing and attending events.</p>
                )}
                <a href="/events" className="navigate-button">Go to Events</a>
              </header>
            </Layout>
          }
        />
        <Route path="/events" element={<Layout user={user} handleLogout={handleLogout}><Events /></Layout>} />
        <Route path="/add-events" element={<Layout user={user} handleLogout={handleLogout}><AddEvents /></Layout>} />
        <Route path="/contact-us" element={<Layout user={user} handleLogout={handleLogout}><ContactUs /></Layout>} />
        <Route path="/register-event" element={<Layout user={user} handleLogout={handleLogout}><RegisterEvent /></Layout>} />
        <Route path="/payment" element={<Layout user={user} handleLogout={handleLogout}><Payment /></Layout>} />
        <Route path="/download-ticket" element={<Layout user={user} handleLogout={handleLogout}><DownloadTicket /></Layout>} />
        <Route
          path="/login"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <Login onLogin={(userData) => {
                setUser(userData); // Update user state
                localStorage.setItem('name', userData.name); // Store user data in localStorage
              }} />
            </Layout>
          }
        />
        <Route path="/register" element={<Layout user={user} handleLogout={handleLogout}><Register /></Layout>} />
        <Route path="/profile" element={<Layout user={user} handleLogout={handleLogout}><Profile /></Layout>} /> {/* Add Profile route */}
      </Routes>
    </Router>
  );
}

export default App;
