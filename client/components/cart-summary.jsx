import React from 'react';
import CartSummaryItem from './cart-summary-item.jsx';

const CartSummary = props => {
  const { cart, backTo, setView, removeCartItem, addToCart } = props;
  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center flex-column">
          <h2 className="">My Cart</h2>
          <h3 className="fade-in">Your cart is empty now</h3>
          <p className="text-center">
            <button
              type="button"
              className="btn text-white addBtn"
              onClick={() => {
                backTo();
              }}
            >
              Check the Items
            </button>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container py-5">
        <div className="mb-3">
          <a
            className="text-muted pointer mb-3"
            onClick={() => {
              backTo();
            }}
          >
            {' '}
            <i className="fas fa-chevron-circle-left "></i> Back to catalog
          </a>
          <h1 className="mb-3">My Cart</h1>
          {cart.map((item, i) => {
            return (
              <CartSummaryItem
                addToCart={addToCart}
                removeCartItem={removeCartItem}
                setView={setView}
                key={i}
                item={item}
              />
            );
          })}
          <div className="d-md-flex justify-content-between slide-in p-3">
            <h4 className="md-my-auto text-muted slide-in">
              Item Total ${' '}
              {(
                cart.reduce((acc, cur) => {
                  return (acc + cur.price) * cur.quantity;
                }, 0) / 100
              ).toFixed(2)}
            </h4>
            <button
              type="button"
              className="btn text-white checkoutBtn"
              onClick={() => {
                setView('checkout', { productId: {} });
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default CartSummary;
