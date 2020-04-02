import React from 'react';
import ValidationForm from './validation-form';

const CheckoutForm = props => {
  const { cart, setView, placeOrder, backTo } = props;
  return (
    <div className="container py-5">
      <div className="mb-3">
        <h1 className="mb-3">Place Order</h1>
        <h4 className="card-text text-muted my-3">
          Item Total ${' '}
          {(
            cart.reduce((acc, cur) => {
              return (acc + cur.price) * cur.quantity;
            }, 0) / 100
          ).toFixed(2)}
        </h4>

        <div className="row">
          <div className="col-md-12 slide-in">
            <ValidationForm
              placeOrder={placeOrder}
              backTo={backTo}
              setView={setView}
            />
          </div>
          <span
            className="text-muted pointer my-3 mx-4"
            onClick={() => {
              setView('cart', { productId: {} });
            }}
          >
            <i className="fas fa-chevron-circle-left "></i> Back to cart
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
