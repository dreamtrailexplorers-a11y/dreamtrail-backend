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
          text: { type: String, default: '' }
        }],
        default: []
      },
    introImages: { type: [String], default: [] },
    
    storyTitle: { type: String, default: 'Our Story' },
    storyText: { type: String, default: 'In 2009, a deep passion for the open road gave birth to Dream Riders...' },
    storyImage: { type: String, default: '' },
    
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
  cancellationBlocks: { type: [PolicyBlockSchema], default: [] },
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
    heroTitle: { type: String, default: 'Meet the Team' },
    heroSubtitle: { type: String, default: 'Dream Riders' },
    heroText: { type: String, default: 'We are a group of passionate riders...' },
    heroImage: { type: String, default: '' },
    quoteText: { type: String, default: 'WHAT INSPIRED ME...' },
    teamMembers: { type: [TeamMemberSchema], default: [] }
  },
  
  copyrightText: { type: String, default: '© 2026 DreamTrail Experiences Private Limited. All rights reserved.' },
}, { timestamps: true });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;
