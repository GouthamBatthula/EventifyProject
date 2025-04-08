const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  event: {
    EventName: { type: String, required: true },
    EventDate: { type: Date, required: true },
    Description: { type: String, required: true },
    TicketPrice: { type: Number, required: true }
  },
  user: {
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    MobileNumber: { type: String, required: true }
  },
  paymentId: { type: String, required: true },
  barcodeNumber: { type: String, required: true }, // Add barcode number
  paymentDate: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

// Define the payment route
router.post('/', (req, res) => {
  const { event, user, paymentId, barcodeNumber } = req.body;

  // Log the incoming data
  console.log('Received payment data:', { event, user, paymentId, barcodeNumber });

  // Validate the incoming data
  if (!event || !user || !paymentId || !barcodeNumber) {
    return res.status(400).json({ error: 'Event, user, paymentId, and barcodeNumber are required' });
  }

  // Create a new payment object
  const newPayment = new Payment({
    event,
    user,
    paymentId,
    barcodeNumber
  });

  // Save the payment to the database
  newPayment.save()
    .then((savedPayment) => {
      res.status(201).json({ message: 'Payment saved successfully', payment: savedPayment });
    })
    .catch((error) => {
      console.error('Error saving payment:', error.message); // Log the error details
      res.status(500).json({ error: 'Failed to save payment', details: error.message });
    });
});

module.exports = router;
