import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // lembre-se de instalar: npm install react-toastify

import PropTypes from 'prop-types';

import { CartContext } from '../contexts/CartContext';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      toast.error('Não foi possível carregar o carrinho.');
      return [];
    }
  });

  // 🔧 Função auxiliar para atualizar estado + localStorage com tratamento de erro
  const updateLocalStorage = (updatedCart) => {
    try {
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
      toast.error('Não foi possível atualizar o carrinho.');
    }
  };

  const addToCart = (item) => {
    try {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id,
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      } else {
        updatedCart = [...cartItems, item];
      }

      updateLocalStorage(updatedCart);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast.error('Não foi possível adicionar o item ao carrinho.');
    }
  };

  const increaseQuantity = (id) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      updateLocalStorage(updatedCart);
    } catch (error) {
      console.error('Erro ao aumentar quantidade:', error);
      toast.error('Não foi possível atualizar a quantidade.');
    }
  };

  const decreaseQuantity = (id) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      updateLocalStorage(updatedCart);
    } catch (error) {
      console.error('Erro ao diminuir quantidade:', error);
      toast.error('Não foi possível atualizar a quantidade.');
    }
  };

  const removeFromCart = (id) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      updateLocalStorage(updatedCart);
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast.error('Não foi possível remover o item.');
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error('Não foi possível limpar o carrinho.');
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // 🔄 Sincronização entre múltiplas abas
  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === 'cart') {
        try {
          setCartItems(event.newValue ? JSON.parse(event.newValue) : []);
        } catch (error) {
          console.error('Erro ao sincronizar carrinho:', error);
          toast.error('Não foi possível sincronizar o carrinho.');
        }
      }
    };
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
