import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const siteSettingsSchema = new mongoose.Schema({
  corporateTours: { type: Object }
}, { strict: false });

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema, 'sitesettings');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB');

    let settings = await SiteSettings.findOne();
    if (!settings) {
      console.log('No SiteSettings found!');
      process.exit(1);
    }

    settings.corporateTours = {
      heroTitle: 'CORPORATE EXPERIENCES',
      heroSubtitle: 'DESIGNED BY DREAMTRAIL EXPLORERS',
      heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
      
      statsTitle: 'CORPORATE & MICE TOURS\nBeyond Business. Beyond Boundaries.',
      statsText: 'We turn corporate travel into experiences worth remembering. From meticulously planned MICE programs and incentive journeys to adventurous team escapes and leadership retreats, Dream Riders creates journeys that go beyond destinations. Every experience is crafted to reward people, strengthen relationships, ignite team spirit, and inspire a culture of collaborationâ€”because when teams experience more together, they achieve more together.',
      stats: [
        { number: '100+', label: 'Corporate Trips' },
        { number: '11+', label: 'Years of Legacy' },
        { number: '15+', label: 'Destinations' },
        { number: '90%', label: 'Client Retention' }
      ],

      featuresTitle: 'Why Dreamtrail Explorers',
      featuresText: 'Because the best teams are built beyond the boardroom.\n\nWe create corporate travel experiences that blend adventure, discovery, and togetherness. From celebrating milestones to simply stepping away from the everyday, our journeys help teams reconnect, recharge, and return with stronger relationships, fresh perspectives, and renewed energy.',
      features: [
        { title: 'Expert-Guided Adventures', text: 'Every Dreamtrail Explorers journey is led by experienced, knowledgeable professionals who understand the terrain, challenges, and spirit of adventure. From navigating unpredictable routes to ensuring your team\'s safety, our experts are there every step of the wayâ€”so you can focus on the ride, the experience, and creating unforgettable memories.', icon: 'FiUsers' },
        { title: 'Fully Customised Experiences', text: 'Your journey should be as unique as your team. From group size and travel style to interests, pace, and timeline, we tailor every detail to create an experience that fits you perfectly â€” never a one-size-fits-all itinerary.', icon: 'FiSliders' },
        { title: 'End-to-End Safety', text: 'Your safety comes first, every mile of the journey. From detailed pre-ride briefings and quality safety gear to experienced road captains, support vehicles, on-route assistance, and basic medical support, we ensure you\'re never alone on the road. With careful planning and a dedicated support team, you can focus on the adventure while we take care of the rest.', icon: 'FiShield' },
        { title: 'Premium Stays & Meals', text: 'Handpicked hotels, boutique stays, homestays, and camps offering the perfect blend of comfort, character, and breathtaking Himalayan surroundings. Enjoy thoughtfully planned stays and satisfying meals that keep you refreshed and ready for every adventure.', icon: 'FiCoffee' },
        { title: 'Documentation & Branding', text: 'Professional photography and videography that captures the spirit of every journey â€” from breathtaking landscapes and thrilling rides to unforgettable moments shared along the way. Perfect for building your brand story, social media content, promotional campaigns, and lasting memories of every Dreamtrail adventure.', icon: 'FiCamera' },
        { title: 'Dedicated On-Ground Support', text: 'Our experienced operations team stays with you throughout the journey, providing reliable on-ground assistance and seamless coordination. From logistics and guest support to handling unexpected situations, we ensure every detail is managed smoothlyâ€”so you can focus on enjoying the experience.', icon: 'FiFileText' }
      ],

      offeringsTitle: 'What We Offer\nOne Platform. Every Journey.',
      offeringsText: 'From high-altitude motorcycle expeditions to carefully crafted leisure holidays, Dreamtrail Explorers brings every kind of travel experience under one roof. We take care of the planning, logistics and experiencesâ€”so you can focus on the journey.',
      offerings: [
        { title: 'SIGNATURE ADVENTURES', text: 'Built on Roads. Bonded by Adventure.\nMulti-Day Motorcycle Expeditions for Your Team\nTake your team beyond the ordinary with unforgettable motorcycle journeys through Ladakh, Spiti, Bhutan, and Nepal. Ride breathtaking landscapes, conquer legendary mountain passes, and create shared experiences that strengthen trust, teamwork, and camaraderie.', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80' },
        { title: 'INCENTIVE', text: 'Incentive Travel Programs\nReward Achievements with Experiences Worth Remembering. Go beyond traditional rewards with exclusive incentive travel programs designed by Dreamtrail Explorers. From thrilling Himalayan expeditions and cultural journeys to curated domestic and international escapes, we create memorable experiences that celebrate success, strengthen teams, and inspire people to achieve more.\nBecause the best rewards aren\'t just received â€” they\'re experienced.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
        { title: 'MICE', text: 'Meetings & Conferences\nMeetings That Inspire. Destinations That Deliver.\nTake your next meeting, conference, or corporate gathering beyond the ordinary. Dreamtrail Explorers creates seamless MICE experiences in inspiring destinationsâ€”from serene mountain retreats to thoughtfully chosen offbeat locationsâ€”helping teams connect, collaborate, and make meaningful decisions.\nBecause the right destination makes every meeting more productive, engaging, and memorable.', image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=800&q=80' },
        { title: 'TEAM OUTINGS', text: 'Weekend Getaways for Better Connections\nTake a break from deadlines and bring your team closer with thoughtfully planned 2â€“3 day getaways. Whether it\'s a milestone celebration, team reward, or a simple recharge, Dreamtrail Explorers creates experiences that blend adventure, relaxation, and team bonding.\nFrom scenic escapes and outdoor adventures to cultural and leisure experiences, we handle the planning so your team can focus on connecting, celebrating, and enjoying the journey together.', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80' }
      ],

      galleryTitle: 'Where Teams Connect, Adventures Begin.',
      galleryText: 'Turn your next corporate getaway into more than just a trip. With Dreamtrail Explorers, experience thoughtfully crafted journeys that build stronger teams and create memories that last.',
      galleryImages: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504280390224-dd94c348f95c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=800&q=80'
      ],

      videoUrl: '',

      stepsTitle: 'How It Works\nFrom First Enquiry to Epic Adventure',
      stepsText: 'You dream it. We plan it. You ride it. We take care of everything in between.',
      steps: [
        { title: 'Share Requirements', text: 'Tell us your team size, dates, budget, and dream destination.' },
        { title: 'Custom Proposal', text: 'We design a bespoke itinerary and detailed quote within 48 hours.' },
        { title: 'Confirm & Book', text: 'Review, refine, approve â€” and lock in your dates with a simple advance.' },
        { title: 'Pre-Ride Briefing', text: 'Safety orientation, gear check, route walkthrough for every rider.' },
        { title: 'Ride & Celebrate', text: 'Your team rides, bonds, and returns with stories for a lifetime.' }
      ],

      testimonialsTitle: 'What Teams Say About Us',
      testimonials: [
        { text: 'An incredible experience for our entire team...', name: 'John Doe', designation: 'CEO, Tech Corp' }
      ],

      formTitle: 'Let\'s Plan Your Team\'s Adventure',
      formText: 'Connect with our corporate travel experts to customize a journey for your team.',
      formPoints: [
        { text: 'Custom itineraries for all group sizes' },
        { text: 'End-to-end logistics management' },
        { text: 'Dedicated trip coordinators' },
        { text: 'Flexible payment options' }
      ]
    };

    await settings.save();
    console.log('Successfully updated Corporate Tours settings in DB!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
seed();
