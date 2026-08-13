import { useLocation } from 'react-router-dom';

import { Card, Page, Text, Title } from './styles';

export function CompletePayment() {
  const location = useLocation();
  const paymentIntentId = location.state?.paymentIntentId;
  const total = Number(location.state?.total ?? 0);

  return (
    <Page>
      <Card>
        <Title>Pagamento concluído</Title>
        <Text>Seu pedido foi confirmado com sucesso.</Text>
        {paymentIntentId && <Text>ID do pagamento: {paymentIntentId}</Text>}
        {total && (
          <Text>
            Total pago: R$ {Number(total).toFixed(2).replace('.', ',')}
          </Text>
        )}
      </Card>
    </Page>
  );
}
