import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  // Hero Section
  heroHeading: { type: String, default: 'Experiences for\nTourist Explorers' },
  heroImages: { type: [String], default: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80'] },
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
      pillText: { type: String, default: '' }
    }],
    default: [{
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
      title: 'Group Trips',
      subtitle: 'It\'s time for',
      pillText: 'Join solo or bring your buddy'
    }]
  },
  
  // Contact Info
  address: { type: String, default: 'DreamTrail Experiences Pvt. Ltd.\n508, 3rd Eye Vision, IIM Road, Ahmedabad, Gujarat 380015' },
  phone: { type: String, default: '90 99 599 331' },
  whatsappNumber: { type: String, default: '9099599331' },
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
  careersContent: { type: String, default: 'Join our team...' },
  contactUsContent: { type: String, default: 'Get in touch with us...' },
  termsContent: { type: String, default: 'Terms and Conditions...' },
  privacyPolicyContent: { type: String, default: 'Privacy Policy...' },
  paymentDetailsContent: { type: String, default: 'Payment Options...' },
  
  // Footer
  copyrightText: { type: String, default: '© 2026 DreamTrail Experiences Private Limited. All rights reserved.' },
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;
