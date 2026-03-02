import { useEffect, useState } from 'react';
import client from '../api/client';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    client.get('/services').then((res) => setServices(res.data));
  }, []);

  return (
    <div>
      <h1>All Services</h1>
      <div className="grid three">
        {services.map((service) => (
          <article key={service._id} className="card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p><strong>Required:</strong> {service.requiredDocs.join(', ')}</p>
            <p><strong>Processing Time:</strong> {service.processingTime}</p>
            <p><strong>Service Charge:</strong> ₹{service.charge}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
