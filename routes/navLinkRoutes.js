import express from 'express';
import NavLink from '../models/NavLink.js';

const router = express.Router();

// Get all navlinks
router.get('/', async (req, res) => {
  try {
    const links = await NavLink.find().sort({ order: 1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new navlink
router.post('/', async (req, res) => {
  try {
    const link = new NavLink(req.body);
    const savedLink = await link.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a navlink
router.put('/:id', async (req, res) => {
  try {
    const updatedLink = await NavLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a navlink
router.delete('/:id', async (req, res) => {
  try {
    await NavLink.findByIdAndDelete(req.params.id);
    res.json({ message: 'NavLink deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
