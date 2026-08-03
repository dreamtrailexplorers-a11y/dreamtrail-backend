import express from 'express';
import { 
  getAttractions, 
  getAttractionsByDestination,
  getAttractionBySlug,
  getAttractionById,
  createAttraction, 
  updateAttraction, 
  deleteAttraction 
} from '../controllers/attractionController.js';

const router = express.Router();

router.get('/', getAttractions);
router.get('/destination/:destination', getAttractionsByDestination);
router.get('/slug/:slug', getAttractionBySlug);
router.get('/:id', getAttractionById);
router.post('/', createAttraction);
router.put('/:id', updateAttraction);
router.delete('/:id', deleteAttraction);

export default router;
