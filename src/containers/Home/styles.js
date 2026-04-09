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
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url(${Background});
  height: 590px;
`;

export const Content = styled.div``;
