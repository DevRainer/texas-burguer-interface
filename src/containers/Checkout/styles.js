import styled from 'styled-components';

export const Page = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`;

export const FormCard = styled.form`
  background: rgba(17, 17, 17, 0.7);
  border: 1px solid rgba(255, 123, 0, 0.4);
  border-radius: 18px;
  padding: 32px 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h1`
  color: #61a120;
  font-size: 2.1rem;
  font-weight: 800;
  margin-bottom: 8px;
  text-align: center;
`;

export const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 24px;
  font-size: 0.98rem;
`;

export const Summary = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 123, 0, 0.25);
  border-radius: 12px;
  padding: 16px 18px;
  color: #fff;

  .line {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 6px 0;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.85);
  }

  .total {
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
  }
`;

export const SummaryTitle = styled.h2`
  color: #ff7b00;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const PaymentWrap = styled.div`
  margin-top: 20px;
  padding: 16px 0 8px;

  .StripeElement {
    background: rgba(255, 255, 255, 0.96);
    border-radius: 10px;
  }
`;

export const stripeAppearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#ff7b00',
    colorBackground: '#fffaf3',
    colorText: '#1b1b1b',
    colorDanger: '#df1b41',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '10px',
  },
};
