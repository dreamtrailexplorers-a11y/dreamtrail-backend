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

import { initiateResumableUpload, finalizeResumableUpload } from '../utils/googleDrive.js';

// POST /api/upload/initiate
// Body: { filename: 'test.pdf', mimetype: 'application/pdf' }
router.post('/initiate', express.json(), async (req, res) => {
  try {
    const { filename, mimetype } = req.body;
    if (!filename || !mimetype) {
      return res.status(400).json({ message: 'Filename and mimetype are required' });
    }
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const origin = req.headers.origin || 'https://dreamtrail-frontend.vercel.app';
    const uploadUrl = await initiateResumableUpload(filename, mimetype, folderId, origin);
    res.json({ uploadUrl });
  } catch (error) {
    console.error('Error initiating upload:', error);
    res.status(500).json({ message: 'Failed to initiate upload', error: error.message });
  }
});

// POST /api/upload/finalize
// Body: { fileId: '...', mimetype: 'application/pdf' }
router.post('/finalize', express.json(), async (req, res) => {
  try {
    const { fileId, mimetype } = req.body;
    if (!fileId) {
      return res.status(400).json({ message: 'File ID is required' });
    }
    const publicUrl = await finalizeResumableUpload(fileId, mimetype);
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Error finalizing upload:', error);
    res.status(500).json({ message: 'Failed to finalize upload', error: error.message });
  }
});

export default router;
