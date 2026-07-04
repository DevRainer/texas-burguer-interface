import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../index.js';

export function CartItems() {
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();

  return (
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
                <img src={product.url} alt={product.name} width={50} />
              </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{formatPrice(product.price)}</Table.Td>
              <Table.Td>
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                {product.quantity}
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </Table.Td>
              <Table.Td>
                {formatPrice(product.price * product.quantity)}
              </Table.Td>
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td colSpan={5}>Carrinho vazio</Table.Td>
          </Table.Tr>
        )}
      </Table.Body>
    </Table.Root>
  );
}
