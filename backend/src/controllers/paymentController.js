import { v4 as uuidv4 } from "uuid";
import { Payment } from "../models/Payment.js";
import { Application } from "../models/Application.js";
import { Service } from "../models/Service.js";

export const processPayment = async (req, res) => {
  const { applicationId, provider = "mock" } = req.body;
  const app = await Application.findById(applicationId);
  if (!app) return res.status(404).json({ message: "Application not found" });

  const service = await Service.findById(app.serviceId);
  const payment = await Payment.create({
    userId: req.user.id,
    serviceId: app.serviceId,
    applicationId,
    amount: service.price,
    provider,
    paymentId: `TXN-${uuidv4()}`,
    status: "success"
  });

  app.paymentStatus = "paid";
  await app.save();
  res.status(201).json(payment);
};

export const getMyPayments = async (req, res) => {
  const payments = await Payment.find({ userId: req.user.id }).populate("serviceId", "name").sort({ createdAt: -1 });
  res.json(payments);
};

export const getAllPayments = async (_, res) => {
  const payments = await Payment.find().populate("userId", "name email").populate("serviceId", "name");
  res.json(payments);
};
