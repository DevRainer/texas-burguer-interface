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
  EditProduct,
  Orders,
  NewProduct,
  Products,
} from '../containers';
import { AdminLayout } from '../layouts/AdminLayout/AdminLayout';
import { Layout } from '../layouts/UserLayout/Layout';
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
        <Route path="/admin/produtos" element={<Products />} />
        <Route path="/admin/pedidos" element={<Orders />} />
        <Route path="/admin/novo-produto" element={<NewProduct />} />
        <Route path="/admin/editar-produto" element={<EditProduct />} />
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
