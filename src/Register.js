import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [userType, setUserType] = useState('User');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { ...form, userType });
      alert(res.data.msg);
      window.location.href = '/login';
    } catch (err) {
      console.error('Error during registration:', err);
      alert(err.response?.data?.msg || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="off"
          required
        /><br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          required
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        /><br />
        <label htmlFor="userType">Select User Type:</label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
