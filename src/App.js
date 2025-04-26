import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Events from './Events';
import AddEvents from './AddEvents';
import ContactUs from './ContactUs';
import RegisterEvent from './RegisterEvent';
import Payment from './Payment';
import DownloadTicket from './DownloadTicket';
import Login from './Login';
import Register from './Register';
import Profile from './profile';
import './App.css';
import './navbar.css';
import { FaInstagram, FaYoutube, FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa'; // Import Font Awesome icons

function Layout({ children, user, handleLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="App">
      <nav className="navbar">
        <a href="#home" className="app-name"> </a>
        <img src={require('./assets/navbarlogo2.png')} alt="Eventify" className="navbar-logo" />
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/events">Events</a></li>
          {user && user.role === 'admin' && (
            <li><a href="/add-events">Add Event</a></li>
          )}
          <li><a href="/contact-us">Contact Us</a></li>
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
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <FaGoogle className="social-icon" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    return name && role ? { name, role } : null;
  });
    const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    if (name && role) {
      setUser({ name, role });
    }
  }, []);

  useEffect(() => {
    let ticking = false;
  
    const handleScroll = () => {
      const scrollY = window.scrollY;
  
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const maxScroll = 300;
          const scrollRatio = Math.min(scrollY / maxScroll, 1);
  
          const scale = 1 - scrollRatio * 0.5; // from 1 to 0.5
          const opacity = 1 - scrollRatio;     // from 1 to 0
  
          const welcomeSection = document.querySelector(".welcome-section");
          if (welcomeSection) {
            welcomeSection.style.transform = `scale(${scale}) translateY(-${scrollRatio * 50}px)`;
            welcomeSection.style.opacity = opacity;
          }
  
          setShowMessages(scrollY > 50);
          ticking = false;
        });
  
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    console.log("User logged out");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout user={user} handleLogout={handleLogout}>
              <div className="main-container">
                <header className="App-header">
                <div className="welcome-section">
                    <div className="welcome-message fade-in">
                      <p>
                        Welcome{user ? `, ` : ''}<br />
                        <span className="bold-text">{user ? user.name : 'Guest'}!</span>
                      </p>
                    </div>
                  </div>

                </header>

                <div className={`scroll-messages ${showMessages ? 'show' : ''}`}>
                  <h1>Book Your Spot Now!</h1>
                  <p>Join us for unforgettable moments,<br></br>book your event tickets with ease.</p>
                </div>

                {showMessages && (
                  <>
                    <div className="image-marquee-vertical">
                      <div className="image-track">
                        <img src={require('./assets/image.png')} alt="scrolling-img" />
                        <img src={require('./assets/image.png')} alt="scrolling-img" />
                        <img src={require('./assets/image.png')} alt="scrolling-img" />
                      </div>
                    </div>
                    <a href="/events" className="navigate-button">Go to Events</a>

                    {/* New Host Section */}
                    <div className="host-section">
                      <h2>Plan. Host. Impress.<br></br> Host Your Event With Us</h2>
                      <p>Take the first step to hosting your dream event with Eventify.<br></br> Create, manage, and share your events effortlessly.</p>
                      <button className="host-button">Host my Event</button>
                    </div>
                  </>
                )}
              </div>
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
                setUser(userData);
                localStorage.setItem('name', userData.name);
                localStorage.setItem('role', userData.role);
              }} />
            </Layout>
          }
        />
        <Route path="/register" element={<Layout user={user} handleLogout={handleLogout}><Register /></Layout>} />
        <Route path="/profile" element={<Layout user={user} handleLogout={handleLogout}><Profile /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
