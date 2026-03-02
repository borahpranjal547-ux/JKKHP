import { Router } from 'express';
import {
  allApplications,
  applyService,
  myApplications,
  trackApplicationById,
  updateApplicationStatus
} from '../controllers/applicationController.js';
import { adminOnly, protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/track/:trackingId', trackApplicationById);
router.post('/', protect, upload.array('documents', 5), applyService);
router.get('/mine', protect, myApplications);
router.get('/', protect, adminOnly, allApplications);
router.patch('/:id/status', protect, adminOnly, updateApplicationStatus);

export default router;
