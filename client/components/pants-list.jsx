import React, { useState, useEffect } from 'react';
import PantsListItem from './pants-list-item.jsx';

function PantsList(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('api/products2')
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
              <PantsListItem
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

export default PantsList;
