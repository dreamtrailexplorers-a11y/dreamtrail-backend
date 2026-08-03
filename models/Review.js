import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  tripImage: {
    type: String,
    required: false,
  },
  tripImages: {
    type: [String],
    default: [],
  },
  review: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  tripSlug: {
    type: String,
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
