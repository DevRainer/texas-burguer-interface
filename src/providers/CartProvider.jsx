import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import { CartContext } from '../contexts/CartContext';
import { loadCart, saveCart, clearCartStorage } from '../helpers/cartStorage';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadCart());

  const updateLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const validateItem = (item) => {
    if (!item.id || typeof item.price !== 'number' || !item.quantity) {
      toast.error('Produto inválido.');
      return false;
    }
    return true;
  };

  const addToCart = (item) => {
    if (!validateItem(item)) return;

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
      toast.success(`${item.name} foi adicionado ao carrinho!`);
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      toast.error('Não foi possível adicionar o item ao carrinho.');
    }
  };

  const changeQuantity = (id, delta) => {
    try {
      const updatedCart = cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0);
      updateLocalStorage(updatedCart);
      toast.success('Quantidade atualizada.');
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      toast.error('Não foi possível atualizar a quantidade.');
    }
  };

  const increaseQuantity = (id) => changeQuantity(id, +1);
  const decreaseQuantity = (id) => changeQuantity(id, -1);

  const removeFromCart = (id) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      updateLocalStorage(updatedCart);
      toast.success('Item removido do carrinho.');
    } catch (error) {
      console.error('Erro ao remover item:', error);
      toast.error('Não foi possível remover o item.');
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      clearCartStorage();
      toast.success('Carrinho limpo com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error('Não foi possível limpar o carrinho.');
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

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
