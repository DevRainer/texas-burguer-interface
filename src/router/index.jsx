import { createBrowserRouter } from 'react-router-dom';

import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Register } from '../containers/Register';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '*',
    element: <h1>Página não encontrada</h1>, // ou um componente customizado
  },
]);

export default router;
