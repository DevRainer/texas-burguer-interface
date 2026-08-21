import styled from 'styled-components';

export const SummaryContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const SummaryTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #555;
`;

export const SummaryTotal = styled(SummaryItem)`
  font-weight: bold;
  font-size: 1.1rem;
  color: #000;
  margin-top: 12px;
`;
