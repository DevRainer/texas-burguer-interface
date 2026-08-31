// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { UserProvider } from './providers/UserProvider';
import AppRoutes from './router/index.jsx';
import GlobalStyles from './styles/globalStyles';
import { standardTheme } from './styles/themes/standard';

function App() {
  return (
    <ThemeProvider theme={standardTheme}>
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
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

export default App;
