import { useLocation } from 'react-router-dom';

import { formatPrice } from '../../utils/formatPrice';
import { Card, Page, Text, Title, Badge, Summary, SummaryRow } from './styles';

export function CompletePayment() {
  const location = useLocation();
  const paymentIntentId = location.state?.paymentIntentId;
  const total = Number(location.state?.total ?? 0);

  return (
    <Page>
      <Card>
        <Badge>✓</Badge>
        <Title>Pagamento concluído</Title>
        <Text>Seu pedido foi confirmado com sucesso.</Text>

        <Summary>
          {total > 0 && (
            <SummaryRow>
              <span>Total pago</span>
              <strong>{formatPrice(total)}</strong>
            </SummaryRow>
          )}
          {paymentIntentId && (
            <SummaryRow>
              <span>ID do pagamento</span>
              <strong>{paymentIntentId}</strong>
            </SummaryRow>
          )}
        </Summary>
      </Card>
    </Page>
  );
}
