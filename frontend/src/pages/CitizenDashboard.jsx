import { useEffect, useState } from "react";
import client from "../api/client";

export default function CitizenDashboard() {
  const [apps, setApps] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Promise.all([client.get("/applications/me"), client.get("/payments/me"), client.get("/notifications/me")]).then(([a, p, n]) => {
      setApps(a.data); setPayments(p.data); setNotifications(n.data);
    });
  }, []);

  return <main className="max-w-7xl mx-auto p-4 space-y-6"><h1 className="text-2xl font-bold">Citizen Dashboard</h1><div className="grid md:grid-cols-3 gap-4"><Card title="Applications" value={apps.length} /><Card title="Payments" value={payments.length} /><Card title="Notifications" value={notifications.length} /></div><section className="bg-white p-4 rounded shadow"><h2 className="font-semibold mb-2">Application Status</h2>{apps.map((a)=><div key={a._id} className="border-b py-2">{a.serviceId?.name} - {a.status}</div>)}</section></main>;
}

function Card({ title, value }) { return <div className="bg-white p-4 rounded shadow"><div className="text-slate-500">{title}</div><div className="text-3xl font-bold">{value}</div></div>; }
