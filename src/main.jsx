import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Dashboard } from './containers/Dashboard';
import { Login } from './containers/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import GlobalStyles from './styles/globalStyles';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <GlobalStyles />
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
