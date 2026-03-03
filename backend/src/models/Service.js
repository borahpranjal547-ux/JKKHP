import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, enum: ["Government", "Non-Government"], required: true },
    description: { type: String, required: true },
    requiredDocs: [{ type: String, required: true }],
    processingTime: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
