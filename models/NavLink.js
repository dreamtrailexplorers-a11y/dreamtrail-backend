import mongoose from 'mongoose';

const navLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const NavLink = mongoose.model('NavLink', navLinkSchema);

export default NavLink;
