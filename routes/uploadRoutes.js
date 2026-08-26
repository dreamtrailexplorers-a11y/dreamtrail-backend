import express from 'express';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// Use memory storage to avoid read-only file system issues on Vercel
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/upload
router.post('/', (req, res) => {
  console.log("✅ Upload route hit");

  upload.single('file')(req, res, async function (err) {

    console.log("✅ Multer finished");

    if (err) {
      console.error("❌ Multer Upload error:", err);
      return res.status(500).json({
        message: 'Image upload failed on server',
        error: err.message || err
      });
    }

    console.log("📄 req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      console.log("🚀 Calling uploadToCloudinary...");
      const fileUrl = await uploadToCloudinary(req.file.buffer);
      console.log("✅ Upload Success:", fileUrl);
      res.json({ url: fileUrl });
    } catch (uploadError) {
      console.error(" Cloudinary Upload Error:", uploadError);
      res.status(500).json({
        message: 'Image upload to Cloudinary failed',
        error: uploadError.message || uploadError
      });
    }
  });
});

// Since we switched to Cloudinary, resumable uploads aren't strictly needed
// But to prevent frontend errors if they use these endpoints, we'll keep placeholders
// or handle them as simple uploads if possible.
// Actually, Cloudinary handles chunked uploads via its own API, 
// but for standard small files, the above endpoint is enough.
// Let's just point `/initiate`, `/chunk`, `/finalize` to return standard URLs or errors if used.
// A better way is to update the frontend to use `/api/upload` directly if it's not already.

export default router;
