import { useEffect, useState } from 'react';
import client from '../../api/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [apps, setApps] = useState([]);
  const [services, setServices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newService, setNewService] = useState({ serviceName: '', category: 'government', description: '', requiredDocs: 'Identity Proof', price: 99 });

  const load = async () => {
    const [u, a, s, p] = await Promise.all([client.get('/users'), client.get('/applications'), client.get('/services'), client.get('/payments')]);
    setUsers(u.data); setApps(a.data); setServices(s.data); setPayments(p.data);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => { await client.patch(`/applications/${id}/status`, { status }); load(); };
  const toggleUser = async (id, isApproved) => { await client.patch(`/users/${id}`, { isApproved: !isApproved }); load(); };
  const addService = async (e) => { e.preventDefault(); await client.post('/services', { ...newService, requiredDocs: newService.requiredDocs.split(',').map((x) => x.trim()) }); load(); };
  const sendBroadcast = async () => { await client.post('/notifications/broadcast', { title: 'Admin Update', message: 'Portal maintenance scheduled tonight.' }); alert('Broadcast sent'); };

  const revenue = payments.filter((p) => p.status === 'paid').reduce((t, c) => t + c.amount, 0);
  const chartData = [{ name: 'Users', value: users.length }, { name: 'Applications', value: apps.length }, { name: 'Revenue', value: revenue }];

  return <div className="space-y-4">
    <div className="grid md:grid-cols-3 gap-4">{chartData.map((c) => <div className="card" key={c.name}><p>{c.name}</p><p className="text-2xl font-bold">{c.value}</p></div>)}</div>
    <div className="card h-64"><ResponsiveContainer><BarChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#0f3d91" /></BarChart></ResponsiveContainer></div>
    <form onSubmit={addService} className="card grid md:grid-cols-5 gap-2">{['serviceName', 'description', 'requiredDocs', 'price'].map((f) => <input key={f} className="border p-2" placeholder={f} onChange={(e) => setNewService({ ...newService, [f]: e.target.value })} />)}<select className="border p-2" onChange={(e) => setNewService({ ...newService, category: e.target.value })}><option value="government">Gov</option><option value="non-government">Non-Gov</option></select><button className="bg-govBlue text-white p-2 rounded">Add Service</button></form>
    <div className="card"><h2 className="font-semibold">User Management</h2>{users.map((u) => <div key={u._id} className="text-sm border-b py-1">{u.name} ({u.role}) <button className="text-govBlue ml-2" onClick={() => toggleUser(u._id, u.isApproved)}>{u.isApproved ? 'Block' : 'Approve'}</button></div>)}</div>
    <div className="card"><h2 className="font-semibold">Application Management</h2>{apps.map((a) => <div key={a._id} className="text-sm border-b py-1">{a.serviceName} - {a.status}
      <button className="ml-2 text-green-700" onClick={() => updateStatus(a._id, 'Approved')}>Approve</button>
      <button className="ml-2 text-red-700" onClick={() => updateStatus(a._id, 'Rejected')}>Reject</button>
    </div>)}</div>
    <div className="card"><h2 className="font-semibold">Payment Management</h2>{payments.map((p) => <p key={p._id} className="text-sm">{p.transactionId} | ₹{p.amount} | {p.status}</p>)}</div>
    <button className="bg-indigo-700 text-white px-3 py-2 rounded" onClick={sendBroadcast}>Send Notification to All Users</button>
  </div>;
}
