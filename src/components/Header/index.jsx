import { useNavigate } from 'react-router-dom';

import { UserCircle, ShoppingCart } from '@phosphor-icons/react';

import {
  Container,
  Navigation,
  HeaderLink,
  Option,
  Profile,
  LinkContainer,
  Logout,
  Content,
} from './styles';
export function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    // aqui você pode limpar tokens, contexto, etc.
    navigate('/login');
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to="/">Home</HeaderLink>
            <hr></hr>
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
            <ShoppingCart size={32} color="#fff" />
            <HeaderLink to="/carrinho">Carrinho</HeaderLink>
          </LinkContainer>
        </Option>
      </Content>
    </Container>
  );
}
