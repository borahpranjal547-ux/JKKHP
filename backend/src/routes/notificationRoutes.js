import { Router } from 'express';
import { myNotifications, sendBroadcast } from '../controllers/notificationController.js';
import { authRequired, authorize } from '../middleware/auth.js';

const router = Router();
router.get('/mine', authRequired, myNotifications);
router.post('/broadcast', authRequired, authorize('admin'), sendBroadcast);

export default router;
