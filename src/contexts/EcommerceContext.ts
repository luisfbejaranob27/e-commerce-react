import { createContext } from 'react';
import { CartItem } from "../models/CartItem.ts";
import { Order } from "../models/Order.ts";
import {PaymentMethod} from "../enums/PaymentMethod.ts";

type EcommerceContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (item: CartItem, newQuantity: number) => void;
  removeFromCart: (item: CartItem) => void;
  cartItemCount: number;
  orders: Order[];
  confirmOrder: (userId: string, shippingAddress: string, paymentMethod: PaymentMethod) => void;
  getPaymentMethodName: (method: PaymentMethod) => string;
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
});
