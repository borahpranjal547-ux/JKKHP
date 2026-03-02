import Application from '../models/Application.js';
import Notification from '../models/Notification.js';

export const createApplication = async (req, res) => {
  const documents = (req.files || []).map((file) => ({ fileName: file.originalname, filePath: file.path, mimeType: file.mimetype }));
  const app = await Application.create({ userId: req.user.id, serviceName: req.body.serviceName, documents });
  await Notification.create({ userId: req.user.id, title: 'Application Submitted', message: `${req.body.serviceName} application submitted.` });
  return res.status(201).json(app);
};

export const myApplications = async (req, res) => res.json(await Application.find({ userId: req.user.id }).sort({ createdAt: -1 }));

export const allApplications = async (req, res) => {
  const filter = req.query.serviceName ? { serviceName: req.query.serviceName } : {};
  const apps = await Application.find(filter).populate('userId', 'name email mobile').sort({ createdAt: -1 });
  return res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const { status, adminRemarks, paymentStatus } = req.body;
  const app = await Application.findByIdAndUpdate(req.params.id, { status, adminRemarks, paymentStatus }, { new: true });
  if (!app) return res.status(404).json({ message: 'Application not found' });
  await Notification.create({ userId: app.userId, title: 'Status Update', message: `${app.serviceName} status: ${status}` });
  return res.json(app);
};
