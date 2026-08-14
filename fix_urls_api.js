import axios from 'axios';

const seedViaAPI = async () => {
  try {
    const adminToken = process.argv[2] || '';
    
    // First get existing settings
    console.log('Fetching current settings...');
    const res = await axios.get('http://localhost:5000/api/settings');
    const settings = res.data;
    
    console.log('Got settings. Updating footer links...');
    
    const updatedSettings = {
      ...settings,
      footerToursIndia: [
        { label: 'Ladakh', url: '/destinations/ladakh' },
        { label: 'Spiti', url: '/destinations/spiti' },
        { label: 'Zanskar', url: '/destinations/zanskar' },
        { label: 'Tawang', url: '/destinations/tawang' }
      ],
      footerToursAsia: [
        { label: 'Bhutan', url: '/destinations/bhutan' },
        { label: 'Nepal', url: '/destinations/nepal' }
      ],
    };
    
    // PUT back
    await axios.put('http://localhost:5000/api/settings', updatedSettings, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
    
    console.log('Successfully saved to DB via API!');
  } catch (error) {
    console.error('Error saving:', error.response?.data || error.message);
  }
};

seedViaAPI();
