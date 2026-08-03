import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['domestic', 'international'],
    required: true,
  },
  icon: {
    type: String,
    default: 'MdOutlineLocationCity'
  },
  aboutText: {
    type: String,
    default: ''
  },
  handpickedHotels: [{
    title: String,
    image: String,
    star: String,
    startPrice: String
  }],
  curatedExperiences: [{
    title: String,
    image: String,
    type: { type: String }, // type is a reserved keyword in Mongoose schema definition without nesting
    startPrice: String
  }],
  placesToVisit: [{
    title: String,
    image: String
  }],
  citiesList: [{ type: String }],
  faqs: [{
    q: String,
    a: String
  }],
  popularCities: [{ type: String }]
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
