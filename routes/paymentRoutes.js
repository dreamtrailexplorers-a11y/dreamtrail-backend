import express from 'express';
import { createOrder, verifyPayment, createBalanceOrder, verifyBalancePayment } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', authMiddleware, createOrder);
router.post('/verify', authMiddleware, verifyPayment);
router.post('/create-balance-order', authMiddleware, createBalanceOrder);
router.post('/verify-balance', authMiddleware, verifyBalancePayment);

export default router;
