import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/dreamtrail';

const convertGdrive = (url) => {
  if (typeof url === 'string') {
    if (url.includes('drive.google.com/thumbnail?id=')) {
      const id = url.split('id=')[1]?.split('&')[0];
      if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
    } else if (url.includes('drive.google.com/uc?id=')) {
      const id = url.split('id=')[1]?.split('&')[0];
      if (id) return `https://drive.google.com/uc?export=view&id=${id}`;
    }
  }
  return url;
};

// Define minimal schemas just to update
const destSchema = new mongoose.Schema({ image: String }, { strict: false });
const tripSchema = new mongoose.Schema({ image: String, images: [String], galleryImages: [String] }, { strict: false });
const settingsSchema = new mongoose.Schema({ heroImages: [String], groupTripBanners: [Object] }, { strict: false });

const Destination = mongoose.model('Destination', destSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Settings = mongoose.model('SiteSetting', settingsSchema);

const fixDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to DB');

    const destinations = await Destination.find({});
    let dCount = 0;
    for (const d of destinations) {
      const oldImg = d.image;
      d.image = convertGdrive(d.image);
      if (d.image !== oldImg) {
        await Destination.updateOne({ _id: d._id }, { $set: { image: d.image } });
        dCount++;
      }
    }
    console.log(`Updated ${dCount} Destinations`);

    const trips = await Trip.find({});
    let tCount = 0;
    for (const t of trips) {
      let updated = false;
      const oldImg = t.image;
      t.image = convertGdrive(t.image);
      if (t.image !== oldImg) updated = true;

      if (t.images && Array.isArray(t.images)) {
        const newImages = t.images.map(convertGdrive);
        if (JSON.stringify(t.images) !== JSON.stringify(newImages)) {
          t.images = newImages;
          updated = true;
        }
      }

      if (t.galleryImages && Array.isArray(t.galleryImages)) {
        const newGalleryImages = t.galleryImages.map(convertGdrive);
        if (JSON.stringify(t.galleryImages) !== JSON.stringify(newGalleryImages)) {
          t.galleryImages = newGalleryImages;
          updated = true;
        }
      }

      if (updated) {
        await Trip.updateOne({ _id: t._id }, { $set: { image: t.image, images: t.images, galleryImages: t.galleryImages } });
        tCount++;
      }
    }
    console.log(`Updated ${tCount} Trips`);

    // Fix Site Settings
    const settings = await Settings.find({});
    let sCount = 0;
    for (const s of settings) {
      let updated = false;
      
      if (s.heroImages && Array.isArray(s.heroImages)) {
        const newHeroes = s.heroImages.map(convertGdrive);
        if (JSON.stringify(s.heroImages) !== JSON.stringify(newHeroes)) {
          s.heroImages = newHeroes;
          updated = true;
        }
      }

      if (s.groupTripBanners && Array.isArray(s.groupTripBanners)) {
        const newBanners = s.groupTripBanners.map(b => ({ ...b, image: convertGdrive(b.image) }));
        if (JSON.stringify(s.groupTripBanners) !== JSON.stringify(newBanners)) {
          s.groupTripBanners = newBanners;
          updated = true;
        }
      }

      if (updated) {
        await Settings.updateOne({ _id: s._id }, { $set: { heroImages: s.heroImages, groupTripBanners: s.groupTripBanners } });
        sCount++;
      }
    }
    console.log(`Updated ${sCount} SiteSettings`);

    console.log('Done fixing DB');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixDb();
