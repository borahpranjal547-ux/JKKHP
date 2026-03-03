import { useEffect, useState } from "react";
import client from "../api/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    Promise.all([client.get("/admin/analytics"), client.get("/admin/users"), client.get("/applications")]).then(([s, u, a]) => {
      setStats(s.data); setUsers(u.data); setApplications(a.data);
    });
  }, []);

  const updateStatus = async (id, status) => {
    await client.patch(`/applications/${id}`, { status });
    setApplications((prev) => prev.map((app) => (app._id === id ? { ...app, status } : app)));
  };

  return <main className="max-w-7xl mx-auto p-4 space-y-6"><h1 className="text-2xl font-bold">Admin Dashboard</h1><div className="grid md:grid-cols-4 gap-4">{Object.entries(stats).map(([k,v])=><div key={k} className="bg-white p-4 rounded shadow"><div className="text-sm text-slate-500">{k}</div><div className="text-2xl font-bold">{v}</div></div>)}</div><section className="bg-white p-4 rounded shadow"><h2 className="font-semibold mb-2">Users</h2>{users.map((u)=><div key={u._id} className="border-b py-2 flex justify-between"><span>{u.name} ({u.role})</span><button className="text-blue-700" onClick={()=>client.patch(`/admin/users/${u._id}`, { isBlocked: !u.isBlocked })}>{u.isBlocked?"Unblock":"Block"}</button></div>)}</section><section className="bg-white p-4 rounded shadow"><h2 className="font-semibold mb-2">Applications</h2>{applications.map((a)=><div key={a._id} className="border-b py-2 flex justify-between"><span>{a.serviceId?.name} - {a.status}</span><select value={a.status} onChange={(e)=>updateStatus(a._id,e.target.value)}><option>Submitted</option><option>Under Review</option><option>Approved</option><option>Rejected</option><option>Completed</option></select></div>)}</section></main>;
}
