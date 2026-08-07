import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from '../Button';
import { Container } from './styles';

export function CartResume() {
  const { cartItems, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryTax = useMemo(() => (finalPrice > 100 ? 0 : 5), [finalPrice]);

  const submitOrder = async () => {
    if (!cartItems.length) {
      toast.error('Seu carrinho está vazio.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        product: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: Number(finalPrice.toFixed(2)),
        deliveryTax: Number(deliveryTax.toFixed(2)),
        total: Number((finalPrice + deliveryTax).toFixed(2)),
      };

      await api.post('/orders', payload);
      clearCart();
      toast.success('Pedido enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      toast.error(
        error.response?.data?.message || 'Não foi possível enviar o pedido.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do Pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatPrice(finalPrice)}</p>
          <p className="delivery-tax">Taxa de Entrega</p>
          <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
        </div>
        <div className="container-botton">
          <p>Total</p>
          <p>{formatPrice(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Finalizar Pedido'}
      </Button>
    </div>
  );
}
