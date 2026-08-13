
import express from 'express';
import { drive } from '../utils/googleDrive.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    const response = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    
    // Set caching headers so browser caches the image
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    
    response.data
      .on('error', err => {
        console.error('Error piping image', err);
        res.status(500).send('Error');
      })
      .pipe(res);
  } catch (error) {
    console.error('Proxy Image Error:', error.message);
    res.status(404).send('Image not found');
  }
});

export default router;

