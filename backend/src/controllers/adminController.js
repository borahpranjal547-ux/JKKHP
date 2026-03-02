import User from '../models/User.js';
import Application from '../models/Application.js';
import Payment from '../models/Payment.js';

export const getUsers = async (_, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
};

export const toggleUserBlock = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json(user);
};

export const analytics = async (_, res) => {
  const [totalUsers, totalApplications, payments] = await Promise.all([
    User.countDocuments({ role: 'citizen' }),
    Application.countDocuments(),
    Payment.find()
  ]);

  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  res.json({ totalUsers, totalApplications, totalRevenue });
};
