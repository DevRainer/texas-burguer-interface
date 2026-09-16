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
  background-color: ${(props) => props.theme.orange};
  color: ${(props) => props.theme.white};
  font-size: 30px;
  font-weight: 200;
  font-family: 'Road Rage', sans-serif;
  margin-top: 20px;

  &:hover {
    background-color: ${(props) => props.theme.orange};
    border: 1px dashed ${(props) => props.theme.white};
  }
`;

export default ContainerButton;
