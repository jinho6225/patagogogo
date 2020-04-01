import React from 'react';

const Header = props => {
  const { cart, setView, backTo } = props;
  const items = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <div className="bgGray text-white sticky-top py-3">
      <div className="container d-flex align-items-center justify-content-between">
        <h3
          className="text-light m-0 title pointer"
          onClick={() => {
            backTo();
          }}
        >
          🏔 patagogogo
        </h3>
        <p
          className="text-light m-0 pointer"
          onClick={() => {
            setView('cart', { productId: {} });
          }}
        >
          {items} Items &nbsp;<i className="fas fa-shopping-cart"></i>
        </p>
      </div>
    </div>
  );
};
export default Header;
