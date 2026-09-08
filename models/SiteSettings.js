import mongoose from 'mongoose';

const PolicyBlockSchema = new mongoose.Schema({
  blockType: { type: String, enum: ['title', 'subtitle', 'text', 'point'], required: true },
  content: { type: String, required: true }
}, { _id: false });

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  whatsapp: { type: String },
  orderNumber: { type: String }, // e.g., "01", "02"
  teamType: { type: String, enum: ['Ride Marshal', 'Back Office'], default: 'Ride Marshal' }
});

const siteSettingsSchema = new mongoose.Schema({
    // Pre-Booking & Reminders Settings
  preBookingSettings: {
    amount: { type: Number, default: 5000 },
    
    
    
    refundPolicyText: { type: String, default: 'Pre-booking amount is strictly non-refundable.' }
  },

  // Hero Section
  heroHeading: { type: String, default: 'Experiences for\nTourist Explorers' },
  heroImages: { type: [String], default: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80'] },
  heroSliders: {
    type: [{
      image: { type: String, default: '' },
      heading: { type: String, default: '' }
    }],
    default: [
      {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
        heading: 'Experiences for\nTourist Explorers'
      },
      {
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80',
        heading: 'Experiences for\nTourist Explorers'
      }
    ]
  },
  heroVideoUrl1: { type: String, default: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-mountain-road-41539-large.mp4' },
  heroVideoUrl2: { type: String, default: '' },
  
  // Promotional Banners
  bannerVideoUrl: { type: String, default: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-car-driving-on-a-road-41544-large.mp4' },
  bannerVideoTitle: { type: String, default: 'Ladakh' },
  bannerVideoSubtitle: { type: String, default: 'Uncharted Expeditions & Bike Trips' },
  groupTripBanners: {
    type: [{
      image: { type: String, default: '' },
      title: { type: String, default: '' },
      subtitle: { type: String, default: '' },
      pillText: { type: String, default: '' },
      categoryLink: { type: String, default: '' }
    }],
    default: [{
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
      title: 'Group Trips',
      subtitle: 'It\'s time for',
      pillText: 'Join solo or bring your buddy',
      categoryLink: 'Group Tours'
    }]
  },
  
  // Contact Info
  address: { type: String, default: 'DreamTrail Experiences \n508, 3rd Eye Vision, IIM Road, Ahmedabad, Gujarat 380015' },
  phone: { type: String, default: '98751 29341' },
  whatsappNumber: { type: String, default: '9875129341' },
  email: { type: String, default: 'hello@dreamtrail.com' },
  
  // Social Media
  instagram: { type: String, default: '#' },
  youtube: { type: String, default: '#' },
  facebook: { type: String, default: '#' },
  twitter: { type: String, default: '#' },
  linkedin: { type: String, default: '#' },
  whatsapp: { type: String, default: '#' },
  
  // Razorpay
  razorpayKeyId: { type: String, default: '' },
  razorpayKeySecret: { type: String, default: '' },
  
  // Footer Pages Content (HTML/Text)
  aboutUsContent: { type: String, default: 'Welcome to DreamTrail...' },
  aboutPage: {
    heroTitle: { type: String, default: 'Where Your Riding Dreams Begin' },
    heroSubtitle: { type: String, default: 'Designed by Riders, for Riders' },
    heroImage: { type: String, default: '' },
    
    introTitle1: { type: String, default: 'Explore the Unexplored with Dream Riders' },
    introText1: { type: String, default: 'We transform your motorcycle travel dream into reality...' },
    introTitle2: { type: String, default: 'Expanding Horizon' },
    introText2: { type: String, default: 'Our journey has expanded...' },
      extraIntrosTitle: { type: String, default: 'Discover More' },
      extraIntrosSubtitle: { type: String, default: 'Delve deeper into our vision, philosophy, and the journey that brought us here.' },
      extraIntros: {
        type: [{
          title: { type: String, default: '' },
          text: { type: String, default: '' },
          points: [{
            title: { type: String, default: '' },
            text: { type: String, default: '' }
          }]
        }],
        default: []
      },
    introImages: { type: [String], default: [] },
    
    storyTitle: { type: String, default: 'Our Story' },
    storyText: { type: String, default: 'In 2009, a deep passion for the open road gave birth to Dream Riders...' },
    storyImage: { type: String, default: '' },
    storyImage2: { type: String, default: '' },
    storyImage3: { type: String, default: '' },
    
    communityTitle: { type: String, default: 'Join the Passionate Rider Community at Dream Riders Group' },
    communityText: { type: String, default: 'At Dream Riders Group, we believe that every journey begins with passion...' },
    communityPoints: [{
      text: { type: String, default: '' }
    }],
    
    whyChooseUsTitle: { type: String, default: 'WHY CHOOSE US FOR MOTORCYCLE TOURS' },
    whyChooseUsPoints: [{
      title: { type: String, default: '' },
      text: { type: String, default: '' }
    }],
    
    bannerTitle: { type: String, default: 'RIDE\nThat Stays With You Forever' },
    bannerSubtitle: { type: String, default: 'Experience the Euphoria of the open road...' },
    bannerImage: { type: String, default: '' }
  },
  aboutSnippet: {
    title: { type: String, default: 'The Dream Riders Group' },
    text: { type: String, default: 'Ready for the ride of a lifetime? At Dream Riders...' },
    points: [{
      icon: { type: String, default: '' },
      text: { type: String, default: '' }
    }]
  },
  careersContent: { type: String, default: 'Join our team...' },
  contactUsContent: { type: String, default: 'Get in touch with us...' },
  termsBlocks: { type: [PolicyBlockSchema], default: [] },
  privacyPolicyBlocks: { type: [PolicyBlockSchema], default: [] },
  cancellationSettings: {
    tableSubtitle: { type: String, default: 'Policy on cancellations & deductions – domestic travel (Premium & Deluxe Services)' },
    tableRows: {
      type: [{ leftText: String, rightText: String }],
      default: [
        { leftText: 'Non-Returnable Amount', rightText: 'Registration Amount' },
        { leftText: 'Within 54 to 31 Days Before Tour Commencement', rightText: '50% Forfeiture of Package Cost' },
        { leftText: 'Less than 30 Days or Failure to Travel', rightText: 'No Refund Allowed' }
      ]
    },
    middleSubtitle: { type: String, default: 'The GST amount is strictly non-refundable under any circumstances.' },
    middleText: { type: String, default: 'The booking amount is strictly non-refundable. Additionally, the GST amount is non-refundable under any circumstances. Participants may cancel their registration/booking at any time, provided they adhere to the standard cancellation policy, and send a cancellation request via email prior to the commencement of the tour.' },
    bottomSubtitle: { type: String, default: 'Standard booking, cancellation & refund policy' },
    bottomBullets: {
      type: [String],
      default: [
        'GST amount is non-refundable under any circumstance.',
        'The registration/booking amount is non-refundable and will be forfeited. The remaining balance, after deducting the registration amount and GST, will be eligible for a refund. This refund will be processed within 30 working days upon confirmation from our side and once the amount qualifies for a refund.'
      ]
    },
    redNote: { type: String, default: 'In the event of a no-show at the starting point for any reason, Dreamtrail Explorers will not be liable for refunding any amount paid.' }
  },
  paymentDetailsContent: { type: String, default: 'Payment Options...' },
  
  // Footer Links (Categorized)
  footerToursIndia: {
    type: [{ label: { type: String, required: true }, url: { type: String, required: true } }],
    default: [
      { label: 'Ladakh', url: '/tour/ladakh' },
      { label: 'Spiti', url: '/tour/spiti' },
      { label: 'Zanskar', url: '/tour/zanskar' },
      { label: 'Tawang', url: '/tour/tawang' }
    ]
  },
  footerToursAsia: {
    type: [{ label: { type: String, required: true }, url: { type: String, required: true } }],
    default: [
      { label: 'Bhutan', url: '/tour/bhutan' },
      { label: 'Nepal', url: '/tour/nepal' }
    ]
  },
  footerOtherLinks: {
    type: [{ label: { type: String, required: true }, url: { type: String, required: true } }],
    default: [
      { label: 'Group Tours', url: '/group-trips' },
      { label: 'Corporate Tours', url: '/corporate-tours' },
      { label: 'Blogs', url: '/blogs' },
      { label: 'Terms & Condition', url: '/terms' },
      { label: 'Cancellation Policy', url: '/cancellation' },
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'About Us', url: '/about' },
      { label: 'Meet The Team', url: '/meet-the-team' },
      { label: 'Contact Us', url: '/contact' }
    ]
  },
  
  // Meet The Team Page
  meetTheTeam: {
    heroTitle: { type: String, default: '' },
    heroSubtitle: { type: String, default: '' },
    heroText: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    quoteText: { type: String, default: '' },
    teamMembers: { type: [TeamMemberSchema], default: [] }
  },
  
  corporateTours: {
    heroTitle: { type: String, default: 'CORPORATE ADVENTURE' },
    heroSubtitle: { type: String, default: 'THE LEGACY OF DREAM RIDERS' },
    heroImage: { type: String, default: '' },
    
    statsTitle: { type: String, default: 'Ride Together,\nLead Together' },
    statsText: { type: String, default: 'Discover a new perspective on team building...' },
    stats: {
      type: [{
        number: { type: String },
        label: { type: String }
      }],
      default: [
        { number: '100+', label: 'Corporate Trips' },
        { number: '11+', label: 'Years of Legacy' },
        { number: '15+', label: 'Destinations' },
        { number: '90%', label: 'Client Retention' }
      ]
    },
    
    featuresTitle: { type: String, default: 'Corporate Travel, Reimagined' },
    featuresText: { type: String, default: 'From navigating unpredictable routes to ensuring your team\'s safety, our experts are there every step of the way—so you can focus on the ride, the experience, and creating unforgettable memories.' },
    features: {
      type: [{
        title: { type: String },
        text: { type: String },
        icon: { type: String }
      }],
      default: [
        { title: 'End-to-End Safety', text: 'Your safety comes first, every mile of the journey. From detailed pre-ride briefings and quality safety gear...', icon: 'FiShield' },
        { title: 'Fully Customised Experiences', text: 'Your journey should be as unique as your team. From group size and travel style to interests, pace, and timeline...', icon: 'FiSliders' },
        { title: 'Dedicated On-Ground Support', text: 'Our experienced operations team stays with you throughout the journey, providing reliable on-ground assistance...', icon: 'FiUsers' },
        { title: 'Premium Stays & Meals', text: 'Handpicked hotels, boutique stays, homestays, and camps offering the perfect blend of comfort, character...', icon: 'FiCoffee' },
        { title: 'Signature Adventures', text: 'Professional photography and videography that captures the spirit of every journey — from breathtaking landscapes...', icon: 'FiCamera' },
        { title: 'Documentation & Branding', text: 'We take care of the planning, logistics and experiences—so you can focus on the journey.', icon: 'FiFileText' }
      ]
    },
    
    offeringsTitle: { type: String, default: 'One Platform, Every Needs.' },
    offeringsText: { type: String, default: 'From high-altitude motorcycle expeditions to carefully crafted leisure holidays, Dreamtrail Explorers brings every kind of travel experience under one roof.' },
    offerings: {
      type: [{
        title: { type: String },
        text: { type: String },
        image: { type: String }
      }],
      default: [
        { title: 'TEAM OUTINGS', text: 'Weekend Getaways for Better Connections', image: '' },
        { title: 'INCENTIVE TRAVEL', text: 'Reward Achievements with Experiences Worth Remembering.', image: '' },
        { title: 'MICE', text: 'Meetings That Inspire. Destinations That Deliver.', image: '' },
        { title: 'SIGNATURE ADVENTURES', text: 'Built on Roads. Bonded by Adventure.', image: '' }
      ]
    },
    
    galleryTitle: { type: String, default: 'Where Will Your Team Ride?' },
    galleryText: { type: String, default: 'Turn your next corporate getaway into more than just a trip. With Dreamtrail Explorers, experience thoughtfully crafted journeys that build stronger teams and create memories that last.' },
    galleryImages: { type: [String], default: [] },
    
    videoUrl: { type: String, default: 'https://www.youtube.com/embed/XXXXXXX' },
    
    stepsTitle: { type: String, default: 'From Enquiry to Epic Ride' },
    stepsText: { type: String, default: 'Our five-step process takes you from planning to riding...' },
    steps: {
      type: [{
        title: { type: String },
        text: { type: String }
      }],
      default: [
        { title: 'Share Requirements', text: 'Tell us your team size, dates, budget, and dream destination.' },
        { title: 'Custom Proposal', text: 'We design a bespoke itinerary and detailed quote within 48 hours.' },
        { title: 'Confirm & Book', text: 'Review, refine, approve — and lock in your dates with a simple advance.' },
        { title: 'Pre-Ride Briefing', text: 'Safety orientation, gear check, route walkthrough for every rider.' },
        { title: 'Ride & Celebrate', text: 'Your team rides, bonds, and returns with stories for a lifetime.' }
      ]
    },
    
    testimonialsTitle: { type: String, default: 'What Teams Say About Us' },
    testimonials: {
      type: [{
        text: { type: String },
        name: { type: String },
        designation: { type: String }
      }],
      default: [
        { text: 'An incredible experience for our entire team...', name: 'John Doe', designation: 'CEO, Tech Corp' }
      ]
    },
    
    formTitle: { type: String, default: 'Let\'s Plan Your Team\'s Adventure' },
    formText: { type: String, default: 'Connect with our corporate travel experts to customize a journey for your team.' },
    contactPhone: { type: String, default: '+91 98980 36338\n+91 98985 54465' },
    contactWhatsapp: { type: String, default: '+91 98985 54465' },
    contactEmail: { type: String, default: 'info@dreamridersmototouring.com' },
    contactLocation: { type: String, default: 'Ahmedabad, Gujarat, India' },
    formPoints: {
      type: [{
        text: { type: String }
      }],
      default: [
        { text: 'Custom itineraries for all group sizes' },
        { text: 'End-to-end logistics management' },
        { text: 'Dedicated trip coordinators' },
        { text: 'Flexible payment options' }
      ]
    }
  },
  
  copyrightText: { type: String, default: '© 2026 Dreamtrail Explorers. All rights reserved.' },
  madeWithText: { type: String, default: 'Made with ❤️ in India 🇮🇳' },
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;
