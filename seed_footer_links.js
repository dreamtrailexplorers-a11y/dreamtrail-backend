import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import SiteSettings from './models/SiteSettings.js';

const seedFooterLinks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to DB');

    const settings = await SiteSettings.findOne({});
    if (!settings) {
      console.log('No settings found. Creating one...');
      const newSettings = new SiteSettings({
        footerToursIndia: [
          { label: 'Ladakh', url: '/tour/ladakh' },
          { label: 'Spiti', url: '/tour/spiti' },
          { label: 'Zanskar', url: '/tour/zanskar' },
          { label: 'Tawang', url: '/tour/tawang' }
        ],
        footerToursAsia: [
          { label: 'Bhutan', url: '/tour/bhutan' },
          { label: 'Nepal', url: '/tour/nepal' }
        ],
        footerOtherLinks: [
          { label: 'Group Tours', url: '/group-trips' },
          { label: 'Corporate Tours', url: '/corporate-tours' },
          { label: 'Blogs', url: '/blogs' },
          { label: 'Terms & Condition', url: '/terms' },
          { label: 'Cancellation Policy', url: '/cancellation' },
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'About Us', url: '/about' },
          { label: 'Meet The Team', url: '/meet-the-team' },
          { label: 'Contact Us', url: '/contact' }
        ]
      });
      await newSettings.save();
      console.log('Created new settings with footer links.');
    } else {
      console.log('Updating existing settings with footer links...');
      settings.footerToursIndia = [
        { label: 'Ladakh', url: '/tour/ladakh' },
        { label: 'Spiti', url: '/tour/spiti' },
        { label: 'Zanskar', url: '/tour/zanskar' },
        { label: 'Tawang', url: '/tour/tawang' }
      ];
      settings.footerToursAsia = [
        { label: 'Bhutan', url: '/tour/bhutan' },
        { label: 'Nepal', url: '/tour/nepal' }
      ];
      settings.footerOtherLinks = [
        { label: 'Group Tours', url: '/group-trips' },
        { label: 'Corporate Tours', url: '/corporate-tours' },
        { label: 'Blogs', url: '/blogs' },
        { label: 'Terms & Condition', url: '/terms' },
        { label: 'Cancellation Policy', url: '/cancellation' },
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'About Us', url: '/about' },
        { label: 'Meet The Team', url: '/meet-the-team' },
        { label: 'Contact Us', url: '/contact' }
      ];
      await settings.save();
      console.log('Successfully updated footer links in the database!');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedFooterLinks();
