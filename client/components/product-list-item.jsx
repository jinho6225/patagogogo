import React from 'react';

const ProductListItem = props => {
  const { product, setView } = props;

  return (
    <div className="col-4 card-deck my-2">
      <div className="card pointer" onClick={() => {
        setView(product.name, product);
      }}>
        <img src={product.image} className="card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{`$${(product.price / 100).toFixed(2)}`}</p>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductListItem;
