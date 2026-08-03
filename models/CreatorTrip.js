import mongoose from 'mongoose';

const creatorTripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  curatorName: { type: String, required: true },
  curatorAvatar: { type: String },
  curatorFollowers: { type: String },
  aboutItinerary: { type: String },
  hotelCategory: { type: String },
  meals: { type: String },
  linkedTrip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  galleryImages: [{ type: String }] // Custom gallery images for creator
}, { timestamps: true });

const CreatorTrip = mongoose.model('CreatorTrip', creatorTripSchema);

export default CreatorTrip;
