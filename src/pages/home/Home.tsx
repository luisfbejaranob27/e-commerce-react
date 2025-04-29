import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";
import { Card } from "./components/card/Card.tsx";
import { Item } from "../../models/Item.ts";
import { ItemDetail } from "./components/item-detail/ItemDetail.tsx";

export const Home = () =>
{
  const { filteredItems, items, loading, error, searchItems } = useContext(EcommerceContext);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search") || "";
    searchItems(searchTerm);
  }, [location.search, searchItems]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderItems = (items: Item[]) =>{
    return (
      <>
        {items.map((item: Item, index) => (
          <div className="col-2" key={index}>
            <Card item={item} onClick={() => handleItemClick(item)} />
          </div>
        ))}
      </>
    );
  };

  const displayItems = filteredItems.length > 0 ? filteredItems : items;

  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>List Products</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          <div id="products" className="row">
            {renderItems(displayItems)}
          </div>
        </div>
      </div>
      <ItemDetail item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
