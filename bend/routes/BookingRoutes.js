// GET bookings by email
router.get('/bookings/:email', async (req, res) => {
    try {
      const bookings = await Booking.find({ email: req.params.email });
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ msg: 'Failed to fetch bookings', error: err.message });
    }
  });
  