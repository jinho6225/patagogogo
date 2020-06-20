import React from 'react';

const Category = (props) => {
  const { setView } = props;
  return (
    <>
      <div
        className=" category bgImg1"
        onClick={() => {
          setView('tshirt', { productId: {} });
        }}
      >
        <div className="content">
          <h1>T-Shirt</h1>
          <span>SHOP NOW</span>
        </div>
      </div>
      <div
        className=" category bgImg2"
        onClick={() => {
          setView('sweater', { productId: {} });
        }}
      >
        <div className="content">
          <h1>Sweater</h1>
          <span>SHOP NOW</span>
        </div>
      </div>
      <div
        className=" category bgImg3"
        onClick={() => {
          setView('pants', { productId: {} });
        }}
      >
        <div className="content">
          <h1>Pants</h1>
          <span>SHOP NOW</span>
        </div>
      </div>
    </>
  );
};
export default Category;
