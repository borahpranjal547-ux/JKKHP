import { useEffect, useState } from 'react';
import client from '../../api/client';

export default function CitizenDashboard() {
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [apps, setApps] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [serviceName, setServiceName] = useState('');

  const load = async () => {
    const [p, s, a, pay, n] = await Promise.all([
      client.get('/users/me'), client.get('/services'), client.get('/applications/mine'), client.get('/payments/mine'), client.get('/notifications/mine')
    ]);
    setProfile(p.data); setServices(s.data); setApps(a.data); setPayments(pay.data); setNotifications(n.data);
  };

  useEffect(() => { load(); }, []);

  const apply = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('serviceName', serviceName);
    await client.post('/applications', fd);
    load();
  };

  const payNow = async (service) => {
    const { data } = await client.post('/payments/create-order', { service, amount: 99 });
    await client.post('/payments/confirm', { paymentId: data.payment.paymentId });
    load();
  };

  if (!profile) return <p>Loading...</p>;
  return <div className="space-y-4">
    <div className="card"><h1 className="text-2xl font-bold">Welcome, {profile.name}</h1><p>{profile.email} | {profile.mobile}</p></div>
    <form onSubmit={apply} className="card flex flex-wrap gap-2 items-end"><div><label className="text-sm">Apply for Service</label><select className="border p-2 block" onChange={(e) => setServiceName(e.target.value)} required><option value="">Select</option>{services.map((s) => <option key={s._id}>{s.serviceName}</option>)}</select></div><button className="bg-govBlue text-white px-3 py-2 rounded">Submit Application</button></form>
    <div className="card"><h2 className="font-semibold">Application Tracking</h2>{apps.map((a) => <div key={a._id} className="border-b py-2 text-sm">{a.serviceName} — <b>{a.status}</b> {a.paymentStatus !== 'paid' && <button className="ml-2 text-govBlue" onClick={() => payNow(a.serviceName)}>Pay</button>}</div>)}</div>
    <div className="card"><h2 className="font-semibold">Payment History</h2>{payments.map((p) => <p key={p._id} className="text-sm">{p.service} | ₹{p.amount} | {p.transactionId} | {p.status}</p>)}</div>
    <div className="card"><h2 className="font-semibold">Notifications</h2>{notifications.map((n) => <p key={n._id} className="text-sm">{n.title}: {n.message}</p>)}</div>
  </div>;
}
