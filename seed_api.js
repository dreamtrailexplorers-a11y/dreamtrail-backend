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
        { label: 'Ladakh', url: '/tour/ladakh' },
        { label: 'Spiti', url: '/tour/spiti' },
        { label: 'Zanskar', url: '/tour/zanskar' },
        { label: 'Tawang', url: '/tour/tawang' }
      ],
      footerToursAsia: [
        { label: 'Bhutan', url: '/tour/bhutan' },
        { label: 'Nepal', url: '/tour/nepal' }
      ],
      footerOtherLinks: [
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
