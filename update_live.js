import jwt from 'jsonwebtoken';
import fetch from 'node-fetch'; 

const JWT_SECRET = 'my_super_secret_login_key_98765';
const token = jwt.sign({ id: 'admin123' }, JWT_SECRET, { expiresIn: '1h' });

async function updateLive() {
  try {
    const meetTheTeam = {
      heroTitle: 'Meet The Team',
      heroSubtitle: 'The People Behind Dreamtrail Explorers',
      heroText: 'Meet the passionate explorers and riders who make every journey unforgettable.',
      teamMembers: [
        {
          name: 'Vinayak Mehta',
          role: 'Founder, Dreamtrail Explorers',
          teamType: 'Founder',
          description: `Behind every unforgettable journey is a vision — and behind Dreamtrail Explorers is **Vinayak Mehta**, a passionate explorer, rider, and the driving force behind the brand.\n\nFor Vinayak, travel has never been about simply reaching a destination. It is about everything that happens along the way — the roads that challenge you, the landscapes that leave you speechless, the people you meet, and the stories you carry home.\n\nWhat began with a deep passion for motorcycles, adventure, and discovering the lesser-explored corners of the world gradually evolved into a bigger vision: **"to create journeys that people don't just take, but truly experience."**\n\nThat vision became the foundation of Dreamtrail Explorers.\n\n### **The Vision Behind the Journey**\n\nVinayak believes that the best journeys are the ones that take you beyond your comfort zone and bring you closer to yourself.\n\nFrom winding Himalayan roads and remote mountain valleys to immersive cultural experiences and carefully crafted leisure escapes, his approach has always been the same — **travel should feel personal, meaningful, and unforgettable.**\n\nHe saw an opportunity to build a travel company that goes beyond conventional packages — one where every itinerary is thoughtfully designed, every detail matters, and every traveller feels like a part of the journey rather than just a passenger.\n\nFor Vinayak, Dreamtrail Explorers is not simply about selling tours. It is about **designing experiences that become stories worth telling.**\n\n#### **From Passion to Purpose**\n\nThe road taught Vinayak that adventure is not always about how far you go. Sometimes, it is about the people you meet, the unexpected moments you discover, and the memories created along the way.\n\nThis belief continues to shape Dreamtrail Explorers today.\n\nWhether it is a motorcycle expedition through the Himalayas, an exploration of India's hidden landscapes, or a thoughtfully curated leisure holiday, the goal remains constant — **to help travellers see more, feel more, and experience destinations differently.**\n\nWith a passion for exploration and an uncompromising focus on authentic experiences, Vinayak continues to lead Dreamtrail Explorers with one simple philosophy:\n\n"We don't just create tours. We curate experiences that stay with you."\nAnd every journey is an opportunity to discover something new — **out there, and within yourself.**`,
          image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          whatsapp: '',
          orderNumber: '01'
        },
        {
          name: 'Bipin Pancholi',
          role: 'Senior Tour Manager | Guinness World Records Holder',
          teamType: 'Ride Marshal',
          description: `With a passion for the open road and a wealth of real-world expedition experience, **Bipin Pancholi** brings a rare combination of adventure, discipline, and road wisdom to Dreamtrail Explorers.\n\nA **Guinness World Records holder**, Bipin has been part of record-setting trans-India driving expeditions, including achievements for the **lowest fuel consumption driving across India**. His experience goes far beyond the record itself — it reflects precision, endurance, route planning, and the ability to stay composed when the road gets unpredictable.\n\nAt Dreamtrail Explorers, Bipin plays a key role in ensuring that every expedition is not only exciting, but also **well-planned, safe, seamless, and memorable**. From navigating demanding routes to managing the unexpected challenges of long-distance travel, his experience adds confidence to every journey.\n\nFor Bipin, the road is more than a route — it is where experience meets adventure.`,
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          whatsapp: '',
          orderNumber: '02'
        },
        {
          name: 'Jackesh Patel',
          role: 'Tour Manager | Himalayan Explorer',
          teamType: 'Ride Marshal',
          description: `With a passion for the mountains and years of experience riding through the Himalayas, Jackesh Patel brings a perfect blend of adventure, awareness, and leadership to every expedition.\n\nCalm and approachable off the road, Jackesh becomes highly focused and composed when the ride begins. From challenging mountain passes to unpredictable Himalayan conditions, his experience and road sense help keep the journey smooth, safe, and enjoyable for every rider.\n\nFor Jackesh, the Himalayas are more than just a destination — they are a terrain he understands, respects, and loves to explore. His goal is simple: to lead every ride with confidence, create unforgettable experiences, and make sure every rider returns with stories worth sharing.\n\nExperienced on the roads. Trusted in the mountains. Driven by adventure.`,
          image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          whatsapp: '',
          orderNumber: '03'
        },
        {
          name: 'Mumtaz',
          role: 'Tour Manager | Himalayan Rider',
          teamType: 'Ride Marshal',
          description: `An experienced rider with a deep connection to the Himalayas, Mumtaz knows that every great motorcycle journey is about more than just the destination. From winding mountain roads to challenging high-altitude terrain, he brings real-world riding experience, confidence, and a calm approach to every expedition.\n\nNaturally playful, cheerful, and a little mischievous, Mumtaz brings plenty of fun and laughter to every journey. But when the road demands focus, he knows exactly when to switch from playful to purposeful—turning calm, serious, and decisive whenever the situation calls for it.\n\nWith the Himalayas as his playground, Mumtaz is the kind of person you want leading the way—keeping the ride smooth, the team together, and the adventure unforgettable.`,
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          whatsapp: '',
          orderNumber: '04'
        }
      ]
    };
    
    console.log('Sending PUT request to update settings...');
    const putRes = await fetch('https://dreamtrail-backend.vercel.app/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ meetTheTeam })
    });
    
    if (putRes.ok) {
      console.log('SUCCESS! Updated live database with markdown.');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

updateLive();
