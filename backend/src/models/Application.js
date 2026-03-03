import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    documents: [
      {
        fieldName: String,
        originalName: String,
        path: String,
        mimeType: String
      }
    ],
    status: {
      type: String,
      enum: ["Submitted", "Under Review", "Approved", "Rejected", "Completed"],
      default: "Submitted"
    },
    adminRemarks: { type: String },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" }
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
