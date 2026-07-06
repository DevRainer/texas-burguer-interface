import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1f1f1f;
  width: 100%;
  height: 72px;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;
export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;

  div {
    margin-left: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    hr {
      background-color: #ff8c05;
      border: none;
      width: 1px;
      height: 32px;
    }
  }
`;
export const HeaderLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
    color: #ff8c05;
  }
`;
export const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  p {
    color: #fff;
    line-height: 90%;
    font-weight: 300;

    span {
      font-weight: 700;
      color: #ff8c05;
    }
  }
`;
export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 56px;
`;
export const Logout = styled.button`
  color: #ff3205;
  text-decoration: none;
  font-weight: 700;
  background-color: transparent;
  border: none;
`;
export const CartIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
`;
