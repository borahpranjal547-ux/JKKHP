import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import { LoginPage, RegisterPage } from './pages/public/AuthPages';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

function Private({ children, role }) {
  const { isLoggedIn, role: userRole } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
}

const Placeholder = ({ title }) => <div className="card"><h1 className="text-xl font-bold">{title}</h1><p>Use login to access complete workflow.</p></div>;

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/apply" element={<Private><CitizenDashboard /></Private>} />
    <Route path="/track" element={<Private><CitizenDashboard /></Private>} />
    <Route path="/contact" element={<Placeholder title="Contact Us" />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/dashboard" element={<Private role="citizen"><CitizenDashboard /></Private>} />
    <Route path="/admin" element={<Private role="admin"><AdminDashboard /></Private>} />
  </Routes></Layout>;
}
