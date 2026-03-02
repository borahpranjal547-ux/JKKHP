import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

const signToken = (user) => jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, mobile, email, password, aadhaar } = req.body;
  const existing = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const otp = '123456';
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, mobile, email, password: hash, aadhaar, otp, otpExpiresAt: new Date(Date.now() + 10 * 60000) });
  return res.status(201).json({ message: 'Registered. Verify OTP to activate.', userId: user._id, otpDemo: otp });
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user || user.otp !== otp || new Date() > user.otpExpiresAt) return res.status(400).json({ message: 'Invalid OTP' });

  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
  return res.json({ token: signToken(user), role: user.role });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.isApproved) return res.status(403).json({ message: 'Account blocked by admin' });
  if (user.otp) return res.status(403).json({ message: 'OTP verification pending' });

  return res.json({ token: signToken(user), role: user.role, name: user.name });
};
