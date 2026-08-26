import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadToCloudinary } from './utils/cloudinary.js';

// Models
import Trip from './models/Trip.js';
import Destination from './models/Destination.js';
import Blog from './models/Blog.js';
import SiteSettings from './models/SiteSettings.js';
import Attraction from './models/Attraction.js';
import CustomPage from './models/CustomPage.js';
import CreatorTrip from './models/CreatorTrip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dreamtrail';

const isDriveUrl = (url) => url && (url.includes('drive.google.com') || url.includes('lh3.googleusercontent.com'));

async function processUrl(url) {
  if (isDriveUrl(url)) {
    console.log(`Migrating: ${url}`);
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!response.ok) throw new Error(`Download failed with status ${response.status}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const newUrl = await uploadToCloudinary(buffer);
      console.log(`Success -> ${newUrl}`);
      return newUrl;
    } catch (e) {
      console.error(`Failed to migrate: ${url}`, e.message);
      return url; // return original if failed
    }
  }
  return url;
}

async function migrate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Destinations
    const destinations = await Destination.find({});
    for (let doc of destinations) {
      let changed = false;
      if (isDriveUrl(doc.image)) {
        doc.image = await processUrl(doc.image);
        changed = true;
      }
      if (changed) await doc.save();
    }
    console.log('Destinations done.');

    // Trips
    const trips = await Trip.find({});
    for (let doc of trips) {
      let changed = false;
      if (isDriveUrl(doc.image)) {
        doc.image = await processUrl(doc.image);
        changed = true;
      }
      if (doc.gallery && doc.gallery.length) {
        for (let i = 0; i < doc.gallery.length; i++) {
          if (isDriveUrl(doc.gallery[i])) {
            doc.gallery[i] = await processUrl(doc.gallery[i]);
            changed = true;
          }
        }
      }
      if (doc.itinerary && doc.itinerary.length) {
        for (let it of doc.itinerary) {
          if (isDriveUrl(it.image)) {
            it.image = await processUrl(it.image);
            changed = true;
          }
        }
      }
      if (changed) await doc.save();
    }
    console.log('Trips done.');

    // Blogs
    const blogs = await Blog.find({});
    for (let doc of blogs) {
      if (isDriveUrl(doc.image)) {
        doc.image = await processUrl(doc.image);
        await doc.save();
      }
    }
    console.log('Blogs done.');

    // Attractions
    const attractions = await Attraction.find({});
    for (let doc of attractions) {
      let changed = false;
      if (isDriveUrl(doc.image)) {
        doc.image = await processUrl(doc.image);
        changed = true;
      }
      if (doc.gallery && doc.gallery.length) {
        for (let i = 0; i < doc.gallery.length; i++) {
          if (isDriveUrl(doc.gallery[i])) {
            doc.gallery[i] = await processUrl(doc.gallery[i]);
            changed = true;
          }
        }
      }
      if (changed) await doc.save();
    }
    console.log('Attractions done.');

    // Creator Trips
    const creatorTrips = await CreatorTrip.find({});
    for (let doc of creatorTrips) {
      let changed = false;
      if (isDriveUrl(doc.image)) {
        doc.image = await processUrl(doc.image);
        changed = true;
      }
      if (doc.gallery && doc.gallery.length) {
        for (let i = 0; i < doc.gallery.length; i++) {
          if (isDriveUrl(doc.gallery[i])) {
            doc.gallery[i] = await processUrl(doc.gallery[i]);
            changed = true;
          }
        }
      }
      if (changed) await doc.save();
    }
    console.log('Creator Trips done.');

    // Custom Pages
    const customPages = await CustomPage.find({});
    for (let doc of customPages) {
      if (isDriveUrl(doc.heroImage)) {
        doc.heroImage = await processUrl(doc.heroImage);
        await doc.save();
      }
    }
    console.log('Custom Pages done.');

    // SiteSettings
    const settings = await SiteSettings.findOne({});
    if (settings) {
      let changed = false;
      if (isDriveUrl(settings.aboutHeroImage)) {
        settings.aboutHeroImage = await processUrl(settings.aboutHeroImage);
        changed = true;
      }
      if (settings.heroSliders) {
        for (let slide of settings.heroSliders) {
          if (isDriveUrl(slide.image)) {
            slide.image = await processUrl(slide.image);
            changed = true;
          }
        }
      }
      if (settings.groupTripBanners) {
        for (let banner of settings.groupTripBanners) {
          if (isDriveUrl(banner.image)) {
            banner.image = await processUrl(banner.image);
            changed = true;
          }
        }
      }
      if (changed) await settings.save();
    }
    console.log('SiteSettings done.');

    console.log('Migration Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
