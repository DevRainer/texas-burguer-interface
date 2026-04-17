import styled from 'styled-components';

export const ContainerButton = styled.button`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  background-color: #ff8c05;
  border: none;
  border-radius: 5px;
  font-size: 40px;
  font-family: 'Road Rage', sans-serif;
  color: #fff;
  padding: 0 20px;
  gap: 10px;
  text-align: center;
  white-space: nowrap;

  img {
    width: 28px;
    height: 28px;
  }

  &:hover {
    background-color: #61a120;
  }
`;
