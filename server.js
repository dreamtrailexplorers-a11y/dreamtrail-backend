import express from 'express';
// Trigger restart 2
import dotenv from 'dotenv';
import './cron/reminderCron.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Import Routes
import destinationRoutes from './routes/destinationRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import navLinkRoutes from './routes/navLinkRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import creatorTripRoutes from './routes/creatorTripRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import attractionRoutes from './routes/attractionRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import customPageRoutes from './routes/customPageRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();



import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: [
    'https://dreamtrail-frontend.vercel.app', 
    'http://localhost:5173',
    'http://localhost:3000',
    "https://dreamtrail-frontend-4y319slij-dreamtrail1.vercel.app",
    "https://dreamtrail-frontend-bu6pcny0q-dreamtrail1.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

let isMemoryDbConnected = false;

// Database Connection for Serverless (Vercel)
const connectDB = async () => {
  // Check if we have a connection to the database or if it's currently connecting
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return;
  }

  let mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/dreamtrail';
  
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB (${mongoUri.includes('cluster') ? 'Atlas' : 'Local'})`);
  } catch (err) {
    console.log('MongoDB connection failed:', err.message);
    if (!isMemoryDbConnected) {
      try {
        console.log('Falling back to In-Memory MongoDB...');
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        isMemoryDbConnected = true;
        console.log('Connected to In-Memory MongoDB');
      } catch (memErr) {
        console.error('Failed to connect to In-Memory MongoDB:', memErr);
      }
    }
  }
};

// Middleware to ensure DB connection on every request before hitting API routes
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// API Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/navlinks', navLinkRoutes);
app.use('/api/settings', siteSettingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/creator-trips', creatorTripRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/custom-pages', customPageRoutes);

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('DreamTrail Backend API is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DreamTrail Travel Server is running' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

