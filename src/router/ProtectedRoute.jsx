// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useAuth } from '../contexts/auth';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo protegido
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
