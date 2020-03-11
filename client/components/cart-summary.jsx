import React from 'react';
import CartSummaryItem from './cart-summary-item.jsx';

const CartSummary = props => {
  const { cart, backTo, setView, removeCartItem } = props;
  if (cart.length === 0) {
    return (
      <div className="d-flex justify-content-center flex-column">
        <h3 className="mt-5 text-center">Cart is empty now 🙂</h3>
        <p className="text-center"><button type="button" className="btn btn-primary"
          onClick={() => {
            backTo();
          }}>Check the Items</button></p>
      </div>
    );
  } else {
    return (
      <div className="bg-light">
        <span className="text-muted pointer" onClick={() => {
          backTo();
        }}> <i className="fas fa-angle-left "></i> Back to catalog </span>
        <h2 className="">My Cart</h2>
        {cart.map((item, i) => {
          return <CartSummaryItem removeCartItem={removeCartItem} setView={setView} backTo={backTo} key={i} item={item} />;
        })}

        <div className="d-flex justify-content-between p-3">
          <h4 className="card-text">Item Total $ {cart.reduce((acc, cur) => {
            return acc + cur.price;
          }, 0) / 100}</h4>
          <p className="card-text" >
            <button type="button" className="btn btn-primary"
              onClick={() => {
                setView('checkout', { productId: {} });
              }}>Checkout</button>
          </p>
        </div>
      </div>
    );
  }
};
export default CartSummary;
