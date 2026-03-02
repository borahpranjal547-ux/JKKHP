import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

export const createPaymentOrder = async (req, res) => {
  const { service, amount } = req.body;
  const transactionId = uuidv4();

  if (razorpay) {
    const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency: 'INR', receipt: transactionId });
    const payment = await Payment.create({ userId: req.user.id, service, amount, paymentId: order.id, transactionId, status: 'created' });
    return res.status(201).json({ order, payment });
  }

  const mockPaymentId = `mock_${Date.now()}`;
  const payment = await Payment.create({ userId: req.user.id, service, amount, paymentId: mockPaymentId, transactionId, status: 'created' });
  return res.status(201).json({ order: { id: mockPaymentId, amount }, payment, demoMode: true });
};

export const confirmPayment = async (req, res) => {
  const { paymentId } = req.body;
  const payment = await Payment.findOneAndUpdate({ paymentId }, { status: 'paid' }, { new: true });
  if (!payment) return res.status(404).json({ message: 'Payment not found' });

  await Notification.create({ userId: payment.userId, title: 'Payment Success', message: `${payment.service} payment successful.` });
  return res.json(payment);
};

export const myPayments = async (req, res) => res.json(await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 }));
export const allPayments = async (_req, res) => res.json(await Payment.find().populate('userId', 'name email').sort({ createdAt: -1 }));
