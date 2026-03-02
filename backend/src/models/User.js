import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    aadhaar: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'citizen'], default: 'citizen' },
    isApproved: { type: Boolean, default: true },
    otp: { type: String },
    otpExpiresAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
