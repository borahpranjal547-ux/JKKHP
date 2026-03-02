import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, enum: ['government', 'non-government'], required: true },
    description: { type: String, required: true },
    requiredDocs: [{ type: String, required: true }],
    processingTime: { type: String, required: true },
    charge: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
