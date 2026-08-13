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
import { api } from '../../services/api';
import {
  FormCard,
  Page,
  PaymentWrap,
  Subtitle,
  Title,
  stripeAppearance,
} from './styles';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
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
        const orderToSave = {
          ...order,
          paymentIntentId: result.paymentIntent.id,
          total: Number(order?.total ?? 0),
        };

        await api.post('/orders', orderToSave);
        toast.success('Pagamento confirmado com sucesso!');
        navigate('/complete', {
          state: {
            paymentIntentId: result.paymentIntent.id,
            total: orderToSave.total,
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

      <PaymentWrap>
        <PaymentElement />
      </PaymentWrap>

      <Button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processando...' : 'Pagar agora'}
      </Button>
    </FormCard>
  );
}

CheckoutForm.propTypes = {
  order: PropTypes.shape({
    items: PropTypes.array.isRequired,
    subtotal: PropTypes.number.isRequired,
    deliveryTax: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
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

  const totalValue = Number(order?.total ?? 0);
  const orderWithTotal = { ...order, total: totalValue };

  if (!clientSecret || !order) {
    return (
      <Page>
        <FormCard as="div">
          <Title>Checkout</Title>
          <Subtitle>
            Nenhuma intenção de pagamento encontrada para este pedido.
          </Subtitle>
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
