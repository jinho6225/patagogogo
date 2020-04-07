import React, { useState, useEffect } from 'react';
import SweaterListItem from './sweater-list-item.jsx';

function SweaterList(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('api/products3')
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <>
      <div className="container py-3">
        <div className="card-deck d-flex">
          {products.map((product, i) => {
            return (
              <SweaterListItem
                setView={props.setView}
                product={product}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SweaterList;
