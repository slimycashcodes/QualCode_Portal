import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import LoginView from './pages/Login';
import ModuleList from './pages/ModuleList';
import ModuleForm from './pages/ModuleForm';

// Defensive component rendering check to guard authorization pathways
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Open Public Landing Domains */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<LoginView />} />
            
            {/* Secure Role-Authenticated Workspaces */}
            <Route path="/dashboard" element={<ProtectedRoute><ModuleList /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><ModuleForm /></ProtectedRoute>} />
            <Route path="/edit/:id" element={<ProtectedRoute><ModuleForm /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}