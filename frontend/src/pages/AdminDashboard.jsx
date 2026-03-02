import { useEffect, useState } from 'react';
import client from '../api/client';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({ totalUsers: 0, totalApplications: 0, totalRevenue: 0 });
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);

  const load = async () => {
    const [ana, us, app] = await Promise.all([
      client.get('/admin/analytics'),
      client.get('/admin/users'),
      client.get('/applications')
    ]);
    setAnalytics(ana.data);
    setUsers(us.data);
    setApplications(app.data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleUser = async (id) => {
    await client.patch(`/admin/users/${id}/toggle-block`);
    load();
  };

  const updateStatus = async (id, status) => {
    await client.patch(`/applications/${id}/status`, { status, adminRemarks: `Updated to ${status}` });
    load();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid three">
        <article className="card"><h3>Total Users</h3><p>{analytics.totalUsers}</p></article>
        <article className="card"><h3>Total Applications</h3><p>{analytics.totalApplications}</p></article>
        <article className="card"><h3>Total Revenue</h3><p>₹{analytics.totalRevenue}</p></article>
      </div>
      <h2>User Management</h2>
      {users.map((u) => (
        <article className="card" key={u._id}>
          <p>{u.name} ({u.email}) - {u.isBlocked ? 'Blocked' : 'Active'}</p>
          {u.role !== 'admin' ? <button className="btn" onClick={() => toggleUser(u._id)}>Toggle Block</button> : null}
        </article>
      ))}
      <h2>Application Management</h2>
      {applications.map((a) => (
        <article className="card" key={a._id}>
          <p>{a.user?.name} - {a.service?.name} - {a.status}</p>
          <select defaultValue={a.status} onChange={(e) => updateStatus(a._id, e.target.value)}>
            {['Submitted', 'Under Review', 'Approved', 'Rejected', 'Completed'].map((s) => (
              <option value={s} key={s}>{s}</option>
            ))}
          </select>
        </article>
      ))}
    </div>
  );
}
