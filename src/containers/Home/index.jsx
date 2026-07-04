import { useNavigate } from 'react-router-dom';

import {
  BackButton,
  CategoriesCarousel,
  OffersCarousel,
} from '../../components';
import { Container, Banner } from './styles';

export function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <Banner>
        <h1>Bem-Vindo(a)!</h1>
      </Banner>
      <Container>
        <div>
          <CategoriesCarousel />
          <OffersCarousel />
        </div>
        <BackButton onClick={() => navigate('/login', { replace: true })}>
          Logout
        </BackButton>
      </Container>
    </main>
  );
}
