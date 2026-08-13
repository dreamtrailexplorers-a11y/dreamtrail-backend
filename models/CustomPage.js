import mongoose from 'mongoose';

const customPageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  blocks: [{
    type: {
      type: String,
      enum: ['text', 'full-image', 'half-images', 'point-title-text'],
      required: true
    },
    // For text block
    content: {
      type: String,
    },
    // For images (full-image or first half of half-images)
    imageUrl1: {
      type: String,
    },
    // For second half of half-images
    imageUrl2: {
      type: String,
    },
    // For point-title-text
    title: {
      type: String,
    }
  }]
}, { timestamps: true });

const CustomPage = mongoose.model('CustomPage', customPageSchema);

export default CustomPage;
