import styled from 'styled-components';

export const ContainerButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #ff7b00;
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  font-family: 'Road Rage', sans-serif;
  margin-top: 20px;

  &:hover {
    background-color: #e97407cc;
    border: 1px dashed #fff;
  }
`;

export default ContainerButton;
