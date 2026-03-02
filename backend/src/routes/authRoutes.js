import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, verifyOtp } from '../controllers/authController.js';

const router = Router();

router.post('/register', [body('name').notEmpty(), body('mobile').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })], register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

export default router;
