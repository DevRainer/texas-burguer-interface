import styled from 'styled-components';

import Background from '../../assets/background.png';
import Texture from '../../assets/texture.svg';

export const Container = styled.div`
  width: 100%;
  background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Background});
  background-image: url(${Background});
  min-height: 87vh;
`;

export const Banner = styled.div`
  background: url(${Texture});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 180px;

  img {
    width: 200px;
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 20px;
  color: #61a120;
  text-align: center;
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    left: calc(50% - 28px);
    border-radius: 2px;
    content: '';
    width: 56px;
    height: 4px;
    background-color: #61a120;
  }
`;
export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 20%;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  margin: 0 auto;
`;
