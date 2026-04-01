import styled from 'styled-components';

import BackgroundLogin from '../../assets/background-login.png';
import Background from '../../assets/background.png';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  background: url(${BackgroundLogin}) no-repeat center;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  max-width: 50%;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: clamp(60%, 80%, 80%);
    height: auto;
  }

  @media (max-width: 768px) {
    height: clamp(25vh, 35vh, 40vh);
    max-width: 100%;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: clamp(1rem, 4vw, 5rem);
  height: 100vh;
  width: 100%;
  max-width: 50%;
  flex: 1;

  background: url(${Background}) no-repeat center;
  background-size: cover;
  background-color: #1e1e1e;

  p {
    margin-top: clamp(1rem, 3vw, 2rem);
    text-align: center;
    color: #fff;
    font-size: clamp(14px, 3vw, 18px);
    font-weight: 600;
  }

  h2 {
    color: #ff7b00;
  }

  a {
    color: #ff7b00;
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 60vh;
    max-width: 100%;
    padding: clamp(1.5rem, 6vw, 4rem);
  }
`;

export const Title = styled.h2`
  font-family: 'Road Rage', cursive;
  font-size: clamp(2.2rem, 8vw, 3.5rem);
  color: #fff;
  text-align: center;
  margin-bottom: clamp(1.2rem, 4vw, 2rem);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3.5vw, 20px);
  padding: clamp(1.2rem, 5vw, 20px);
  width: 100%;
  max-width: clamp(320px, 85vw, 400px);
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 1vw, 5px);
  width: 100%;

  input {
    width: 100%;
    border: none;
    height: clamp(38px, 9vh, 42px);
    border-radius: 5px;
    padding: 0 clamp(1rem, 5vw, 1.8rem);
    font-size: clamp(15px, 3.5vw, 16px);
    box-sizing: border-box;
  }

  label {
    color: #fff;
    font-size: clamp(15px, 3.2vw, 18px);
    font-weight: 600;
  }

  p {
    color: #cf3057;
    font-size: clamp(12px, 2.8vw, 14px);
    font-weight: 600;
    margin-top: 2px;
    line-height: 1.1;
  }
`;
