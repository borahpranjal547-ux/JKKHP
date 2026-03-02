import { Router } from 'express';
import { analytics, getUsers, toggleUserBlock } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();

router.get('/users', protect, adminOnly, getUsers);
router.patch('/users/:id/toggle-block', protect, adminOnly, toggleUserBlock);
router.get('/analytics', protect, adminOnly, analytics);

export default router;
