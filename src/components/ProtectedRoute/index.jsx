import PropTypes from 'prop-types';

import { Login } from '../../containers/Login';
import { useAuth } from '../../contexts/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
