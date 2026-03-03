import bcrypt from "bcryptjs";
import { body } from "express-validator";
import { User } from "../models/User.js";
import { generateToken } from "../utils/token.js";
import { maskAadhaar } from "../utils/crypto.js";

export const registerValidators = [
  body("name").notEmpty(),
  body("mobile").isLength({ min: 10, max: 10 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
];

export const register = async (req, res) => {
  const { name, mobile, email, password, aadhaar } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { mobile }] });
  if (exists) return res.status(409).json({ message: "User exists" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const user = await User.create({
    name,
    mobile,
    email,
    password: await bcrypt.hash(password, 10),
    aadhaarEncrypted: maskAadhaar(aadhaar),
    otp,
    otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000)
  });

  res.status(201).json({ message: "Registered. Verify OTP", otpPreview: otp, userId: user._id });
};

export const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) return res.status(400).json({ message: "Invalid OTP" });
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
  res.json({ message: "OTP verified" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.isBlocked) return res.status(401).json({ message: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ token: generateToken(user), role: user.role, user: { id: user._id, name: user.name, email: user.email } });
};
