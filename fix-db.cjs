const mongoose = require('mongoose');

async function fixDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dreamtrail');
  
  // Update trips where destination is "Spiti" to "Himachal Pradesh"
  const db = mongoose.connection.db;
  const result = await db.collection('trips').updateMany(
    { destination: 'Spiti' },
    { $set: { destination: 'Himachal Pradesh' } }
  );
  
  console.log(`Updated ${result.modifiedCount} trips from Spiti to Himachal Pradesh`);
  
  mongoose.disconnect();
}

fixDB().catch(console.error);
