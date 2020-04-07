import React from 'react';

const SweaterListItem = (props) => {
  const { product, setView } = props;

  return (
    <div className="d-flex col-lg-4 col-md-6 col-sm-12 col-xs-12 align-items-stretch my-2 p-0">
      <div
        className="card pointer product"
        onClick={() => {
          setView(product.name, product);
        }}
      >
        <img src={product.image} className="card-img-top objectfit" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{`$${(
            product.price / 100
          ).toFixed(2)}`}</p>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
};
export default SweaterListItem;
