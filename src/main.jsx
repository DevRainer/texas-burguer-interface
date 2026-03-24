import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Dashboard } from './containers/Dashboard';
import { Login } from './containers/Login';
import { AuthProvider } from './contexts/AuthContext';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        theme="colored"
        closeButton={false}
        rtl={false}
        limit={1}
        autoClose={false}
        hideProgressBar
        draggable={false}
      />
      <div>{true ? <Dashboard /> : <Login />}</div>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
