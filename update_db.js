import fetch from 'node-fetch';

async function updateDB() {
  const payload = {
    meetTheTeam: {
      heroImage: "https://lh3.googleusercontent.com/d/1MHD8p5r4hSITGl2kVQoSDmJlfeYgPcjo=w1000",
      heroTitle: "Meet the Team",
      heroSubtitle: "Dream Riders",
      heroText: "We are a group of passionate riders...",
      quoteText: "WHAT INSPIRED ME...",
      teamMembers: []
    }
  };

  try {
    const res = await fetch('http://localhost:5000/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log("Updated Settings:", data.meetTheTeam);
  } catch (err) {
    console.error(err);
  }
}

updateDB();
