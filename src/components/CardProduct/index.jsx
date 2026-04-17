import PropTypes from 'prop-types';

import { formatPrice } from '../../utils/formatPrice';
import CardButton from '../CardButton';
import { Container, CardImage } from './styles';

export function CardProduct({ product }) {
  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <CardButton>Comprar</CardButton>
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
