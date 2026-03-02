import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    aadhaar: { type: String, default: '' },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['citizen', 'admin'], default: 'citizen' },
    isBlocked: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null }
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);
