import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const profile = async (req, res) => res.json(await User.findById(req.user.id).select('-password -otp -otpExpiresAt'));

export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password -otp -otpExpiresAt');
  return res.json(user);
};

export const changePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();
  return res.json({ message: 'Password changed' });
};

export const allUsers = async (_req, res) => res.json(await User.find().select('-password -otp -otpExpiresAt'));

export const updateUserStatus = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password -otp -otpExpiresAt');
  return res.json(user);
};
