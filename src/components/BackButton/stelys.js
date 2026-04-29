import styled from 'styled-components';

export const ContainerButton = styled.button`
  display: block;
  margin: 0 auto 30px auto;
  padding: 10px 20px;
  background-color: #f55f09;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #e14c00;
  }
`;
