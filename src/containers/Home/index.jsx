import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';
import { Container, Content, Title } from './styles';

export function Home() {
  const { logout } = useAuth();

  return (
    <Container>
      <Title>Bem-vindo ao Dashboard!</Title>
      <Content>
        <p>
          Seu login foi bem-sucedido. Aqui você pode acessar o menu de
          hambúrgueres.
        </p>
        <Button onClick={logout}>Sair</Button>
      </Content>
    </Container>
  );
}
