import "./Card.css"
import {Item} from "../../models/Item.ts";

export const Card = ({ item }: { item: Item }) =>
{
  const { name, price, imageUrl } = item;
  const imageSrc = imageUrl ?? "./src/assets/default-product.png";

  return (
    <div className="card h-100">
      <img src={imageSrc} className="card-img-top" alt={name} />
      <div className="add-icon">
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <i className="bi bi-cash"></i> = {price} USD
        </p>
      </div>
    </div>
  );
};
