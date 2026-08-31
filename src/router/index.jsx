// router/routes.jsx
import { Routes, Route } from 'react-router-dom';

import {
  Cart,
  Checkout,
  CompletePayment,
  Home,
  Login,
  Menu,
  Register,
} from '../containers';
import { Admin } from '../containers/Admin';
import { AdminLayout } from './AdminLayout';
import { Layout } from './Layout';
import { ProtectedRoute } from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas com Layout padrão */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete" element={<CompletePayment />} />
      </Route>

      {/* Rotas administrativas */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/home" element={<h1>Admin - Usuários</h1>} />
        {/* outras rotas de administração */}
      </Route>

      {/* Rotas sem layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      {/* Rota fallback */}
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
}

export default AppRoutes;
