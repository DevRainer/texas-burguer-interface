import styled from 'styled-components';

export const Container = styled.div`
  .carousel-item {
    padding-right: 40px;
    padding-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  overflow-x: hidden;

  .react-multi-carousel-list {
    overflow: visible;
  }
`;

export const Title = styled.h2`
  margin-top: 70px;
  font-size: 48px;
  font-weight: 800;
  color: ${(props) => props.theme.gren};
  padding-bottom: 20px;
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  &::after {
    content: '';
    position: absolute;
    width: 56px;
    height: 4px;
    background-color: ${(props) => props.theme.gren};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    margin: 0;
  }
`;
