import { createContext } from 'react';
import { CartItem } from "../models/CartItem.ts";
import { Order } from "../models/Order.ts";
import {PaymentMethod} from "../enums/PaymentMethod.ts";
import { Item } from "../models/Item.ts";

type EcommerceContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (item: CartItem, newQuantity: number) => void;
  removeFromCart: (item: CartItem) => void;
  cartItemCount: number;
  orders: Order[];
  confirmOrder: (userId: string, shippingAddress: string, paymentMethod: PaymentMethod) => void;
  getPaymentMethodName: (method: PaymentMethod) => string;
  items: Item[];
  filteredItems: Item[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  searchItems: (searchTerm: string) => void;
}

export const EcommerceContext = createContext<EcommerceContextType>({
  cartItems: [],
  addToCart: () => {},
  updateCartItemQuantity: () => {},
  removeFromCart: () => {},
  cartItemCount: 0,
  orders: [],
  confirmOrder: () => {},
  getPaymentMethodName: () => "",
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  searchTerm: "",
  searchItems: () => {},
});
