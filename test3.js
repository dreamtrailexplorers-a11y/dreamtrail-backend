import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/dreamtrail').then(async () => {
  const trip = await mongoose.connection.db.collection('trips').findOne({title: 'moscow-as'});
  console.log(trip);
  process.exit(0);
});
