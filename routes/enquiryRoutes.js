import express from 'express';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

// POST /api/enquiries - Create a new enquiry
router.post('/', async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    const savedEnquiry = await newEnquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/enquiries - Get all enquiries (for Admin)
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/enquiries/:id - Delete an enquiry
router.delete('/:id', async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
