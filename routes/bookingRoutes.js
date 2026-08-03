import express from 'express';
import Booking from '../models/Booking.js';
// We should protect this with admin auth middleware ideally, but for now we'll just get all
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email phone').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (for admin)
router.put('/:id', async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { paymentStatus }, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete booking (for admin)
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
