import Select from 'react-select';

import styled from 'styled-components';

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;

  .hover {
    transform: scale(1.1);
    width: 60px;
    height: 60px;
    transition: transform 0.3s ease-in-out;
  }
`;
export const SelectStatus = styled(Select)`
  width: 200px;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 29px 0;
`;

export const FilterOption = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${(props) => (props.$isActiveStatus ? props.theme.orange : props.theme.black)};
  border-bottom: ${(props) =>
    props.$isActiveStatus ? `2px solid ${props.theme.orange}` : 'none'};
  font-size: 18px;
  line-height: 24px;
  padding: 5px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
`;
