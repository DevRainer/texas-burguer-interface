import styled from 'styled-components';

export const Page = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 32px auto 60px;
  padding: 0 20px;
`;

export const FormCard = styled.form`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
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
