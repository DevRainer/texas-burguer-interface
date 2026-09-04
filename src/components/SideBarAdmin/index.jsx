import { useResolvedPath } from 'react-router-dom';

import { SignOutIcon } from '@phosphor-icons/react';

import Logo from '../../assets/logo.png';
import { useUser } from '../../hooks/useUser';
import { navLinks } from './navLinks';
import { Container, NavLinkContainer, NavLink, Footer } from './styles';
export function SideBarAdmin() {
  const { logout } = useUser();
  const { pathname } = useResolvedPath();

  return (
    <Container>
      <img src={Logo} alt="Hamburger Logo Sabor Goiano" />
      <NavLinkContainer>
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.id}
            $isActive={pathname === link.path}
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </NavLinkContainer>
      <Footer>
        <NavLink to="/login" onClick={logout}>
          <SignOutIcon />
          <span>Sair</span>
        </NavLink>
      </Footer>
    </Container>
  );
}
