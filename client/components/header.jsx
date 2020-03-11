import React from 'react';

const Header = props => {
  const { cartItemCount, setView, backTo } = props;
  return (
    <div className="bg-dark text-white d-flex justify-content-between align-items-center px-3">
      <h1 className="m-0 p-1 pointer" onClick={() => {
        backTo();
      }}>🍺Wicked Sales</h1>
      <h5 className="m-0 p-1 pointer" onClick={() => {
        setView('cart', { productId: {} });
      }}>{cartItemCount} Items<i className="fas fa-shopping-cart"></i></h5>
    </div>
  );
};
export default Header;
