import Logo from '../../assets/logo.png';
import { CartItems, CartResume } from '../../components';
import { Banner, Container, Content, Title } from '../Cart/styles.js';
export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={Logo} alt="Logo" />
      </Banner>
      <Title>Checkout - Pedido</Title>
      <Content>
        <CartItems />
        <CartResume />
      </Content>
    </Container>
  );
}
