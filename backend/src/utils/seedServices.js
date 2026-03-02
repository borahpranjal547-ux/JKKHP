import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Service from '../models/Service.js';

dotenv.config();

const services = [
  ['PAN Card Service', 'government'],
  ['Aadhaar Card Service', 'government'],
  ['Caste Certificate', 'government'],
  ['Income Certificate', 'government'],
  ['PM-KISAN', 'government'],
  ['Domicile Certificate', 'government'],
  ['Birth Certificate', 'government'],
  ['Death Certificate', 'government'],
  ['Ration Card', 'government'],
  ['Voter ID', 'government'],
  ['Labour Card', 'government'],
  ['Pension Scheme', 'government'],
  ['Ayushman Bharat', 'government'],
  ['Ujjwala Yojana', 'government'],
  ['Driving License', 'government'],
  ['Passport Assistance', 'government'],
  ['Mobile Recharge', 'non-government'],
  ['DTH Recharge', 'non-government'],
  ['Electricity Bill Payment', 'non-government'],
  ['Insurance Services', 'non-government'],
  ['Loan Application', 'non-government'],
  ['FASTag Service', 'non-government'],
  ['Online Form Filling', 'non-government']
].map(([name, category]) => ({
  name,
  category,
  description: `${name} facilitation with government-compliant workflow.`,
  requiredDocs: ['Identity Proof', 'Address Proof'],
  processingTime: '7-15 working days',
  charge: category === 'government' ? 100 : 80,
  status: 'active'
}));

const seed = async () => {
  await connectDB();
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('Services seeded successfully');
  process.exit(0);
};

seed();
