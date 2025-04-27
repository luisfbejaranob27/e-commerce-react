import { useContext } from "react";
import { Item } from "../../models/Item.ts";
import { CartItem } from "../../models/CartItem.ts";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";
import "./Card.css"

type CardProps = {
  item: Item;
  onClick?: () => void;
}

export const Card = ({ item, onClick }: CardProps) =>
{
  const context = useContext(EcommerceContext);
  const { name, price, imageUrl } = item;
  const imageSrc = imageUrl ?? "./src/assets/default-product.png";

  const cartItem: CartItem = {
    item: item,
    quantity: 1,
  }

  return (
    <div className="card h-100" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={imageSrc} className="card-img-top" alt={name} />
      <div className="add-icon" onClick={(e) => { e.stopPropagation(); context.addToCart(cartItem) }}>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <i className="bi bi-cash"></i> = {price}
        </p>
      </div>
    </div>
  );
};
