import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    service: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    method: { type: String, default: 'UPI/Card/NetBanking' }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
