import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const destinations = await Destination.find(filter).sort({ createdAt: -1 });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new destination
router.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a destination
router.put('/:id', async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a destination
router.delete('/:id', async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
