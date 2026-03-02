import Service from '../models/Service.js';

const baseServices = [
  ['PAN Card Service', 'government'], ['Aadhaar Card Service', 'government'], ['Caste Certificate', 'government'],
  ['Income Certificate', 'government'], ['PM-KISAN', 'government'], ['Domicile Certificate', 'government'],
  ['Birth Certificate', 'government'], ['Death Certificate', 'government'], ['Ration Card', 'government'],
  ['Voter ID', 'government'], ['Labour Card', 'government'], ['Pension Scheme', 'government'],
  ['Ayushman Bharat', 'government'], ['Ujjwala Yojana', 'government'], ['Driving License', 'government'],
  ['Passport Assistance', 'government'], ['Mobile Recharge', 'non-government'], ['DTH Recharge', 'non-government'],
  ['Electricity Bill Payment', 'non-government'], ['Insurance Services', 'non-government'],
  ['Loan Application', 'non-government'], ['FASTag Service', 'non-government'], ['Online Form Filling', 'non-government']
];

export const seedServices = async () => {
  const count = await Service.countDocuments();
  if (count > 0) return;

  await Service.insertMany(baseServices.map(([serviceName, category]) => ({
    serviceName,
    category,
    description: `${serviceName} service application and facilitation support.`,
    requiredDocs: ['Identity Proof', 'Address Proof'],
    price: category === 'government' ? 49 : 99
  })));
  console.log('Seeded default services');
};
