import styled from 'styled-components';

import background from '../../assets/background.png';

export const Page = styled.div`
  min-height: calc(100vh - 122px);
  padding: 7px 20px 40px;
  text-align: center;
  font-size: 60px;
  color: ${(props) => props.theme.orange};
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)),
    url(${background});
  background-size: cover;
  background-repeat: repeat;

  section {
    margin-top: 20px;
  }
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background: #18a538;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.18);
`;

export const Title = styled.h1`
  color: #61a120;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 34px;
`;

export const Text = styled.p`
  color: #222;
  margin: 10px 0 33px;
  font-size: 34px;
  line-height: 1.45;
`;

export const BackToStart = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: #9758a6;
  font-size: 30px;
  text-decoration: underline;

  &:hover {
    color: #5c2669;
  }
`;
