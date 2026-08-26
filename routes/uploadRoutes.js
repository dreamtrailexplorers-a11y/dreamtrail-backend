import express from 'express';
import multer from 'multer';
import cloudinary, { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET /api/upload/signature
// Generates a signature for direct uploads from the frontend to Cloudinary.
// This completely bypasses Vercel's 4.5MB payload limit!
router.get('/signature', (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'dreamtrail';
    
    // The parameters that need to be signed
    const paramsToSign = {
      timestamp: timestamp,
      folder: folder
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    });
  } catch (error) {
    console.error("Signature generation error:", error);
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

// POST /api/upload
// Standard upload through backend (limited to 4.5MB by Vercel)
router.post('/', (req, res) => {
  upload.single('file')(req, res, async function (err) {
    if (err) return res.status(500).json({ message: 'Image upload failed on server', error: err.message || err });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    try {
      const fileUrl = await uploadToCloudinary(req.file.buffer);
      res.json({ url: fileUrl });
    } catch (uploadError) {
      res.status(500).json({ message: 'Image upload to Cloudinary failed', error: uploadError.message || uploadError });
    }
  });
});

export default router;
