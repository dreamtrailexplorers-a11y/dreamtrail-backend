import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  saveAmount: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String, // URL to the uploaded PDF
  },
  destination: {
    type: String, // Slug or Name of the destination this trip belongs to
    required: true,
  },
  category: {
    type: String, // 'Motorcycle Tours', 'Group Tours', 'Winter Tours', 'Corporate Tours'
    required: true,
  },
  tag: {
    type: String, // e.g. "Trending", "Bestseller"
  },
  type: {
    type: String, // 'tour', 'group', 'creator'
    default: 'group',
  },
  galleryImages: {
    type: [String],
    default: [],
  },
  itinerary: [{
    day: String,
    title: String,
    desc: String,        // legacy field (kept for backward compat)
    paragraphs: [String], // NEW: array of paragraph texts
    points: [String],     // NEW: array of bullet points
    image: String
  }],
  attractions: [{
    title: String,
    subtitle: String,
    image: String
  }],
  inclusions: [{ type: mongoose.Schema.Types.Mixed }],
  mapImage: { type: String, default: '' },
  tourHighlights: [{ type: String }],
  exclusions: [{ type: mongoose.Schema.Types.Mixed }],
  amenities: [{ type: String }],
  aboutTrip: String,
  
  // NEW FIELDS
  stayDetails: [{
    locationName: String, // e.g. "Kuta"
    nights: Number, // e.g. 4
    hotels: [{
      name: String, // e.g. "Diamond Hotel"
      rating: String, // e.g. "4 * Hotel"
      roomType: String, // e.g. "Deluxe Room"
      mealPlan: String, // e.g. "Breakfast"
      image: String // e.g. Image URL
    }]
  }],

  packageOptions: [{
    title: String, // e.g. "Own Bike", "Rented Bike"
    price: Number, // e.g. 10000 (discounted)
    originalPrice: Number, // e.g. 15000 (original)
    days: String,  // e.g. "8 Days 7 Nights"
    image: String // uploaded image URL
  }],

  variants: [{
    name: String, // e.g. "Solo Rider", "2 Sharing"
    price: Number // e.g. 2000 (Add-on price)
  }],
  
  departureDates: [{
    start: String,  // e.g. "2024-08-10"
    end: String,    // e.g. "2024-08-17"
    status: String, // e.g. "Available", "Filling Fast", "Sold Out"
    price: Number   // e.g. 24000
  }],
  
  pricingTable: [{
    category: String, // e.g. "2 sharing", "3 sharing"
    options: [{ // specific prices for different options
      optionName: String, // should match packageOption title
      price: Number
    }]
  }],

  faqs: [{
    q: String,
    a: String
  }],
  
  // QUICK INFO FIELDS
  quickInfo: {
    packingList: [{ title: String, desc: String }],
    bookFlight: [{ title: String, desc: String }],
    knowBeforeYouGo: [{ title: String, desc: String }],
    paymentPolicy: [{ title: String, desc: String }],
    termsAndConditions: [{ title: String, desc: String }],
    cancellationAndRefundPolicy: [{ title: String, desc: String }],
    generalNote: [{ title: String, desc: String }]
  },
  
  // CREATOR TRIP SPECIFIC FIELDS
  curatorName: String,
  curatorAvatar: String,
  curatorFollowers: String,
  aboutItinerary: String,
  hotelCategory: String,
  meals: String
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
