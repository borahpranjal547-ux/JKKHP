import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    trackingId: { type: String, required: true, unique: true, index: true },
    documents: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Completed'],
      default: 'Submitted'
    },
    adminRemarks: { type: String, default: '' },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
