import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    requiredDocs: [{ type: String }],
    processingTime: { type: String, default: '7-15 business days' },
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['government', 'non-government'], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
