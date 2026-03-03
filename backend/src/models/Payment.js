import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    amount: { type: Number, required: true },
    provider: { type: String, enum: ["razorpay", "stripe", "mock"], default: "mock" },
    paymentId: { type: String, required: true, unique: true },
    status: { type: String, enum: ["success", "failed"], default: "success" }
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
