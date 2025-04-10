const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Ensure the correct path to the User model

const SECRET_KEY = 'eventifysecretkey'; // Ensure this is consistent across the application

// Register Route
router.post('/register', async (req, res) => { // Ensure the route is '/register' and not '/api/auth/register'register'
  console.log('Register request received:', req.body); // Log the incoming request
  const { name, email, password, userType } = req.body;
  const allowedRoles = ['user', 'admin'];
  const role = allowedRoles.includes(userType?.toLowerCase()) ? userType.toLowerCase() : 'user';

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({ name, email, password, role });
    const savedUser = await user.save(); // Save user to the database

    console.log('User registered successfully:', savedUser); // Log the saved user
    res.status(201).json({ msg: 'Registered successfully', user: savedUser }); // Return success response
  } catch (err) {
    console.error('Error during registration:', err); // Log the error details
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
});

router.get('/register', (req, res) => {
  res.status(405).json({ msg: 'Use POST method to register a user' }); // Inform the user to use POST
});

// Login Route
router.post('/login', async (req, res, next) => { // Ensure this is the correct POST route
  console.log('Login route hit');
  console.log('Request body:', req.body);
  console.log('Login request received:', req.body);
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.error('Missing email or password in request body');
      return res.status(400).json({ msg: 'Email and password are required' }); // Updated key to 'msg'
    }

    console.log('Finding user with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(401).json({ msg: 'Invalid email or password' }); // Updated key to 'msg'
    }

    console.log('User found:', user);
    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password); // Use the comparePassword method correctly
    console.log('Password comparison result:', isMatch); // Log the result of password comparison
    if (!isMatch) {
      console.error('Invalid credentials for user:', email);
      return res.status(401).json({ msg: 'Invalid email or password' }); // Updated key to 'msg'
    }

    console.log('Password matched. Generating token...');
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Token generated successfully for user:', email);
    res.json({ msg: 'Login successful', token, role: user.role, name: user.name, email: user.email });
  } catch (err) {
    console.error('Error during login:', err); // Log the full error object
    res.status(500).json({ msg: 'An unexpected error occurred on the server.', error: err.message });
  }
  router.get('/test', (req, res) => {
    res.send('✅ Auth route is alive!');
  });
  
});

module.exports = router;
