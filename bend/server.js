const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const paymentRoutes = require('./PaymentRoutes'); // Import the payment routes

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://gauthambatthula:tB89yK8n1HnWUsoV@eventifycluster.4kwjd.mongodb.net/Events?retryWrites=true&w=majority&appName=EventifyCluster';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

// Define the schema with Date as a Date object
const eventSchema = new mongoose.Schema({
  EventName: { type: String, required: true },
  EventDate: { type: Date, required: true }, // Renamed to EventDate
  Description: { type: String, required: true },
  TicketPrice: { type: Number, required: true }
});

const Event = mongoose.model('Event', eventSchema);

// Route to add a new event
app.post('/api/data', (req, res) => {
  console.log('Received POST request:', req.body);

  const { EventName, EventDate, Description, TicketPrice } = req.body;

  // Validate the incoming data
  if (!EventName || !EventDate || !Description || !TicketPrice) {
    return res.status(400).json({ error: 'All fields (EventName, EventDate, Description, TicketPrice) are required' });
  }

  // Parse the date
  const parsedDate = new Date(EventDate);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  // Check if the date is in the future
  const currentDate = new Date();
  if (parsedDate <= currentDate) {
    return res.status(400).json({ error: 'Date must be in the future🥱' });
  }

  // Create a new event object
  const newEvent = new Event({
    EventName,
    EventDate: parsedDate, // Store as Date object
    Description,
    TicketPrice
  });

  // Save the event to the database
  newEvent.save()
    .then((savedEvent) => {
      console.log('Event added successfully:', savedEvent);
      res.status(201).json({ message: 'Event added successfully!', event: savedEvent });
    })
    .catch((error) => {
      console.error('Error adding event:', error);
      res.status(500).json({ error: 'Failed to add event', details: error.message });
    });
});

// Route to get all events
app.get('/api/events', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(error => {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Failed to fetch events' });
    });
});

// Use the payment routes with a base path
app.use('/api/payment', paymentRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
