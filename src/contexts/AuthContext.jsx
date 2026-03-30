import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { api } from '../services/api.js';
import { AuthContext } from './auth-context.js';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/sessions', { email, password });
      const { token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally standardize error for better UX, e.g., if API returns specific codes
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  const registerUser = async (name, email, password, confirmPassword) => {
    setLoading(true);
    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
        confirmPassword,
      });
      const { token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        registerUser,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
