import { useEffect, useState } from "react";
import client from "../api/client";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => { client.get("/services").then((r) => setServices(r.data)); }, []);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Services</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s._id} className="bg-white rounded shadow p-4 space-y-2">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-slate-600">{s.description}</p>
            <p className="text-sm">Required: {s.requiredDocs.join(", ")}</p>
            <p className="text-sm">Processing: {s.processingTime}</p>
            <p className="font-semibold">₹{s.price}</p>
            <Link to="/apply" className="inline-block bg-blue-700 text-white px-3 py-1 rounded">Apply</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
