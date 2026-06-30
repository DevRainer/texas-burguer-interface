import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useAuth } from '../../hooks/useAuth.js';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
