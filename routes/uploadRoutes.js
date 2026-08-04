import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dreamtrail_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
  }
});

const upload = multer({ storage: storage });

// POST /api/upload
router.post('/', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ 
        message: 'Image upload failed on server', 
        error: err.message || err 
      });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return the direct Cloudinary URL
    const fileUrl = req.file.path;
    
    res.json({ url: fileUrl });
  });
});

export default router;
