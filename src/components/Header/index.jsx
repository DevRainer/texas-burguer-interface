import { useNavigate } from 'react-router-dom';

import { UserCircleIcon, ShoppingCartIcon } from '@phosphor-icons/react';

import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart'; // ajuste o caminho conforme sua estrutura
import {
  Container,
  Navigation,
  HeaderLink,
  Option,
  Profile,
  LinkContainer,
  Logout,
  Content,
  CartIconWrapper,
  CartCount,
} from './styles';

export function Header() {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // vindo do contexto
  const { user, logout } = useAuth();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // extrai apenas o primeiro nome do usuário logado
  const firstName = user?.name?.split(' ')[0] || 'Usuário';

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to="/">Home</HeaderLink>
            <hr />
            <HeaderLink to="/cardapio">Cardápio</HeaderLink>
          </div>
        </Navigation>
        <Option>
          <Profile>
            <UserCircleIcon size={32} color="#fff" />
            <div>
              <p>
                Olá, <span>{firstName}</span>
              </p>
              <Logout onClick={handleLogout}>Sair</Logout>
            </div>
          </Profile>
          <LinkContainer>
            <CartIconWrapper>
              <ShoppingCartIcon size={32} color="#fff" />
              {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
            </CartIconWrapper>
            <HeaderLink to="/carrinho">Carrinho</HeaderLink>
          </LinkContainer>
        </Option>
      </Content>
    </Container>
  );
}
