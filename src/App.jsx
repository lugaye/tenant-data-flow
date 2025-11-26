import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TenantDashboardPage from './pages/TenantDashboardPage';
import SuperAdminDashboardPage from './pages/SuperAdminDashboardPage';
import FormBuilderPage from './pages/FormBuilderPage';
import SubmissionsListPage from './pages/SubmissionsListPage';
import HomePage from './pages/HomePage'; // Import HomePage

const AppRoutes = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Tenant Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute roles={['TENANT_ADMIN', 'EDITOR', 'VIEWER']}>
                <TenantDashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/form-builder" 
            element={
              <PrivateRoute roles={['TENANT_ADMIN', 'EDITOR']}>
                <FormBuilderPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/submissions" 
            element={
              <PrivateRoute roles={['TENANT_ADMIN', 'EDITOR', 'VIEWER']}>
                <SubmissionsListPage />
              </PrivateRoute>
            } 
          />

          {/* Super Admin Route */}
          <Route 
            path="/super-admin" 
            element={
              <PrivateRoute roles={['SUPER_ADMIN']}>
                <SuperAdminDashboardPage />
              </PrivateRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;