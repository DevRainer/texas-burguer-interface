import styled from 'styled-components';

export const Container = styled.div`
  .carousel-item {
    padding-right: 40px;
    padding-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ContainerItems = styled.div`
  background: url(${(props) => props.imageUrl}) no-repeat center;
  background-size: cover;
  background-position: center;
  height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: self-end;
  border-radius: 15px;

  p {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 10px 30px;
    font-size: 28px;
    font-weight: bold;
    text-align: left;
  }
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 800;
  color: #f55f09;
  padding-bottom: 20px;
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  &::after {
    content: '';
    position: absolute;
    width: 56px;
    height: 4px;
    background-color: #f55f09;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    margin: 0;
  }
`;
