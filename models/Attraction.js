import mongoose from 'mongoose';

const attractionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // Hero image
    required: true,
  },
  destination: {
    type: String, // Matches Destination name or slug
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  placesToVisitAround: [{
    title: String,
    desc: String
  }],
  thingsToDo: [{
    title: String,
    desc: String
  }],
  mustTryFood: [{
    title: String,
    desc: String
  }],
  cultureAndNature: {
    type: String,
  },
  localAttractions: [{
    title: String,
    desc: String
  }],
  shoppingSightseeing: [{
    title: String,
    desc: String
  }],
  bestTimeToVisit: {
    type: String,
  },
  faqs: [{
    q: String,
    a: String
  }],
  relatedTrips: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  }],
}, { timestamps: true });

const Attraction = mongoose.model('Attraction', attractionSchema);

export default Attraction;
