import { useEffect, useState } from 'react';
import client from '../../api/client';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => { client.get('/services').then((r) => setServices(r.data)); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Services</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s) => <div key={s._id} className="card">
          <h3 className="font-semibold">{s.serviceName}</h3>
          <p className="text-sm">{s.description}</p>
          <p className="text-sm mt-1"><b>Docs:</b> {s.requiredDocs.join(', ')}</p>
          <p className="text-sm"><b>Processing:</b> {s.processingTime}</p>
          <p className="text-sm"><b>Charge:</b> ₹{s.price}</p>
          <Link className="inline-block mt-2 text-govBlue" to="/apply">Apply</Link>
        </div>)}
      </div>
    </div>
  );
}
