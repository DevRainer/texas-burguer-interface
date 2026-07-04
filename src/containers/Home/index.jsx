import { useNavigate } from 'react-router-dom';

import { BackButton } from '../../components/BackButton';
import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { OffersCarousel } from '../../components/OffersCarousel';
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
