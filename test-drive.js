
import { drive } from './utils/googleDrive.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    console.log('Testing with Folder ID:', folderId);
    const folder = await drive.files.get({
      fileId: folderId,
      fields: 'id,name'
    });
    console.log('Success:', folder.data);
  } catch(e) {
    console.error('Error:', e.message);
  }
}
test();

