import { Link } from 'react-router-dom';

const popular = ['PAN Card Service', 'Aadhaar Card Service', 'Birth Certificate', 'Driving License', 'Ration Card', 'Passport Assistance'];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="card bg-gradient-to-r from-govBlue to-blue-500 text-white">
        <h1 className="text-3xl font-bold">Digital Citizen Service Portal</h1>
        <p className="mt-2">Apply, track and manage citizen services in one secure portal.</p>
        <Link to="/services" className="mt-4 inline-block bg-white text-govBlue px-4 py-2 rounded">Explore Services</Link>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3">Popular Services</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">{popular.map((s) => <div className="card" key={s}>{s}</div>)}</div>
      </section>
      <section className="card">
        <h3 className="text-xl font-semibold">How it Works</h3>
        <ol className="list-decimal ml-6 mt-2 space-y-1"><li>Register with mobile/email OTP</li><li>Select service and upload documents</li><li>Pay online and track status updates</li></ol>
      </section>
    </div>
  );
}
