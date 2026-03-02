import { Router } from 'express';
import { allPayments, confirmPayment, createPaymentOrder, myPayments } from '../controllers/paymentController.js';
import { authRequired, authorize } from '../middleware/auth.js';

const router = Router();
router.post('/create-order', authRequired, createPaymentOrder);
router.post('/confirm', authRequired, confirmPayment);
router.get('/mine', authRequired, myPayments);
router.get('/', authRequired, authorize('admin'), allPayments);

export default router;
