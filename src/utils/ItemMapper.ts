import {Item} from "../models/Item.ts";

export const mapUserResponse = (data: any[]): Item[] => {
  return data.map(item => ({
    name: item.title,
    price: item.price,
    imageUrl: item.images?.[0] ?? './src/assets/default-product.png',
  }));
};
