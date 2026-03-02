import Application from '../models/Application.js';
import Service from '../models/Service.js';

export const applyService = async (req, res) => {
  const { serviceId } = req.body;
  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const documents = (req.files || []).map((f) => f.filename);
  const application = await Application.create({
    user: req.user._id,
    service: serviceId,
    documents
  });

  res.status(201).json(application);
};

export const myApplications = async (req, res) => {
  const applications = await Application.find({ user: req.user._id }).populate('service').sort({ createdAt: -1 });
  res.json(applications);
};

export const allApplications = async (req, res) => {
  const query = req.query.service ? { service: req.query.service } : {};
  const applications = await Application.find(query).populate('user', 'name email').populate('service').sort({ createdAt: -1 });
  res.json(applications);
};

export const updateApplicationStatus = async (req, res) => {
  const { status, adminRemarks } = req.body;
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status, adminRemarks },
    { new: true }
  );
  if (!application) return res.status(404).json({ message: 'Application not found' });
  res.json(application);
};
