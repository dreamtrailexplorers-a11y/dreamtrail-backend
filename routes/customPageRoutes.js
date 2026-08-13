import express from 'express';
import CustomPage from '../models/CustomPage.js';

const router = express.Router();

// @desc    Get all custom pages
// @route   GET /api/custom-pages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pages = await CustomPage.find({}).select('title slug createdAt');
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get custom page by slug
// @route   GET /api/custom-pages/:slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const page = await CustomPage.findOne({ slug: req.params.slug });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a custom page
// @route   POST /api/custom-pages
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const { title, slug, blocks } = req.body;
    
    const pageExists = await CustomPage.findOne({ slug });
    if (pageExists) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }

    const page = new CustomPage({
      title,
      slug,
      blocks: blocks || []
    });

    const createdPage = await page.save();
    res.status(201).json(createdPage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update a custom page
// @route   PUT /api/custom-pages/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const { title, slug, blocks } = req.body;
    const page = await CustomPage.findById(req.params.id);

    if (page) {
      page.title = title || page.title;
      page.slug = slug || page.slug;
      page.blocks = blocks || page.blocks;

      const updatedPage = await page.save();
      res.json(updatedPage);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a custom page
// @route   DELETE /api/custom-pages/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const page = await CustomPage.findById(req.params.id);

    if (page) {
      await page.deleteOne();
      res.json({ message: 'Page removed' });
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
