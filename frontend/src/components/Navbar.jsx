import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="topbar">
      <div className="container nav">
        <div className="logo">Digital Citizen Service Portal</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/apply">Apply Online</Link>
          <Link to="/track">Track Application</Link>
          <Link to="/contact">Contact</Link>
          {!user ? <Link to="/login">Login / Register</Link> : null}
          {user?.role === 'citizen' ? <Link to="/dashboard">Citizen Dashboard</Link> : null}
          {user?.role === 'admin' ? <Link to="/admin">Admin Dashboard</Link> : null}
          {user ? <button onClick={logout}>Logout</button> : null}
        </nav>
      </div>
    </header>
  );
}
