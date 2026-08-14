import mongoose from 'mongoose';
import SiteSettings from './models/SiteSettings.js';

async function run() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dreamtrail');
  const settings = await SiteSettings.findOne();
  console.log(JSON.stringify(settings.meetTheTeam, null, 2));
  process.exit();
}
run();
