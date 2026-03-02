import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const myNotifications = async (req, res) => res.json(await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 }));

export const sendBroadcast = async (req, res) => {
  const users = await User.find({}, '_id');
  await Notification.insertMany(users.map((u) => ({ userId: u._id, title: req.body.title, message: req.body.message })));
  return res.json({ message: 'Broadcast sent' });
};
