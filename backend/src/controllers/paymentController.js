import crypto from 'crypto';
import Payment from '../models/Payment.js';
import Application from '../models/Application.js';

export const createPayment = async (req, res) => {
  const { applicationId, amount } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  const application = await Application.findById(applicationId).populate('service');
  if (!application) return res.status(404).json({ message: 'Application not found' });

  if (req.user.role !== 'admin' && String(application.user) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Not allowed to pay for this application' });
  }

  if (application.paymentStatus === 'paid') {
    return res.status(400).json({ message: 'Payment already completed' });
  }

  const expectedAmount = application.service.charge;
  if (Number(amount) !== Number(expectedAmount)) {
    return res.status(400).json({ message: `Amount mismatch. Expected ₹${expectedAmount}` });
  }

  const paymentId = `TXN-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
  const payment = await Payment.create({
    user: req.user._id,
    application: application._id,
    service: application.service.name,
    amount: Number(amount),
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
