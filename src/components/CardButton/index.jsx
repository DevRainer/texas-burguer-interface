import PropTypes from 'prop-types';

import Cart from '../../assets/cart.svg';
import { ContainerButton } from './styles';

export function CardButton({ children, ...props }) {
  return (
    <ContainerButton {...props}>
      <img src={Cart} alt="carrinho-de-compras" />
      {children}
    </ContainerButton>
  );
}

CardButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardButton;
