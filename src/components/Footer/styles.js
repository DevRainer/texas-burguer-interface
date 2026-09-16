import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.orange};
  height: 50px;
  width: 100vw;

  p {
    color: ${(props) => props.theme.white};
    font-size: 14px;
    font-weight: 200;
    text-align: center;
    line-height: 50px;
  }
`;
