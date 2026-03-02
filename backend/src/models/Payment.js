import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
