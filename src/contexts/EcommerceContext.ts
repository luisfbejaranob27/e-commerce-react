import { createContext } from 'react';
import { CartItem } from "../models/CartItem.ts";

type EcommerceContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  cartItemCount: number;
}

export const EcommerceContext = createContext<EcommerceContextType>({
  cartItems: [],
  addToCart: () => {},
  cartItemCount: 0
});
