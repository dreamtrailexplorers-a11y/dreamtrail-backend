import Destination from './models/Destination.js';
import Trip from './models/Trip.js';
import Blog from './models/Blog.js';
import Review from './models/Review.js';
import NavLink from './models/NavLink.js';
import SiteSettings from './models/SiteSettings.js';

const seedNavLinks = [
  { title: "Tour Packages", path: "/tour-packages", order: 1 },
  { title: "Group Trips", path: "/group-trips", order: 2 },
  { title: "Creator Trips", path: "/creator-trips", order: 3 }
];

const seedBlogs = [
  {
    title: "The Winter Beauty of Kashmir",
    author: "Aditi Raval",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80",
    excerpt: "Gulmarg snow adventures, frozen Dal lake shikara rides, and local Wazwan delicacies in Pahalgam.",
    contentBlocks: [
      {
        type: 'text',
        content: "Kashmir in winter is nothing short of a paradise on earth. The snow-clad mountains and frozen lakes offer a stunning visual treat that captivates every traveler's heart."
      },
      {
        type: 'image-full',
        url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
        caption: "Snow covered peaks in Gulmarg"
      }
    ]
  },
  {
    title: "Winter Spiti Valley Experience",
    author: "Avdhesh Patel",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    excerpt: "Exploring Key Monastery, the world's highest post office at Hikkim, and frozen Pin Valley.",
    contentBlocks: [
      {
        type: 'text',
        content: "Spiti Valley in winter is a mesmerizing wonderland of snow-capped peaks, frozen rivers, and ancient monasteries perched on icy cliffs. Exploring this high-altitude desert during the coldest months is not for the faint of heart, but the rewards are unparalleled."
      },
      {
        type: 'image-full',
        url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
        caption: 'The majestic Key Monastery covered in snow'
      },
      {
        type: 'text',
        content: "Our journey began in Shimla, winding our way through the treacherous yet breathtaking Hindustan-Tibet highway. The silence of the valley was broken only by the crunch of snow beneath our tires."
      },
      {
        type: 'image-half',
        images: [
          'https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1470229722913-7c092db62220?auto=format&fit=crop&w=600&q=80'
        ]
      }
    ]
  }
];

const seedReviews = [
  {
    author: "Jane Doe",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tripImage: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=600&q=80",
    review: "An amazing experience overall! The guides were very knowledgeable and the itinerary was well paced. Highly recommended."
  },
  {
    author: "Rahul Singh",
    location: "Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    tripImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    review: "Beautiful landscapes and great stays. Just wish we had one more day to explore."
  }
];

const seedTrips = [
  {
    title: "Spiti Valley Bike Trip",
    slug: "spiti-valley-bike-trip",
    duration: "8 Days 7 Nights",
    route: "Delhi - Chitkul - Kaza - Chandratal - Manali - Delhi",
    originalPrice: 29800,
    discountedPrice: 25800,
    saveAmount: 4000,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    tag: "Bestseller",
    type: "tour",
    galleryImages: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80"
    ],
    itinerary: [
      { day: "Day 1", title: "Delhi to Chitkul", desc: "Start early morning from Delhi. Beautiful drive through the hills." },
      { day: "Day 2", title: "Chitkul to Kaza", desc: "Cross the magnificent Kinnaur valley." }
    ],
    attractions: [
      { title: "Key Monastery", subtitle: "Ancient gompa", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80" }
    ],
    inclusions: ["Bike Rental", "Accommodation", "Meals"],
    exclusions: ["Fuel", "Personal Expenses"],
    departureDates: [
      { start: "1 Aug", end: "8 Aug", dayStart: "Sat", dayEnd: "Sat", status: "Available", price: "25800" }
    ],
    faqs: [
      { q: "Is biking experience required?", a: "Yes, you should be comfortable riding in mountains." }
    ]
  }
];

const seedDestinations = [
  {
    name: "Spiti Valley",
    slug: "spiti-valley",
    type: "domestic",
    startingPrice: 15999,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80",
    tagline: "The Middle Land",
    aboutText: "Spiti Valley is a cold desert mountain valley located high in the Himalayas.",
    handpickedHotels: [
      { title: "Kaza Eco Resort", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80", star: "4 Star Hotel", startPrice: "4,500" }
    ],
    curatedExperiences: [
      { title: "Monastery Tour", image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=600&q=80", type: "Culture", startPrice: "1,500" }
    ],
    placesToVisit: [
      { title: "Key Monastery", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80" }
    ],
    citiesList: ["Kaza", "Tabo", "Kibber"],
    faqs: [
      { q: "What is the best time to visit?", a: "June to September is best." }
    ],
    popularCities: ["Shimla", "Manali"]
  },
  {
    name: "Bali",
    slug: "bali",
    type: "international",
    startingPrice: 35000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    tagline: "Island of the Gods",
    aboutText: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    handpickedHotels: [],
    curatedExperiences: [],
    placesToVisit: [],
    citiesList: ["Ubud", "Kuta", "Seminyak"],
    faqs: [],
    popularCities: ["Denpasar"]
  }
];

export const seedDB = async () => {
  try {
    const destCount = await Destination.countDocuments();
    if (destCount === 0) {
      console.log('Seeding Database with dynamic seed data...');
      
      await Destination.insertMany(seedDestinations);
      await Trip.insertMany(seedTrips);
      await Blog.insertMany(seedBlogs);
      await Review.insertMany(seedReviews);
      await NavLink.insertMany(seedNavLinks);
      
      const settingsCount = await SiteSettings.countDocuments();
      if (settingsCount === 0) {
        await SiteSettings.create({});
      }
      
      console.log('Database seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
