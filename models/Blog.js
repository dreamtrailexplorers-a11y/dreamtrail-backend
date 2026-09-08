import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorAvatar: {
    type: String,
    required: false,
    default: '',
  },
  readTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
  excerpt: {
    type: String,
    required: true,
  },
  contentBlocks: [{
    type: { type: String, enum: ['text', 'image-full', 'image-half', 'image-grid'] },
    content: String,
    url: String,
    caption: String,
    images: [String]
  }]
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
