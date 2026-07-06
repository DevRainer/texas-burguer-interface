import { useNavigate } from 'react-router-dom';

import { UserCircle, ShoppingCart } from '@phosphor-icons/react';

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
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function handleLogout() {
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
            <UserCircle size={32} color="#fff" />
            <div>
              <p>
                Olá, <span>Rainer</span>
              </p>
              <Logout onClick={handleLogout}>Sair</Logout>
            </div>
          </Profile>
          <LinkContainer>
            <CartIconWrapper>
              <ShoppingCart size={32} color="#fff" />
              {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
            </CartIconWrapper>
            <HeaderLink to="/carrinho">Carrinho</HeaderLink>
          </LinkContainer>
        </Option>
      </Content>
    </Container>
  );
}
