import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables immediately
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Parse credentials from Environment Variable (for Vercel) or fallback to local file
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const drive = google.drive({ version: 'v3', auth: oauth2Client });

/**
 * Upload a file to Google Drive and return the viewable link.
 * @param {Object} file - The file object from Multer (req.file)
 * @param {string} folderId - The Google Drive folder ID (from .env)
 * @returns {Promise<string>} The shareable URL of the uploaded image
 */
export const uploadToGoogleDrive = async (file, folderId) => {
  try {
    console.log("uploadToGoogleDrive called");
    console.log("Folder ID:", folderId);

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
    if (mimetype && mimetype.startsWith('image/')) {
      // Use lh3 CDN for maximum stability for images
      return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    } else {
      // Standard drive view link for PDFs and other files
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

/**
 * Initiates a resumable upload session with Google Drive.
 * Returns the resumable upload URL (Location header) which the client can use to PUT the file.
 */
export const initiateResumableUpload = async (filename, mimetype, folderId) => {
  try {
    const { token } = await oauth2Client.getAccessToken();
    
    const fileMetadata = {
      name: `${Date.now()}-${filename}`,
      parents: folderId ? [folderId] : [],
    };

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': mimetype
      },
      body: JSON.stringify(fileMetadata)
    });

    if (!response.ok) {
      throw new Error(`Failed to initiate upload: ${response.statusText}`);
    }

    const resumableUri = response.headers.get('Location');
    return resumableUri;
  } catch (error) {
    console.error('Error initiating resumable upload:', error);
    throw error;
  }
};

/**
 * Finalizes a resumable upload by making the file public and generating the view link.
 */
export const finalizeResumableUpload = async (fileId, mimetype) => {
  try {
    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // Generate the direct view link
    if (mimetype && mimetype.startsWith('image/')) {
      return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    } else {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  } catch (error) {
    console.error('Error finalizing resumable upload:', error);
    throw error;
  }
};
