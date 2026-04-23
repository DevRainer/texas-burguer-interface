import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Background from '../../assets/background.png';
import BannerHamburger from '../../assets/banner-hamburger.svg';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;
  background:
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),
    url(${Background});
`;

export const Banner = styled.div`
  background-image: url(${BannerHamburger});
  background-size: cover;
  background-position: center;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  justify-content: flex-end;

  h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    line-height: 60px;
    color: #fff;
    position: absolute;

    right: 20%;
    top: 30%;
  }
  span {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
  }
`;

export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

export const CategoryButton = styled(Link)`
  background-color: transparent;
  border: 2px solid #f55f09;
  border-radius: 8px;
  color: #f55f09;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  gap: 60px;
  justify-content: center;
  max-width: 1200px;
  margin: 50px;
  margin-left: auto;
  margin-right: auto;
`;
