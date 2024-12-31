import React from "react";
import ItemCard from "./itemcard.js";
import "./itemlists.css";


const ItemList = ({ items }) => {
  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} style={{ height: '100%' }}>
          <ItemCard key={item.id} item={item} style={{ height: '100%' }} />
        </div>
      ))}
      {
        items.length === 0 &&
        <div className="no-items" style={{ gridColumn: 'span 4' }}>No items found</div>  
      }
    </div>
  );
};

export default ItemList;