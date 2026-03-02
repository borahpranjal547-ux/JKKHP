import crypto from 'crypto';
import Application from '../models/Application.js';
import Service from '../models/Service.js';

const createTrackingId = () => `ASM-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

export const applyService = async (req, res) => {
  const { serviceId } = req.body;
  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const documents = (req.files || []).map((f) => f.filename);
  if (!documents.length) {
    return res.status(400).json({ message: 'At least one valid document is required' });
  }

  const application = await Application.create({
    user: req.user._id,
    service: serviceId,
    documents,
    trackingId: createTrackingId()
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

export const trackApplicationById = async (req, res) => {
  const application = await Application.findOne({ trackingId: req.params.trackingId })
    .populate('service', 'name processingTime')
    .populate('user', 'name');

  if (!application) return res.status(404).json({ message: 'Application not found' });

  return res.json({
    trackingId: application.trackingId,
    applicant: application.user?.name,
    serviceName: application.service?.name,
    processingTime: application.service?.processingTime,
    status: application.status,
    paymentStatus: application.paymentStatus,
    updatedAt: application.updatedAt,
    remarks: application.adminRemarks || ''
  });
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
