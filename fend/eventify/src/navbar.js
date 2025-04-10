import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure this file contains styles for the navbar

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Eventify</Link>
      </div>
      <div className="navbar-profile">
        <img
          src="/path/to/profile-icon.png" // Replace with the actual path to your profile icon
          alt="Profile"
          className="profile-icon"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-menu" onMouseLeave={closeDropdown}>
            <Link to="/login" className="dropdown-item" onClick={closeDropdown}>
              Login
            </Link>
            <Link to="/register" className="dropdown-item" onClick={closeDropdown}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
