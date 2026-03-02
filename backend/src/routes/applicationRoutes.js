import { Router } from 'express';
import { allApplications, createApplication, myApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { authRequired, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();
router.post('/', authRequired, upload.array('documents', 5), createApplication);
router.get('/mine', authRequired, myApplications);
router.get('/', authRequired, authorize('admin'), allApplications);
router.patch('/:id/status', authRequired, authorize('admin'), updateApplicationStatus);

export default router;
