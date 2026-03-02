import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  ['/', 'Home'],
  ['/services', 'Services'],
  ['/apply', 'Apply Online'],
  ['/track', 'Track Application'],
  ['/contact', 'Contact']
];

export default function Layout({ children }) {
  const { isLoggedIn, role, logout } = useAuth();
  return (
    <div className="min-h-screen bg-govLight text-slate-800">
      <header className="bg-govBlue text-white">
        <div className="max-w-6xl mx-auto p-3 flex justify-between items-center">
          <Link to="/" className="font-bold text-lg">Digital Citizen Service Portal</Link>
          <nav className="hidden md:flex gap-4">
            {links.map(([to, label]) => <NavLink key={to} to={to} className="hover:underline">{label}</NavLink>)}
          </nav>
          <div className="flex gap-2 text-sm">
            {!isLoggedIn ? <><Link to="/login">Login</Link><Link to="/register">Register</Link></> : <>
              <Link to={role === 'admin' ? '/admin' : '/dashboard'}>{role === 'admin' ? 'Admin' : 'Dashboard'}</Link>
              <button onClick={logout}>Logout</button>
            </>}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
      <footer className="bg-slate-900 text-slate-200 mt-8">
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-4 text-sm">
          <div><h4 className="font-semibold">Address</h4><p>Assam Citizen Facilitation Center, Dispur, Guwahati</p></div>
          <div><h4 className="font-semibold">Helpline</h4><p>1800-000-1234 | support@citizenportal.in</p></div>
          <div><h4 className="font-semibold">Quick Links</h4><p>Privacy Policy | Terms & Conditions</p></div>
        </div>
      </footer>
    </div>
  );
}
