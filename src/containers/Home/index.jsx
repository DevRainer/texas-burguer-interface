import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { OffersCarousel } from '../../components/OffersCarousel';
import { Container, Banner, Footer } from './styles';

export function Home() {
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
      </Container>
      <Footer>
        <p>© 2026 Sabor Goiano Burguer. Todos os direitos reservados.</p>
      </Footer>
    </main>
  );
}
