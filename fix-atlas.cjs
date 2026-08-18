const mongoose = require('mongoose');

async function fixAtlasDB() {
  const uri = 'mongodb+srv://dreamtrailexplorers:dreamtrailexplorers%40123@cluster0.3yo9d4h.mongodb.net/dreamtrail?appName=Cluster0';
  console.log("Connecting to Atlas...");
  await mongoose.connect(uri);
  
  const db = mongoose.connection.db;
  
  // Find the trip first to verify
  const trips = await db.collection('trips').find({ destination: { $regex: /spiti/i } }).toArray();
  console.log("Found trips with Spiti:", trips.map(t => t.title));
  
  if (trips.length > 0) {
    const result = await db.collection('trips').updateMany(
      { destination: { $regex: /spiti/i } },
      { $set: { destination: 'Himachal Pradesh' } }
    );
    console.log(`Updated ${result.modifiedCount} trips to Himachal Pradesh!`);
  }
  
  mongoose.disconnect();
}

fixAtlasDB().catch(console.error);
