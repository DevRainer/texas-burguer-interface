import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

import { api } from '../../../services/api';
import { Button } from '../../Button';
import './styles.css';

export function CheckoutForm({ order }) {
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
        confirmParams: {
          return_url: `${window.location.origin}/complete`, // O Stripe redirecionará o usuário para esta URL após qualquer autenticação externa.
        },
        redirect: 'if_required', // Redireciona se necessário (ex: 3D Secure)
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

        localStorage.removeItem('checkoutOrder');

        toast.success('Pagamento confirmado com sucesso!');

        navigate('/complete', {
          state: {
            paymentIntentId: result.paymentIntent.id,
            total: orderToSave.total,
          },
        });
      } else {
        toast.info('Pagamento em análise. Aguarde a confirmação.');
      }
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      toast.error('Não foi possível concluir o pagamento.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="stripe-checkout-form" onSubmit={handleSubmit}>
      <div className="stripe-checkout-payment">
        <PaymentElement />
      </div>

      <Button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? 'Processando...' : 'Pagar agora'}
      </Button>
    </form>
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

export default CheckoutForm;
