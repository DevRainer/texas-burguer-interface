import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.secondWhite};
    overflow-y: auto;
  }

  section {
    margin: 0 auto;
    padding: 40px;
    width: 100%;
    max-width: 1200px;
  }
`;
