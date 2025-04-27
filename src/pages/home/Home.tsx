import { useEffect, useState } from "react";
import { Card } from "./components/card/Card.tsx";
import { mapUserResponse } from "../../utils/ItemMapper.ts";
import { Item } from "../../models/Item.ts";
import { ItemDetail } from "./components/item-detail/ItemDetail.tsx";

export const Home = () =>
{
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() =>
  {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(res =>
      {
        if (!res.ok)
        {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data =>
      {
        const items: Item[] = mapUserResponse(data);
        setItems(items);
        setLoading(false);
      })
      .catch(err =>
      {
        console.error("Error fetching users:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderProducts = (items: Item[]) =>{
    return (
      <>
        {items.map((item: Item, index) => (
          <div className="col-2" key={index}>
            <Card item={item} onClick={() => handleItemClick(item)} />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>List Products</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          <div id="products" className="row">
            {renderProducts(items)}
          </div>
        </div>
      </div>
      <ItemDetail item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
