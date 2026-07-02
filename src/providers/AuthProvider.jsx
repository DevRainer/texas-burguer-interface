import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser === 'undefined') return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user?.token);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/sessions', { email, password });
      const userData = response.data; // já contém id, name, email, admin e token

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
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
      const userData = response.data;

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
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
    setIsAuthenticated(!!user?.token);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
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
