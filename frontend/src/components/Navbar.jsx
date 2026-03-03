import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { token, role, logout } = useAuth();
  return (
    <header className="bg-blue-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-lg">Digital Citizen Service Portal</div>
        <nav className="flex gap-4 text-sm">
          <Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/apply">Apply Online</Link><Link to="/track">Track Application</Link>
          {!token ? <Link to="/login">Login / Register</Link> : <Link to={role === "admin" ? "/admin" : "/dashboard"}>Dashboard</Link>}
          <Link to="/contact">Contact</Link>
          {token && <button onClick={logout}>Logout</button>}
        </nav>
      </div>
    </header>
  );
}
