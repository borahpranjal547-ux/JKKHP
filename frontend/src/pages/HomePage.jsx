import { Link } from "react-router-dom";

const popular = ["PAN Card Service", "Aadhaar Card Service", "Income Certificate", "PM-KISAN", "Voter ID", "Passport Assistance"];

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Citizen Services at Your Fingertips</h1>
          <p className="mt-4 max-w-2xl">Apply, track, pay, and manage services with a secure government-grade digital experience.</p>
          <Link to="/services" className="inline-block mt-6 bg-white text-blue-900 px-5 py-2 rounded">Explore Services</Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Services</h2>
        <div className="grid md:grid-cols-3 gap-4">{popular.map((item) => <div key={item} className="bg-white p-4 rounded shadow">{item}</div>)}</div>
      </section>
      <section className="max-w-7xl mx-auto p-4 mt-8 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-2"><li>Register and verify OTP.</li><li>Apply for a service and upload documents.</li><li>Pay securely and track status updates.</li></ol>
      </section>
    </main>
  );
}
