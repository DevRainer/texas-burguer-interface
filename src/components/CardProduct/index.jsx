import PropTypes from 'prop-types';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import CardButton from '../CardButton';
import { Container, CardImage } from './styles';

export function CardProduct({ product }) {
  const { addToCart } = useCart();

  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <strong>{formatPrice(product.price)}</strong>
      </div>
      <CardButton onClick={() => addToCart({ ...product, quantity: 1 })}>
        Comprar
      </CardButton>
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
