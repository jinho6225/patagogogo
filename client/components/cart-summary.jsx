import React from 'react';
import CartSummaryItem from './cart-summary-item.jsx';

const CartSummary = props => {
  const { cart, backTo } = props;
  if (cart.length === 0) {
    return (
      <div>Cart is empty now 🙂</div>
    );
  } else {
    return (
      <div className="bg-light">
        <span className="text-muted pointer" onClick={() => {
          backTo();
        }}> <i className="fas fa-angle-left "></i> Back to catalog </span>
        <h2>My Cart</h2>
        {cart.map((item, i) => {
          return <CartSummaryItem backTo={backTo} key={i} item={item} />;
        })}
      </div>
    );
  }
};
export default CartSummary;
