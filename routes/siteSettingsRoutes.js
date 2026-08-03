import express from 'express';
import SiteSettings from '../models/SiteSettings.js';

const router = express.Router();

// GET /api/settings - Get site settings (create default if not exists)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/settings - Update site settings
router.put('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
