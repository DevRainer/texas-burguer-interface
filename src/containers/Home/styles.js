import styled from 'styled-components';

import Background from '../../assets/background.png';
import BannerHome from '../../assets/banner-home.svg';

export const Banner = styled.div`
  background-image: url(${BannerHome});
  background-size: cover;
  background-position: center;
  height: 357px;

  h1 {
    font-family: 'Road Rage', cursive;
    color: #fff;
    font-size: 60px;
    position: absolute;
    top: 10%;
    right: 20%;
  }
`;

export const Container = styled.div`
  background:
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),
    url(${Background});
  background-size: cover; /* Faz a imagem cobrir toda a área */
  background-position: center; /* Centraliza a imagem */
  width: 100vw; /* Largura total da viewport */
  height: 100vh;
`;

export const Content = styled.div``;

export const Footer = styled.footer`
  background-color: #f55f09;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;
