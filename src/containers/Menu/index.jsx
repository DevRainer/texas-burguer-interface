import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CardProduct } from '../../components/CardProduct';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import {
  Container,
  Banner,
  CategoryMenu,
  ProductsContainer,
  CategoryButton,
} from './styles';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 0) {
      return products;
    }
    return products.filter((product) => product.category_id === activeCategory);
  }, [activeCategory, products]);

  const navigate = useNavigate();
  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get('/categories'),
          api.get('/products'),
        ]);

        const newCategories = [
          { id: 0, name: 'Todos' },
          ...categoriesResponse.data,
        ];
        setCategories(newCategories);

        const newProducts = productsResponse.data.map((product) => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }

    loadData();
  }, []);

  return (
    <Container>
      <Banner>
        <h1>
          O Melhor
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI!
          <span>Esse cartápio está irresistível</span>
        </h1>
      </Banner>
      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={() => {
              navigate(
                {
                  pathname: '/cardapio',
                  search: `?category=${category.id}`,
                },
                {
                  replace: false,
                },
              );
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  );
}
