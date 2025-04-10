import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // State for error messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form); // Ensure this matches the backend route
      console.log('Login response:', res.data);

      if (res.data.token) {
        alert('Login successful!');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('email', res.data.email); // ✅ Add this
        localStorage.setItem('role', res.data.role);


        onLogin({ name: res.data.name }); // Pass user data to parent component
        window.location.href = '/';
        
      } else {
        setError('Invalid email or password'); // Handle unexpected responses
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response && err.response.data?.msg) {
        setError(err.response.data.msg); // Display server error message
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
