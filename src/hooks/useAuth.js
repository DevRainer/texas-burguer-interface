import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth: Erro de Contexto. Verifique se o AuthProvider envolve este componente no main.jsx',
    );
  }
  return context;
};
