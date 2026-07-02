import { useState } from 'react';

import PropTypes from 'prop-types';

import { UserContext } from '../contexts/UserContext';

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    // Evita erro de parse se o valor for "undefined" ou inválido
    if (!storedUser || storedUser === 'undefined') return null;
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Erro ao parsear usuário do localStorage:', error);
      return null;
    }
  });

  const login = (userData) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      console.warn('Tentativa de login sem dados de usuário válidos.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
