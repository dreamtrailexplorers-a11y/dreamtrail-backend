import Attraction from '../models/Attraction.js';

export const getAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttractionsByDestination = async (req, res) => {
  try {
    const attractions = await Attraction.find({ destination: req.params.destination });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttractionBySlug = async (req, res) => {
  try {
    const attraction = await Attraction.findOne({ slug: req.params.slug });
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAttraction = async (req, res) => {
  const attraction = new Attraction(req.body);
  try {
    const newAttraction = await attraction.save();
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json(attraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndDelete(req.params.id);
    if (!attraction) return res.status(404).json({ message: 'Attraction not found' });
    res.json({ message: 'Attraction deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
