import React from 'react';

const ProductListItem = props => {
  const { product, setView } = props;

  return (
    <div className="d-flex col-11 col-lg-4 col-md-6 col-sm-11 col-xs-11 justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center my-2">
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
