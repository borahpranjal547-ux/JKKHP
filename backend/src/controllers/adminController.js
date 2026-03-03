import { User } from "../models/User.js";
import { Application } from "../models/Application.js";
import { Payment } from "../models/Payment.js";
import { Notification } from "../models/Notification.js";
import XLSX from "xlsx";

export const getUsers = async (_, res) => res.json(await User.find().select("-password"));

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
  res.json(user);
};

export const analytics = async (_, res) => {
  const [users, apps, payments, revenue] = await Promise.all([
    User.countDocuments(),
    Application.countDocuments(),
    Payment.countDocuments(),
    Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } }])
  ]);

  res.json({ totalUsers: users, totalApplications: apps, totalPayments: payments, totalRevenue: revenue[0]?.total || 0 });
};

export const sendNotification = async (req, res) => {
  const { userId, title, message } = req.body;
  const notification = await Notification.create({ userId, title, message });
  res.status(201).json(notification);
};

export const exportPayments = async (_, res) => {
  const data = await Payment.find().lean();
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(data), "Payments");
  const file = "payments-report.xlsx";
  XLSX.writeFile(workbook, file);
  res.download(file);
};
