import PropTypes from 'prop-types';

import {
  SummaryContainer,
  SummaryItem,
  SummaryTotal,
  SummaryTitle,
} from './styles';

export function OrderSummary({ order }) {
  return (
    <SummaryContainer>
      <SummaryTitle>Resumo do Pedido</SummaryTitle>

      {order.items.map((item, index) => (
        <SummaryItem key={index}>
          <span>
            {item.name} x{item.quantity}
          </span>
          <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
        </SummaryItem>
      ))}

      <SummaryItem>
        <span>Subtotal</span>
        <span>R$ {order.subtotal.toFixed(2)}</span>
      </SummaryItem>

      <SummaryItem>
        <span>Taxa de entrega</span>
        <span>R$ {order.deliveryTax.toFixed(2)}</span>
      </SummaryItem>

      <SummaryTotal>
        <span>Total</span>
        <span>R$ {order.total.toFixed(2)}</span>
      </SummaryTotal>
    </SummaryContainer>
  );
}

OrderSummary.propTypes = {
  order: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
    subtotal: PropTypes.number.isRequired,
    deliveryTax: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderSummary;
