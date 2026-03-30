import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/AuthContext';
import { router } from './router';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        theme="light"
        closeButton={false}
        rtl={false}
        limit={1}
        autoClose={3000}
        hideProgressBar
        draggable={false}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default App;
