import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Use memory storage to avoid read-only file system issues on Vercel
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64 string
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    // Upload directly to Cloudinary using base64
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'dreamtrail_uploads',
    });
    
    // Return the direct Cloudinary URL
    res.json({ url: result.secure_url });

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ 
      message: 'Image upload failed on server', 
      error: error.message || error
    });
  }
});

export default router;
