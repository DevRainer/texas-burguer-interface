import { Outlet, Navigate } from 'react-router-dom';

import { SideBarAdmin } from '../../components/SideBarAdmin';
import { Container } from './styles';

export function AdminLayout() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user?.admin;

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container>
      <SideBarAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </Container>
  );
}
