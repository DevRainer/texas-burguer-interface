import styled from 'styled-components';

export const Page = styled.div`
  max-width: 720px;
  margin: 60px auto 0;
  padding: 0 20px 60px;
`;

export const Card = styled.div`
  background: rgba(17, 17, 17, 0.74);
  border: 1px solid rgba(97, 161, 32, 0.5);
  border-radius: 24px;
  padding: 32px 24px 26px;
  text-align: center;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(97, 161, 32, 0.18);
  border: 2px solid rgba(97, 161, 32, 0.8);
  color: #a7ff47;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 18px;
`;

export const Title = styled.h1`
  color: #61a120;
  font-size: clamp(1.9rem, 2vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 12px;
`;

export const Text = styled.p`
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 12px;
  font-size: 1rem;
`;

export const Summary = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: left;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.95rem;

  strong {
    color: #fff;
    font-weight: 700;
    text-align: right;
    word-break: break-all;
  }
`;
