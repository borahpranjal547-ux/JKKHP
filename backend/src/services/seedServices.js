import { Service } from "../models/Service.js";

const initialServices = [
  ["PAN Card Service", "Government"], ["Aadhaar Card Service", "Government"], ["Caste Certificate", "Government"],
  ["Income Certificate", "Government"], ["PM-KISAN", "Government"], ["Domicile Certificate", "Government"],
  ["Birth Certificate", "Government"], ["Death Certificate", "Government"], ["Ration Card", "Government"],
  ["Voter ID", "Government"], ["Labour Card", "Government"], ["Pension Scheme", "Government"],
  ["Ayushman Bharat", "Government"], ["Ujjwala Yojana", "Government"], ["Driving License", "Government"],
  ["Passport Assistance", "Government"], ["Mobile Recharge", "Non-Government"], ["DTH Recharge", "Non-Government"],
  ["Electricity Bill Payment", "Non-Government"], ["Insurance Services", "Non-Government"], ["Loan Application", "Non-Government"],
  ["FASTag Service", "Non-Government"], ["Online Form Filling", "Non-Government"]
];

export const seedServices = async () => {
  if (await Service.countDocuments()) return;
  await Service.insertMany(
    initialServices.map(([name, category]) => ({
      name,
      category,
      description: `${name} facilitation service for citizens`,
      requiredDocs: ["Identity Proof", "Address Proof"],
      processingTime: "3-10 working days",
      price: category === "Government" ? 49 : 99,
      status: "active"
    }))
  );
};
