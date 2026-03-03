import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    aadhaarEncrypted: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "citizen"], default: "citizen" },
    isBlocked: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiresAt: { type: Date }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
