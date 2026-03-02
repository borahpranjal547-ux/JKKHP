import { Router } from 'express';
import { createService, deleteService, getServices, updateService } from '../controllers/serviceController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getServices);
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;
