import express from 'express';
import Booking from '../models/Booking.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { sendPaymentReminder } from '../utils/email.js';

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

// Get my bookings (for user)
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
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

// Send Payment Reminder Email (Admin)
router.post('/:id/send-reminder', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email phone');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    
    const result = await sendPaymentReminder(booking);
    if (result && result.success) {
      res.json({ success: true, message: result.message });
    } else {
      res.status(400).json({ 
        success: false, 
        message: result?.message || 'Failed to send reminder email. Check SMTP credentials.' 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
