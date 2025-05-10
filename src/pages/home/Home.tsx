import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "./components/card/Card.tsx";
import { Item } from "../../models/Item.ts";
import { ItemDetail } from "./components/item-detail/ItemDetail.tsx";
import { getAllItems, getItemsByCategory } from "../../services/ItemFetchService.ts";

export const Home = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const currentPath = location.pathname.slice(1);

  useEffect(() =>
  {
    const fetchItems = async () => {
      setLoading(true);
      try {
        let itemsData: Item[];
        const pageRoutes = ["my-account", "my-order", "my-orders", "my-cart", "sign-in", "sign-out"];

        if (currentPath && !pageRoutes.includes(currentPath)) {
          try {
            itemsData = await getItemsByCategory(currentPath);
          } catch (err) {
            console.error("GetItemsByCategory failed, using getAllItems as fallback:", err);
            itemsData = await getAllItems();
          }
        } else {
          itemsData = await getAllItems();
        }

        if (Array.isArray(itemsData)) {
          setItems(itemsData);
          setFilteredItems(itemsData);
        } else {
          console.error("The answer is not an array:", itemsData);
          setItems([]);
          setFilteredItems([]);
          setError("Incorrect data format received from server");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err instanceof Error ? err.message : "Unknown error loading items");
        setItems([]);
        setFilteredItems([]);
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPath]);

  useEffect(() =>
  {
    if (!items) return;

    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search") || "";

    if (!searchTerm.trim())
    {
      setFilteredItems(items);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = items.filter(item =>
      item.name?.toLowerCase().includes(searchTermLower) ||
      item.description?.toLowerCase().includes(searchTermLower)
    );

    setFilteredItems(filtered);
  }, [location.search, items]);

  const handleItemClick = (item: Item) =>
  {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderItems = (items: Item[]) =>
  {
    if (!items || items.length === 0) {
      return <p>There are no products available.</p>;
    }

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

  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>
            {currentPath ? `${currentPath.charAt(0).toUpperCase() + currentPath.slice(1)}` : "All Products"}
          </h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          <div id="products" className="row">
            {!loading && renderItems(filteredItems)}
          </div>
        </div>
      </div>
      <ItemDetail item={selectedItem} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
