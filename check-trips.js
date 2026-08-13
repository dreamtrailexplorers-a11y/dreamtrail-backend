
import mongoose from 'mongoose';
import Trip from './models/Trip.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI).then(async () => {
  const trips = await Trip.find({ title: 'asd' });
  trips.forEach(t => console.log('Trip ID:', t._id, 'Image:', t.image));
  process.exit();
}).catch(console.error);

