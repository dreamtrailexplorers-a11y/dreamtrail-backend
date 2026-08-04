import express from 'express';
import dotenv from 'dotenv';
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
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: [
    'https://dreamtrail-frontend.vercel.app', 
    'http://localhost:5173',
    "https://dreamtrail-frontend-4y319slij-dreamtrail1.vercel.app",
    "https://dreamtrail-frontend-bu6pcny0q-dreamtrail1.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Database Connection
const connectDB = async () => {
  let mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/dreamtrail';
  
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB (${mongoUri.includes('cluster') ? 'Atlas' : 'Local'})`);
    // const { seedDB } = await import('./seed.js');
    // await seedDB();
  } catch (err) {
    console.log('MongoDB connection failed, falling back to In-Memory MongoDB...', err.message);
    try {
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('Connected to In-Memory MongoDB');
      // const { seedDB } = await import('./seed.js');
      // await seedDB();
    } catch (memErr) {
      console.error('Failed to connect to In-Memory MongoDB:', memErr);
    }
  }
};

connectDB();

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
