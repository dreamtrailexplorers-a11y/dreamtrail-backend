import Subscriber from '../models/Subscriber.js';

// Add new subscriber
export const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'You are already subscribed!' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Add subscriber error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all subscribers (Admin)
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete subscriber (Admin)
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Subscriber.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
