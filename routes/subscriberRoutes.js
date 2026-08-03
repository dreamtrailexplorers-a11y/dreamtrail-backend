import express from 'express';
import { addSubscriber, getSubscribers, deleteSubscriber } from '../controllers/subscriberController.js';

const router = express.Router();

router.post('/', addSubscriber);
router.get('/', getSubscribers); // In production, add auth middleware here
router.delete('/:id', deleteSubscriber); // In production, add auth middleware here

export default router;
