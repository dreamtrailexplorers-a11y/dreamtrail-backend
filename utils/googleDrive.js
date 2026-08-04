import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse credentials from Environment Variable (for Vercel) or fallback to local file
const SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive'];
let auth;
if (process.env.GOOGLE_DRIVE_CREDENTIALS) {
  const credentials = JSON.parse(process.env.GOOGLE_DRIVE_CREDENTIALS);
  auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
} else {
  const KEYFILEPATH = path.join(__dirname, '../googleDrive.json');
  auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
  });
}

export const drive = google.drive({ version: 'v3', auth });

/**
 * Upload a file to Google Drive and return the viewable link.
 * @param {Object} file - The file object from Multer (req.file)
 * @param {string} folderId - The Google Drive folder ID (from .env)
 * @returns {Promise<string>} The shareable URL of the uploaded image
 */
export const uploadToGoogleDrive = async (file, folderId) => {
  try {
    const { originalname, mimetype, buffer } = file;

    const fileMetadata = {
      name: `${Date.now()}-${originalname}`,
      parents: folderId ? [folderId] : [],
    };

    // Convert Buffer to stream
    const { Readable } = await import('stream');
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    const media = {
      mimeType: mimetype,
      body: stream,
    };

    // Upload the file
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Generate the direct view link
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};
