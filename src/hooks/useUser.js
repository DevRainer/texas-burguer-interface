import { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, login, logout, setUser } = context;

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    setUser,
    name: user?.name || null,
    email: user?.email || null,
  };
};
