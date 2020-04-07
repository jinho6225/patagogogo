import React from 'react';

const Category = (props) => {
  const { setView } = props;
  return (
    <div className="card-deck">
      <div
        className="card category"
        onClick={() => {
          setView('tshirt', { productId: {} });
        }}
      >
        <h5
          className="section slide-in"
          onClick={() => {
            setView('tshirt', { productId: {} });
          }}
        >
          T-shirt <br /> shop now
        </h5>
        <img src="./images/t-shirt.jpeg" className="category-img fade-in" />
      </div>
      <div
        className="card category"
        onClick={() => {
          setView('sweater', { productId: {} });
        }}
      >
        <h5
          className="section slide-in"
          onClick={() => {
            setView('sweater', { productId: {} });
          }}
        >
          Sweater <br /> shop now
        </h5>
        <img src="./images/sweater.jpeg" className="category-img fade-in" />
      </div>
      <div
        className="card category"
        onClick={() => {
          setView('pants', { productId: {} });
        }}
      >
        <h5
          className="section slide-in"
          onClick={() => {
            setView('pants', { productId: {} });
          }}
        >
          Pants <br /> shop now
        </h5>
        <img src="./images/pants.jpeg" className="category-img fade-in" />
      </div>
    </div>
  );
};
export default Category;
