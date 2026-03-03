export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div><h3 className="font-semibold">Address</h3><p>Citizen Facilitation Center, Assam</p></div>
        <div><h3 className="font-semibold">Helpline</h3><p>1800-123-456</p><p>support@digitalcitizen.gov.in</p></div>
        <div><h3 className="font-semibold">Quick Links</h3><p>Privacy Policy</p><p>Terms & Conditions</p></div>
      </div>
    </footer>
  );
}
