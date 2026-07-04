// src/helpers/cartStorage.js

export const loadCart = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error);
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error);
  }
};

export const clearCartStorage = () => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
  }
};
