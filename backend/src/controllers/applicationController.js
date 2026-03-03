import { Application } from "../models/Application.js";
import { Notification } from "../models/Notification.js";

export const createApplication = async (req, res) => {
  const documents = (req.files || []).map((file) => ({
    fieldName: file.fieldname,
    originalName: file.originalname,
    path: file.path,
    mimeType: file.mimetype
  }));

  const app = await Application.create({ userId: req.user.id, serviceId: req.body.serviceId, documents });
  await Notification.create({ userId: req.user.id, title: "Application Submitted", message: "Your application has been submitted." });
  res.status(201).json(app);
};

export const getMyApplications = async (req, res) => {
  const apps = await Application.find({ userId: req.user.id }).populate("serviceId", "name price").sort({ createdAt: -1 });
  res.json(apps);
};

export const getAllApplications = async (req, res) => {
  const filter = req.query.serviceId ? { serviceId: req.query.serviceId } : {};
  const apps = await Application.find(filter).populate("userId", "name email").populate("serviceId", "name");
  res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const app = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!app) return res.status(404).json({ message: "Application not found" });
  await Notification.create({ userId: app.userId, title: "Application Updated", message: `Status changed to ${app.status}` });
  res.json(app);
};
