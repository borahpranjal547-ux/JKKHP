import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await client.post('/auth/login', form);
    login(data);
    nav(data.role === 'admin' ? '/admin' : '/dashboard');
  };

  return <form onSubmit={submit} className="card max-w-md mx-auto space-y-3"><h1 className="text-xl font-bold">Login</h1>
    <input className="w-full border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
    <input className="w-full border p-2" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
    <button className="bg-govBlue text-white px-3 py-2 rounded">Login</button></form>;
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '' });
  const [otpState, setOtpState] = useState({ userId: '', otp: '' });
  const { login } = useAuth();
  const nav = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const { data } = await client.post('/auth/register', form);
    setOtpState((s) => ({ ...s, userId: data.userId }));
    alert(`Demo OTP: ${data.otpDemo}`);
  };

  const verify = async (e) => {
    e.preventDefault();
    const { data } = await client.post('/auth/verify-otp', otpState);
    login(data);
    nav('/dashboard');
  };

  return <div className="grid md:grid-cols-2 gap-4"><form onSubmit={register} className="card space-y-2"><h1 className="text-xl font-bold">Register</h1>
    {['name', 'mobile', 'email', 'password'].map((k) => <input key={k} className="w-full border p-2" placeholder={k} type={k === 'password' ? 'password' : 'text'} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />)}
    <button className="bg-govBlue text-white px-3 py-2 rounded">Register</button></form>
    <form onSubmit={verify} className="card space-y-2"><h2 className="text-lg font-bold">Verify OTP</h2>
      <input className="w-full border p-2" placeholder="User ID" value={otpState.userId} onChange={(e) => setOtpState({ ...otpState, userId: e.target.value })} />
      <input className="w-full border p-2" placeholder="OTP" onChange={(e) => setOtpState({ ...otpState, otp: e.target.value })} />
      <button className="bg-green-600 text-white px-3 py-2 rounded">Verify</button>
    </form></div>;
}
