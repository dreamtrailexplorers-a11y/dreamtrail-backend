import express from 'express';
import multer from 'multer';
import { uploadToGoogleDrive } from '../utils/googleDrive.js';

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

      const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

      console.log("📂 Folder ID:", folderId);

      console.log("🚀 Calling uploadToGoogleDrive...");

      const fileUrl = await uploadToGoogleDrive(req.file, folderId);

      console.log("✅ Upload Success:", fileUrl);

      res.json({ url: fileUrl });

    } catch (uploadError) {
      console.error(" Google Drive Upload Error:", uploadError);
      res.status(500).json({
        message: 'Image upload to Google Drive failed',
        error: uploadError.message || uploadError
      });
    }
  });
});
export default router;
