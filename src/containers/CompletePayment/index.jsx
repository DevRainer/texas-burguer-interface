import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loadStripe } from '@stripe/stripe-js';

import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Card, Page, Text, Title, Badge, Summary, SummaryRow } from './styles';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export function CompletePayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function resolvePayment() {
      const params = new URLSearchParams(location.search);
      const clientSecret = params.get('payment_intent_client_secret');
      let paymentIntent = location.state?.paymentIntentId
        ? { id: location.state.paymentIntentId, status: 'succeeded' }
        : null;

      try {
        if (!paymentIntent && clientSecret && stripePromise) {
          const stripe = await stripePromise;
          const result = await stripe.retrievePaymentIntent(clientSecret);
          if (result.error) throw result.error;
          paymentIntent = result.paymentIntent;
        }

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          throw new Error('Pagamento não confirmado.');
        }

        const savedOrder = localStorage.getItem('checkoutOrder');
        const order = savedOrder ? JSON.parse(savedOrder) : null;
        const marker = `payment-completed:${paymentIntent.id}`;

        if (order && !localStorage.getItem(marker)) {
          await api.post('/orders', {
            ...order,
            paymentIntentId: paymentIntent.id,
          });
          localStorage.setItem(marker, 'true');
        }

        localStorage.removeItem('checkoutOrder');
        localStorage.removeItem('cart');

        if (isMounted) {
          setPayment({
            id: paymentIntent.id,
            total: Number(location.state?.total ?? order?.total ?? 0),
          });
        }
      } catch (error) {
        console.error('Erro ao validar pagamento:', error);
        toast.error('Não foi possível confirmar o pagamento.');
        navigate('/checkout', { replace: true });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    resolvePayment();
    return () => {
      isMounted = false;
    };
  }, [location.search, location.state, navigate]);

  if (isLoading) {
    return (
      <Page>
        <Text>Confirmando pagamento...</Text>
      </Page>
    );
  }

  if (!payment) return null;

  return (
    <Page>
      <Card>
        <Badge>✓</Badge>
        <Title>Pagamento concluído</Title>
        <Text>Seu pedido foi confirmado com sucesso.</Text>

        <Summary>
          {payment.total > 0 && (
            <SummaryRow>
              <span>Total pago</span>
              <strong>{formatPrice(payment.total)}</strong>
            </SummaryRow>
          )}
          {payment.id && (
            <SummaryRow>
              <span>ID do pagamento</span>
              <strong>{payment.id}</strong>
            </SummaryRow>
          )}
        </Summary>
      </Card>
    </Page>
  );
}
