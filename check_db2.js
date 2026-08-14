import fetch from 'node-fetch';

async function checkDB() {
  try {
    const res = await fetch('http://localhost:5000/api/settings');
    const data = await res.json();
    console.log(JSON.stringify(data.meetTheTeam, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkDB();
