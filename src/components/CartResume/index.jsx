import { Button } from '../Button';
import { Container } from './styles';

export function CartResume() {
  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do Pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">R$ 20,00</p>
          <p className="delivery-tax">Taxa de Entrega</p>
          <p className="delivery-tax-price">R$ 5,00</p>
        </div>
        <div className="container-botton">
          <p>Total</p>
          <p>R$ 25,00</p>
        </div>
      </Container>
      <Button>Finalizar Pedido</Button>
    </div>
  );
}
