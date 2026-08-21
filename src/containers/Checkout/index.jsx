import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { CheckoutForm } from '../../components/Stripe/CheckoutForm';
import { api } from '../../services/api';
import { FormCard, Page, Subtitle, Title, stripeAppearance } from './styles';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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
          paymentMethodTypes: ['card'],
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
