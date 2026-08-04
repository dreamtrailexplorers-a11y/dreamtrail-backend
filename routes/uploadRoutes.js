import express from 'express';
import multer from 'multer';
import { uploadToGoogleDrive } from '../utils/googleDrive.js';

const router = express.Router();

// Use memory storage to avoid read-only file system issues on Vercel
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/upload
router.post('/', (req, res) => {
  upload.single('file')(req, res, async function (err) {
    if (err) {
      console.error("Multer Upload error:", err);
      return res.status(500).json({ 
        message: 'Image upload failed on server', 
        error: err.message || err 
      });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    try {
      // Get the Google Drive folder ID from environment variables
      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
      
      if (!folderId) {
        throw new Error('GOOGLE_DRIVE_FOLDER_ID is missing in .env');
      }

      // Upload to Google Drive and get the direct URL
      const fileUrl = await uploadToGoogleDrive(req.file, folderId);
      
      // Return the direct view URL
      res.json({ url: fileUrl });
      
    } catch (uploadError) {
      console.error("Google Drive Upload Error:", uploadError);
      res.status(500).json({ 
        message: 'Image upload to Google Drive failed', 
        error: uploadError.message || uploadError
      });
    }
  });
});

export default router;
