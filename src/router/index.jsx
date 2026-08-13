// router/routes.jsx
import { createBrowserRouter } from 'react-router-dom';

import {
  Cart,
  Checkout,
  CompletePayment,
  Home,
  Login,
  Menu,
  Register,
} from '../containers';
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
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/complete',
        element: <CompletePayment />,
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
