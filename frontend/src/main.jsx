import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ApplyPage from "./pages/ApplyPage";
import TrackPage from "./pages/TrackPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const Protected = ({ roles, children }) => {
  const { token, role } = useAuth();
  if (!token) return <Navigate to="/login" />;
  if (roles && !roles.includes(role)) return <Navigate to="/" />;
  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/apply" element={<Protected roles={["citizen", "admin"]}><ApplyPage /></Protected>} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<Protected roles={["citizen", "admin"]}><CitizenDashboard /></Protected>} />
            <Route path="/admin" element={<Protected roles={["admin"]}><AdminDashboard /></Protected>} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
