import React from 'react';

const CartSummaryItem = props => {
  const { item, setView, removeCartItem } = props;
  return (
    <div className="mt-3">
      <div className="row w-85 m-2 p-2 border border-secondary bg-light d-flex align-items-center">
        <div className="col-4 w-100 p-2 bg-white pointer" onClick={() => {
          setView(item.name, item);
        }}>
          <img src={item.image} className="card-img" alt="..." />
        </div>

        <div className="col-7 w-100 p-2">
          <h4 className="card-title">{item.name}</h4>
          <p className="card-text text-muted">{`$${(item.price / 100).toFixed(2)}`}</p>
          <p className="card-text">{item.shortDescription}</p>
          <button type="button" className="btn btn-info"
            onClick={() => {
              removeCartItem(item);
            }}>Remove from Cart</button>
        </div>
      </div>
    </div>
  );
};
export default CartSummaryItem;
