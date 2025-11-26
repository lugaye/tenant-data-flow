import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['x-auth-token'] = token;
      const fetchUser = async () => {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error("Auth error:", err);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          toast.error('Session expired. Please log in again.');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['x-auth-token'] = res.data.token;
      toast.success('Login successful!');
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Login failed. Please try again.";
      console.error("Login failed:", errorMsg);
      toast.error(errorMsg);
      return false;
    }
  };

  const register = async (organizationName, email, password, subdomain) => {
    try {
      const res = await api.post('/auth/register', { organizationName, email, password, subdomain });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      api.defaults.headers.common['x-auth-token'] = res.data.token;
      toast.success('Registration successful! Welcome.');
      return true;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Registration failed. Please try again.";
      console.error("Registration failed:", errorMsg);
      toast.error(errorMsg);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['x-auth-token'];
    toast.info('You have been logged out.');
  };

  const authContextValue = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);