import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../index.js';
import {
  TableContainer,
  ProductImage,
  QuantityControl,
  EmptyCartMessage,
  ProductTotalPrice,
} from './styles.js';

export function CartItems() {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <TableContainer>
      <Table.Root>
        <Table.Header>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Itens</Table.Th>
            <Table.Th>Preço</Table.Th>
            <Table.Th>Quantidade</Table.Th>
            <Table.Th>Total</Table.Th>
          </Table.Tr>
        </Table.Header>

        <Table.Body>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>
                  <ProductImage src={product.url} alt={product.name} />
                </Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{formatPrice(product.price)}</Table.Td>
                <Table.Td>
                  <QuantityControl>
                    <button onClick={() => decreaseQuantity(product.id)}>
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)}>
                      +
                    </button>
                  </QuantityControl>
                </Table.Td>
                <Table.Td>
                  <ProductTotalPrice>
                    {formatPrice(product.price * product.quantity)}
                  </ProductTotalPrice>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <EmptyCartMessage colSpan={5}>Carrinho vazio</EmptyCartMessage>
            </Table.Tr>
          )}
        </Table.Body>
      </Table.Root>
    </TableContainer>
  );
}
