import React from 'react';

const Header = props => {
  const { cartItemCount } = props;
  return (
    <div className="bg-dark text-white d-flex justify-content-between align-items-center px-5">
      <h1 className="m-0 p-1">🍺Wicked Sales</h1>
      <h5 className="m-0 p-1">{cartItemCount} Items<i className="fas fa-shopping-cart"></i></h5>
    </div>
  );
};
export default Header;
