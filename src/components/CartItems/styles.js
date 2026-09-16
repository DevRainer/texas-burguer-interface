// src/components/CartItems/styles.js
import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
`;

export const ProductImage = styled.img`
  width: 90px;
  height: auto;
  border-radius: 4px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  button {
    background: ${(props) => props.theme.orange};
    border: none;
    color: ${(props) => props.theme.white};
    font-size: 16px;
    font-weight: bold;
    width: 28px;
    height: 28px;
    border-radius: 10%;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: ${(props) => props.theme.red};
    }
  }

  span {
    min-width: 20px;
    text-align: center;
    font-weight: bold;
  }
`;

export const EmptyCartMessage = styled.td`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.darkGray};
`;

export const ProductTotalPrice = styled.td`
  font-weight: bold;
`;
export const TrashImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;
