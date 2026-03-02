import Service from '../models/Service.js';

export const getServices = async (_req, res) => res.json(await Service.find().sort({ category: 1, serviceName: 1 }));

export const createService = async (req, res) => res.status(201).json(await Service.create(req.body));

export const updateService = async (req, res) => {
  const data = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!data) return res.status(404).json({ message: 'Service not found' });
  return res.json(data);
};

export const deleteService = async (req, res) => {
  const data = await Service.findByIdAndDelete(req.params.id);
  if (!data) return res.status(404).json({ message: 'Service not found' });
  return res.json({ message: 'Deleted' });
};
