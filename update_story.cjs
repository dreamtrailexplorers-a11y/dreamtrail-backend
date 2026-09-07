const mongoose = require('mongoose');
const uri = 'mongodb+srv://dreamtrailexplorers:dreamtrailexplorers%40123@cluster0.3yo9d4h.mongodb.net/dreamtrail?appName=Cluster0';

mongoose.connect(uri)
  .then(async () => {
    console.log('Connected to DB');
    const SiteSettings = mongoose.model('SiteSettings', new mongoose.Schema({}, { strict: false }));
    const settings = await SiteSettings.findOne({});
    if (settings) {
      let currentText = settings.aboutPage && settings.aboutPage.storyText ? settings.aboutPage.storyText : '';
      const addition = 'Our story carries the legacy of Mr. Vishnu Mehta, a pioneer of motorcycling in India, whose journeys across India, Nepal, Bhutan, and the United States have covered more than 3 million kilometres, earning him 5 Guinness World Records and 5 Limca Book of National Records.';
      if (!currentText.includes('Vishnu Mehta')) {
        currentText += '\n\n' + addition;
        await SiteSettings.updateOne({ _id: settings._id }, { $set: { 'aboutPage.storyText': currentText } });
        console.log('Updated storyText in DB.');
      } else {
        console.log('Already contains the text.');
      }
    } else {
      console.log('No settings found');
    }
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
