import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { UserProvider } from './providers/UserProvider';
import { router } from './router';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <GlobalStyles />
          <ToastContainer
            position="top-right"
            theme="light"
            closeButton={false}
            rtl={false}
            limit={1}
            autoClose={1200}
            hideProgressBar
            draggable={false}
            pauseOnHover={false}
          />
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default App;
