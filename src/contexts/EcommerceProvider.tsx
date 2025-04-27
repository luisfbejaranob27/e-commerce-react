import { ReactNode, useState } from 'react';
import { EcommerceContext } from './EcommerceContext.ts';
import { CartItem } from "../models/CartItem.ts";
import { Order } from '../models/Order.ts';
import { PaymentMethod } from '../enums/PaymentMethod.ts';
import { OrderStatus } from "../enums/OrderStatus.ts";

export const EcommerceProvider = ({ children }: { children: ReactNode }) =>
{
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

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
    if (newQuantity <= 0)
    {
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

  const removeFromCart = (item: CartItem) =>
  {
    setCartItems(prevItems =>
      prevItems.filter(cartItem => cartItem.item.name !== item.item.name)
    );
  };

  const calculateTotal = () =>
  {
    return cartItems.reduce((total, item) =>
    {
      return total + (item.item.price * item.quantity);
    }, 0);
  };

  const confirmOrder = (userId: string, shippingAddress: string, paymentMethod: PaymentMethod) =>
  {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: userId,
      items: [...cartItems],
      totalPrice: calculateTotal(),
      orderDate: new Date(),
      status: OrderStatus.PENDING,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    };

    setOrders([...orders, newOrder]);
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return "Credit card";
      case PaymentMethod.DEBIT_CARD:
        return "Debit card";
      case PaymentMethod.CASH:
        return "Cash";
      case PaymentMethod.BANK_TRANSFER:
        return "Bank transfer";
      case PaymentMethod.CASH_ON_DELIVERY:
        return "Payment on delivery";
      case PaymentMethod.PAYPAL:
        return "PayPal";
      default:
        return "Unknown";
    }
  };

  return (
    <EcommerceContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeFromCart, cartItemCount, orders, confirmOrder, getPaymentMethodName }}>
      {children}
    </EcommerceContext.Provider>
  );
};
