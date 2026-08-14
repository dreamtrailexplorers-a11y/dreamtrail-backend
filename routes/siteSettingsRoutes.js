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

    // Auto-populate default footer links if they are empty
    let updated = false;
    if (!settings.footerToursIndia || settings.footerToursIndia.length === 0) {
      settings.footerToursIndia = [
        { label: 'Ladakh', url: '/destinations/ladakh' },
        { label: 'Spiti', url: '/destinations/spiti' },
        { label: 'Zanskar', url: '/destinations/zanskar' },
        { label: 'Tawang', url: '/destinations/tawang' }
      ];
      updated = true;
    }
    if (!settings.footerToursAsia || settings.footerToursAsia.length === 0) {
      settings.footerToursAsia = [
        { label: 'Bhutan', url: '/destinations/bhutan' },
        { label: 'Nepal', url: '/destinations/nepal' }
      ];
      updated = true;
    }
    if (!settings.footerOtherLinks || settings.footerOtherLinks.length === 0) {
      settings.footerOtherLinks = [
        { label: 'Group Tours', url: '/group-trips' },
        { label: 'Corporate Tours', url: '/corporate-tours' },
        { label: 'Blogs', url: '/blogs' },
        { label: 'Terms & Condition', url: '/terms' },
        { label: 'Cancellation Policy', url: '/cancellation' },
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'About Us', url: '/about' },
        { label: 'Meet The Team', url: '/meet-the-team' },
        { label: 'Contact Us', url: '/contact' }
      ];
      updated = true;
    }

    if (updated) {
      await settings.save();
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
