import styled from 'styled-components';

import BackgroundLogin from '../../assets/background-login.png';
import Background from '../../assets/background.png';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;
export const LeftContainer = styled.div`
  background: url(${BackgroundLogin}) no-repeat center;
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  max-width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
  }
`;
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 5rem;
  width: 100%;
  max-width: 50%;

  background: url(${Background}) no-repeat center;
  background-size: cover;
  background-color: #1e1e1e;

  p {
    margin-top: 2rem;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }

  a {
    color: #ff7b00;
    text-decoration: underline;
    cursor: pointer;
  }
`;
export const Title = styled.h2`
  font-family: 'Road Rage', cursive;
  font-size: 40px;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;

  span {
    color: #ff7b00;
    border-radius: 5px;
    font-family: 'Road Rage', cursive;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  input {
    width: 100%;
    border: none;
    height: 40px;
    border-radius: 5px;
    padding: 0 15px;
  }

  label {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
  p {
    color: #cf3057;
    font-size: 14px;
    font-weight: 600;
    margin-top: 3px;
    line-height: 80%;
    height: 10px;
  }
`;
// export const Button = styled.button`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   padding: 0 20px;
//   height: 40px;
//   border: none;
//   border-radius: 5px;
//   background-color: #ff7b00;
//   margin-top: 20px;
//   cursor: pointer;
// `;
