// router/routes.jsx
import { createBrowserRouter } from 'react-router-dom';

import { Cart } from '../containers/Cart';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Menu } from '../containers/Menu';
import { Register } from '../containers/Register';
import { Layout } from './Layout';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <Layout />, // Layout com Header
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/cardapio',
        element: <Menu />,
      },
      {
        path: '/carrinho',
        element: <Cart />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />, // sem Header
  },
  {
    path: '/cadastro',
    element: <Register />, // sem Header
  },
  {
    path: '*',
    element: <h1>Página não encontrada</h1>,
  },
]);

export default router;
