import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/LoginPage';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { ApplyOnlinePage, ContactPage, TrackPage } from './pages/StaticPages';
import { useAuth } from './context/AuthContext';

const Protected = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/apply" element={<ApplyOnlinePage />} />
        <Route path="/track" element={<TrackPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Protected role="citizen"><CitizenDashboard /></Protected>} />
        <Route path="/admin" element={<Protected role="admin"><AdminDashboard /></Protected>} />
      </Routes>
    </MainLayout>
  );
}
