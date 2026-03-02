import { Router } from 'express';
import { createPayment, paymentHistory } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', protect, createPayment);
router.get('/', protect, paymentHistory);

export default router;
