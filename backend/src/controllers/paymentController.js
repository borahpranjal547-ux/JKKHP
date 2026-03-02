import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Application from '../models/Application.js';

export const createPayment = async (req, res) => {
  const { applicationId, amount } = req.body;
  const application = await Application.findById(applicationId).populate('service');
  if (!application) return res.status(404).json({ message: 'Application not found' });

  const paymentId = `TXN-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
  const payment = await Payment.create({
    user: req.user._id,
    application: application._id,
    service: application.service.name,
    amount,
    paymentId
  });

  application.paymentStatus = 'paid';
  await application.save();

  res.status(201).json({ message: 'Payment successful', payment });
};

export const paymentHistory = async (req, res) => {
  const payments = await Payment.find(req.user.role === 'admin' ? {} : { user: req.user._id })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json(payments);
};
