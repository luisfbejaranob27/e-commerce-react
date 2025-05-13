import * as React from "react";
import {useContext, useEffect, useState} from 'react';
import { Item } from '../../../../models/Item.ts';
import './ItemDetail.css';
import {EcommerceContext} from "../../../../contexts/EcommerceContext.ts";
import {CartItem} from "../../../../models/CartItem.ts";

interface ItemDetailProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ItemDetail = ({ item, isOpen, onClose }: ItemDetailProps) =>
{
  const context = useContext(EcommerceContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getItemIdentifier = (itemObj: Item): string =>
  {
    // Combinamos name y price para crear un identificador único
    return `${itemObj.name}-${itemObj.price}`;
  };

  const getSavedItems = (): Item[] => {
    const savedItemsJson = localStorage.getItem('savedItems');
    return savedItemsJson ? JSON.parse(savedItemsJson) : [];
  };

  useEffect(() =>
  {
    if (isOpen) {
      setTimeout(() =>
      {
        setIsVisible(true);
      }, 10);

      if (item)
      {
        const savedItems = getSavedItems();
        const itemIdentifier = getItemIdentifier(item);
        setIsSaved(savedItems.some(savedItem => getItemIdentifier(savedItem) === itemIdentifier));
      }
    }
    else
    {
      setIsVisible(false);
    }
  }, [isOpen, item]);

  if (!item) return null;

  const cartItem: CartItem = {
    item: item,
    quantity: 1,
  }

  const toggleSaveItem = (e: React.MouseEvent) =>
  {
    e.stopPropagation();

    const savedItems = getSavedItems();
    const itemIdentifier = getItemIdentifier(item);

    const itemIndex = savedItems.findIndex(savedItem => getItemIdentifier(savedItem) === itemIdentifier);

    if (itemIndex >= 0)
    {
      savedItems.splice(itemIndex, 1);
      setIsSaved(false);
    }
    else
    {
      savedItems.push(item);
      setIsSaved(true);
    }

    localStorage.setItem('savedItems', JSON.stringify(savedItems));
  };

  return (
    <div
      className={`modal fade ${isVisible ? 'show' : ''}`}
      style={{ display: isOpen ? 'block' : 'none' }}
      tabIndex={-1}
      role="dialog"
      aria-hidden={!isOpen}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{item.name}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-6">
                <h3 className="mb-3">{item.name}</h3>
                <p className="text-muted mb-2">{item.category}</p>
                <p className="fs-4 text-primary mb-4">${item.price.toFixed(2)}</p>
                <p className="mb-4">{item.description}</p>
                <button className="btn btn-primary me-2" onClick={(e) => { e.stopPropagation(); context.addToCart(cartItem) }}>
                  <i className="bi bi-cart-plus me-2"></i>Add to Cart
                </button>
                <button
                  className={`btn ${isSaved ? 'btn-danger' : 'btn-outline-secondary'}`}
                  onClick={toggleSaveItem}
                >
                  <i className={`bi ${isSaved ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
