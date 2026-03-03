export const maskAadhaar = (aadhaar) => {
  if (!aadhaar) return null;
  return Buffer.from(aadhaar).toString("base64");
};
