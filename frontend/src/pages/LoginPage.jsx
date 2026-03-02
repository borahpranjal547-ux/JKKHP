import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [register, setRegister] = useState({ name: '', email: '', mobile: '', password: '' });
  const [otp, setOtp] = useState({ userId: '', otp: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    const res = await client.post('/auth/login', form);
    login(res.data);
    navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard');
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    const res = await client.post('/auth/register', register);
    setOtp((prev) => ({ ...prev, userId: res.data.userId }));
    alert('OTP sent to email');
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    await client.post('/auth/verify-otp', otp);
    alert('OTP verified, please login');
  };

  return (
    <div className="grid two">
      <form onSubmit={submitLogin} className="card">
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn">Login</button>
      </form>
      <div>
        <form onSubmit={submitRegister} className="card">
          <h2>Register</h2>
          <input placeholder="Name" onChange={(e) => setRegister({ ...register, name: e.target.value })} />
          <input placeholder="Mobile" onChange={(e) => setRegister({ ...register, mobile: e.target.value })} />
          <input placeholder="Email" onChange={(e) => setRegister({ ...register, email: e.target.value })} />
          <input placeholder="Password" type="password" onChange={(e) => setRegister({ ...register, password: e.target.value })} />
          <button className="btn">Register</button>
        </form>
        <form onSubmit={submitOtp} className="card">
          <h2>OTP Verification</h2>
          <input placeholder="User ID" value={otp.userId} onChange={(e) => setOtp({ ...otp, userId: e.target.value })} />
          <input placeholder="6-digit OTP" onChange={(e) => setOtp({ ...otp, otp: e.target.value })} />
          <button className="btn">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}
