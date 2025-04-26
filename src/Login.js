import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      if (res.data.token) {
        alert('Login successful!');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('isLoggedIn', 'true');

        onLogin({ name: res.data.name, role: res.data.role });
        window.location.href = '/';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.response?.data?.msg || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
