import { Link } from 'react-router-dom';

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
  background: url(${(props) => props.$imageUrl}) no-repeat center;
  background-size: cover;
  background-position: center;
  height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 15px;
`;

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 800;
  color: ${(props) => props.theme.orange};
  padding-bottom: 20px;
  position: relative;
  text-align: center;
  margin-bottom: 40px;

  &::after {
    content: '';
    position: absolute;
    width: 56px;
    height: 4px;
    background-color: ${(props) => props.theme.orange};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    margin: 0;
  }
`;

export const CategoryButton = styled(Link)`
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.darkBlack};
  border-radius: 15px;
  padding: 10px 30px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.darkBlack};
  }
`;
