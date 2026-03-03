import { useState } from "react";
import client from "../api/client";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "" });
  const [mode, setMode] = useState("login");
  const [otpData, setOtpData] = useState({ userId: "", otp: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (mode === "register") {
      const { data } = await client.post("/auth/register", form);
      setOtpData({ ...otpData, userId: data.userId });
      alert(`Demo OTP: ${data.otpPreview}`);
      setMode("verify");
      return;
    }
    if (mode === "verify") {
      await client.post("/auth/verify-otp", otpData);
      setMode("login");
      return;
    }
    const { data } = await client.post("/auth/login", { email: form.email, password: form.password });
    login(data.token, data.role);
    navigate(data.role === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <main className="max-w-md mx-auto p-4 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 capitalize">{mode}</h1>
      <form onSubmit={submit} className="space-y-3">
        {mode === "register" && <><input className="w-full border p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="w-full border p-2" placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} /></>}
        {mode !== "verify" && <input className="w-full border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />}
        {mode !== "verify" && <input type="password" className="w-full border p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />}
        {mode === "verify" && <input className="w-full border p-2" placeholder="OTP" onChange={(e) => setOtpData({ ...otpData, otp: e.target.value })} />}
        <button className="w-full bg-blue-700 text-white py-2 rounded">Submit</button>
      </form>
      {mode === "login" && <button className="mt-3 text-blue-700" onClick={() => setMode("register")}>New user? Register</button>}
    </main>
  );
}
