import { Item } from "../models/Item.ts";

type ApiItem = {
  title: string;
  price: number;
  description: string;
  category: {
    name: string;
  };
  images: string[];
}

export const mapUserResponse = (data: ApiItem[]): Item[] => {
  return data.map(item => ({
    name: item.title,
    price: item.price,
    description: item.description,
    category: item.category.name,
    imageUrl: item.images[0] ?? './src/assets/default-product.png',
  }));
};
