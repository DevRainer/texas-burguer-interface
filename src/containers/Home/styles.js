import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 2rem);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: stretch;
    justify-content: flex-start;
    padding-top: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  margin-bottom: clamp(0.5rem, 3vw, 1rem);
  text-align: center;
`;

export const Content = styled.div`
  text-align: center;
  max-width: clamp(300px, 90vw, 500px);
`;

export const Button = styled.button`
  margin-top: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(10px, 3vw, 12px) clamp(20px, 5vw, 24px);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  width: clamp(200px, 50vw, 250px);

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }

  &:hover {
    background: #ff5252;
  }
`;
