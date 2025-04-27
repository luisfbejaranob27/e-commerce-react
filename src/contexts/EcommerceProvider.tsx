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

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <EcommerceContext.Provider value={{ cartItems, addToCart, cartItemCount }}>
      {children}
    </EcommerceContext.Provider>
  );
};
