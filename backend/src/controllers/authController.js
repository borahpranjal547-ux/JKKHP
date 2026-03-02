import crypto from 'crypto';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { sendEmail } from '../utils/email.js';

export const register = async (req, res) => {
  const { name, email, mobile, password, aadhaar } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { mobile }] });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const user = await User.create({ name, email, mobile, password, aadhaar, otp, otpExpiresAt });

  await sendEmail({
    to: email,
    subject: 'OTP Verification - Digital Citizen Portal',
    html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 10 minutes.</p>`
  });

  return res.status(201).json({ message: 'Registered. Verify OTP to login.', userId: user._id });
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();
  return res.json({ message: 'OTP verified successfully' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await user.comparePassword(password);
  if (!valid || user.isBlocked) return res.status(400).json({ message: 'Invalid credentials' });
  if (user.otp) return res.status(401).json({ message: 'Please verify OTP first' });

  return res.json({
    token: generateToken(user._id, user.role),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role
    }
  });
};
