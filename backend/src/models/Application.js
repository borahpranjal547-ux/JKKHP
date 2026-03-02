import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceName: { type: String, required: true },
    documents: [{ fileName: String, filePath: String, mimeType: String }],
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
