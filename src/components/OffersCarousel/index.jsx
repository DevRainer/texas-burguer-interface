import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { api } from '../../services/api';
import { CardProduct } from '../CardProduct';
import { Container, Title } from './styles';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      const onlyOffers = data.filter((product) => product.offer);
      setOffers(onlyOffers);
    }

    loadProducts();
  }, []);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // opcional, o padrão é 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // opcional, o padrão é 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // opcional, o padrão é 1.
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {offers.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </Carousel>
    </Container>
  );
}

export default OffersCarousel;
