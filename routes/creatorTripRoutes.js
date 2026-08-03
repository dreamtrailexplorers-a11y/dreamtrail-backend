import express from 'express';
import CreatorTrip from '../models/CreatorTrip.js';

const router = express.Router();

// Get all creator trips (populate linkedTrip if needed, though for list view we might just need basic details)
router.get('/', async (req, res) => {
  try {
    const creatorTrips = await CreatorTrip.find().populate('linkedTrip', 'title destination duration image');
    res.json(creatorTrips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single creator trip by id or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let query = {};
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: idOrSlug };
    } else {
      query = { slug: idOrSlug };
    }
    const creatorTrip = await CreatorTrip.findOne(query).populate('linkedTrip');
    if (!creatorTrip) return res.status(404).json({ message: 'Creator trip not found' });
    res.json(creatorTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new creator trip
router.post('/', async (req, res) => {
  const trip = new CreatorTrip(req.body);
  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a creator trip
router.put('/:id', async (req, res) => {
  try {
    const trip = await CreatorTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ message: 'Creator trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a creator trip
router.delete('/:id', async (req, res) => {
  try {
    const trip = await CreatorTrip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: 'Creator trip not found' });
    res.json({ message: 'Creator trip deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
