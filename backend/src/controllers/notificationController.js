import { Notification } from "../models/Notification.js";

export const getMyNotifications = async (req, res) => {
  const data = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(data);
};
