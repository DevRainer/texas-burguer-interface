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
  width: 150px;
`;
