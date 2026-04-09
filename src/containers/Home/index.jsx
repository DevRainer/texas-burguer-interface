import { CategoriesCarousel } from '../../components/CategoriesCarousel';
import { Container, Content, Banner } from './styles';

export function Home() {
  return (
    <main>
      <Banner>
        <h1>Bem-Vindo(a)!</h1>
      </Banner>
      <Container>
        <Content>
          <CategoriesCarousel />
          <div>Carrossel Produtos</div>
        </Content>
      </Container>
    </main>
  );
}
