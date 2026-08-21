import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PropTypes from 'prop-types';

import { Button } from '../../components/Button';
import { useCart } from '../../hooks/useCart';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import {
  FormCard,
  Page,
  PaymentWrap,
  Subtitle,
  Summary,
  SummaryTitle,
  Title,
  stripeAppearance,
} from './styles';

function OrderSummary({ order }) {
  return (
    <Summary>
      <SummaryTitle>Resumo do pedido</SummaryTitle>
      {order.items.map((item) => (
        <div className="line" key={item.id}>
          <span>
            {item.quantity}x {item.name}
          </span>
          <span>{formatPrice(item.price * item.quantity)}</span>
        </div>
      ))}
      <div className="line">
        <span>Subtotal</span>
        <span>{formatPrice(order.subtotal)}</span>
      </div>
      <div className="line">
        <span>Taxa de entrega</span>
        <span>{formatPrice(order.deliveryTax)}</span>
      </div>
      <div className="line total">
        <span>Total a pagar</span>
        <span>{formatPrice(order.total)}</span>
      </div>
    </Summary>
  );
}

const orderPropType = PropTypes.shape({
  items: PropTypes.array.isRequired,
  subtotal: PropTypes.number.isRequired,
  deliveryTax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
});

OrderSummary.propTypes = {
  order: orderPropType.isRequired,
};

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (result.error) {
        toast.error(
          result.error.message || 'Não foi possível confirmar o pagamento.',
        );
        return;
      }

      if (result.paymentIntent?.status === 'succeeded') {
        await api.post('/orders', {
          product: order.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          paymentIntentId: result.paymentIntent.id,
        });

        localStorage.removeItem('checkoutOrder');
        clearCart();
        toast.success('Pagamento confirmado com sucesso!');
        navigate('/complete', {
          state: {
            paymentIntentId: result.paymentIntent.id,
            total: order.total,
          },
        });
      }
    } catch {
      toast.error('Não foi possível concluir o pagamento.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <FormCard onSubmit={handleSubmit}>
      <Title>Checkout</Title>
      <Subtitle>Finalize seu pedido com segurança pelo Stripe.</Subtitle>

      <OrderSummary order={order} />

      <PaymentWrap>
        <PaymentElement />
      </PaymentWrap>

      <Button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing
          ? 'Processando...'
          : `Pagar agora ${formatPrice(order.total)}`}
      </Button>
    </FormCard>
  );
}

CheckoutForm.propTypes = {
  order: orderPropType.isRequired,
};

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(
    location.state?.clientSecret || null,
  );
  const [order] = useState(() => {
    const savedOrder = localStorage.getItem('checkoutOrder');
    return (
      location.state?.order || (savedOrder ? JSON.parse(savedOrder) : null)
    );
  });

  useEffect(() => {
    if (!order) {
      toast.error('Pedido não encontrado.');
      navigate('/');
      return;
    }

    if (clientSecret) {
      return;
    }

    async function fetchPaymentIntent() {
      try {
        const { data } = await api.post('/create-payment-intent', {
          items: order.items,
          deliveryTax: Number(order.deliveryTax ?? 0),
        });
        setClientSecret(data.clientSecret);
        localStorage.setItem('checkoutOrder', JSON.stringify(order));
      } catch {
        toast.error('Não foi possível iniciar o checkout.');
        navigate('/');
      }
    }

    fetchPaymentIntent();
  }, [clientSecret, navigate, order]);

  const orderWithTotal = {
    ...order,
    subtotal: Number(order?.subtotal ?? 0),
    deliveryTax: Number(order?.deliveryTax ?? 0),
    total: Number(order?.total ?? 0),
  };

  if (!clientSecret || !order || !stripePromise) {
    return (
      <Page>
        <FormCard as="div">
          <Title>Checkout</Title>
          <Subtitle>
            {stripePromise
              ? 'Nenhuma intenção de pagamento encontrada para este pedido.'
              : 'Pagamento indisponível: defina VITE_STRIPE_PUBLIC_KEY no arquivo .env do frontend.'}
          </Subtitle>
          {order && stripePromise && <OrderSummary order={orderWithTotal} />}
        </FormCard>
      </Page>
    );
  }

  return (
    <Page>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: stripeAppearance,
        }}
      >
        <CheckoutForm order={orderWithTotal} />
      </Elements>
    </Page>
  );
}
