import { Router } from 'express';
import { allUsers, changePassword, profile, updateProfile, updateUserStatus } from '../controllers/userController.js';
import { authRequired, authorize } from '../middleware/auth.js';

const router = Router();
router.get('/me', authRequired, profile);
router.put('/me', authRequired, updateProfile);
router.patch('/me/password', authRequired, changePassword);
router.get('/', authRequired, authorize('admin'), allUsers);
router.patch('/:id', authRequired, authorize('admin'), updateUserStatus);

export default router;
