import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.black};

  img {
    width: 90%;
    margin: 1rem auto;
  }
`;

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.white};
  background-color: ${({ $isActive, theme }) => ($isActive ? theme.orange : 'transparent')};
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};

  &:hover {
    background-color: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.black};
  }
`;
export const Footer = styled.div`
  width: 100%;
  margin-top: auto;
  ${NavLink} {
    justify-content: center;
    padding: 12px 0;
    border-top: 1px solid ${({ theme }) => theme.darkGray};
  }
`;
