import { useState, ReactNode } from 'react';
import { EcommerceContext } from './EcommerceContext.ts';
import { CartItem } from "../models/CartItem.ts";

export const EcommerceProvider = ({ children }: { children: ReactNode }) =>
{
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) =>
  {
    const newItem = { ...item };

    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.item.name === newItem.item.name
    );

    if (existingItemIndex >= 0)
    {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
      };
      setCartItems(updatedItems);
    }
    else
    {
      setCartItems(prevItems => [...prevItems, newItem]);
    }
  };

  const updateCartItemQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Si la nueva cantidad es 0 o negativa, eliminamos el producto
      removeFromCart(item);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.item.name === item.item.name
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems(prevItems =>
      prevItems.filter(cartItem => cartItem.item.name !== item.item.name)
    );
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <EcommerceContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeFromCart, cartItemCount }}>
      {children}
    </EcommerceContext.Provider>
  );
};
