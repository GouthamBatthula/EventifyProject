import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    setUser({ name, email });

    if (email) {
      axios
        .get(`http://localhost:5000/api/bookings/${email}`) // Replace with your actual API route
        .then((res) => setBookings(res.data))
        .catch((err) => {
          console.error('Error fetching bookings:', err);
          setBookings([]);
        });
    }
  }, []);

  return (
    <div className="profile-page" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div className="user-details" style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="user-bookings" style={{ flex: 2, border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h2>My Bookings</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                <strong>{booking.event}</strong> - {booking.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
