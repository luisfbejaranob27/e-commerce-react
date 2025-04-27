import { PaymentMethod } from "../enums/PaymentMethod.ts";
import { CartItem } from "./CartItem";
import {OrderStatus} from "../enums/OrderStatus.ts";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  orderDate: Date;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
}
