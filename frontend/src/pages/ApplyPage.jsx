import { useEffect, useState } from "react";
import client from "../api/client";

export default function ApplyPage() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [files, setFiles] = useState([]);
  useEffect(() => { client.get("/services").then((r) => { setServices(r.data); setServiceId(r.data[0]?._id || ""); }); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("serviceId", serviceId);
    [...files].forEach((f) => formData.append("documents", f));
    const { data } = await client.post("/applications", formData);
    await client.post("/payments/process", { applicationId: data._id, provider: "mock" });
    alert("Application submitted and payment completed");
  };

  return <main className="max-w-xl mx-auto p-4 mt-8 bg-white rounded shadow"><h1 className="text-2xl font-bold mb-4">Apply Online</h1><form onSubmit={submit} className="space-y-3"><select className="w-full border p-2" value={serviceId} onChange={(e)=>setServiceId(e.target.value)}>{services.map((s)=><option key={s._id} value={s._id}>{s.name}</option>)}</select><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="w-full" onChange={(e)=>setFiles(e.target.files)} /><button className="w-full bg-blue-700 text-white py-2 rounded">Submit Application</button></form></main>;
}
