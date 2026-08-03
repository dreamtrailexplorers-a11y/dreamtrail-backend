import mongoose from 'mongoose';
import Trip from './models/Trip.js';

mongoose.connect('mongodb://127.0.0.1:27017/dreamtrail').then(async () => {
  const trip = await Trip.findOne({slug: 'moscow-as'});
  console.log('TRIP FROM MONGOOSE:', trip);
  process.exit(0);
});
