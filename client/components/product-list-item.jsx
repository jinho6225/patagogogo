import React from 'react';

const ProductListItem = props => {
  const { product, setView } = props;
  function dollar(num) {
    const arr = num.toString().split('');
    arr.splice(arr.length - 2, 0, '.');
    return Number(arr.join(''));
  }

  return (
    <div className="col-4 card-deck my-2">
      <div className="card" onClick={() => {
        setView(product.name, product);
      }}>
        <img src={product.image} className="card-img" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-muted">{`$ ${dollar(product.price).toFixed(2)}`}</p>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductListItem;
