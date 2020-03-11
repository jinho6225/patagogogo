import React from 'react';

const Header = props => {
  const { cartItemCount, setView, backTo } = props;
  return (
    <div className="row bg-dark text-white d-flex justify-content-between align-items-center px-3">
      <div className="d-flex  justify-content-lg-start justify-content-md-center justify-content-sm-center justify-content-center col col-12 order-1 col-lg-8 order-lg-1">
        <h1 className="m-0 p-1 pointer" onClick={() => {
          backTo();
        }}>🍺Wicked Sales</h1>
      </div>
      <div className="d-flex  justify-content-lg-end justify-content-md-center justify-content-sm-center justify-content-center  col col-12 order-2 col-lg-4 order-lg-2">
        <h5 className="m-0 p-1 pointer" onClick={() => {
          setView('cart', { productId: {} });
        }}>
          <span>{cartItemCount} Items</span>
          <span><i className="fas fa-shopping-cart"></i></span>
        </h5>
      </div>
    </div>
  );
};
export default Header;
