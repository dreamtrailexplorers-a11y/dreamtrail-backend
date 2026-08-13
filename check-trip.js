
import mongoose from 'mongoose';
import Trip from './models/Trip.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI).then(async () => {
  const trip = await Trip.findOne({ title: 'asd' });
  console.log('Trip image URL:', trip?.image);
  process.exit();
}).catch(console.error);

