import { useEffect, useState } from 'react';
import client from '../api/client';

export default function CitizenDashboard() {
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [files, setFiles] = useState([]);

  const load = async () => {
    const [sRes, aRes] = await Promise.all([client.get('/services'), client.get('/applications/mine')]);
    setServices(sRes.data);
    setApplications(aRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const apply = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('serviceId', selectedService);
    Array.from(files).forEach((file) => data.append('documents', file));
    await client.post('/applications', data);
    await load();
  };

  const pay = async (applicationId, amount) => {
    await client.post('/payments', { applicationId, amount });
    await load();
  };

  return (
    <div>
      <h1>Citizen Dashboard</h1>
      <form className="card" onSubmit={apply}>
        <h3>Apply for Service</h3>
        <select onChange={(e) => setSelectedService(e.target.value)} required>
          <option value="">Select Service</option>
          {services.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFiles(e.target.files)} required />
        <button className="btn">Submit Application</button>
      </form>

      <h3>My Applications</h3>
      <div className="grid two">
        {applications.map((a) => (
          <article key={a._id} className="card">
            <h4>{a.service?.name}</h4>
            <p>Tracking ID: {a.trackingId}</p>
            <p>Status: {a.status}</p>
            <p>Payment: {a.paymentStatus}</p>
            <p>Remarks: {a.adminRemarks || 'NA'}</p>
            {a.paymentStatus === 'pending' ? <button onClick={() => pay(a._id, a.service.charge)} className="btn">Pay Now</button> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
