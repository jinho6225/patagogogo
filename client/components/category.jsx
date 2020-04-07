import React from 'react';

const Category = props => {
  const { setView } = props;
  return (
    <div className="card-deck">
      <div
        className="card category"
        onClick={() => {
          setView('catalog', { productId: {} });
        }}
      >
        <h5
          className="section slide-in"
          onClick={() => {
            setView('catalog', { productId: {} });
          }}
        >
          T-shirt <br /> shop now
        </h5>
        <img src="./images/t-shirt.jpeg" className="category-img fade-in" />
      </div>
      <div className="card category">
        <h5 className="section slide-in">
          Sweater <br /> shop now
        </h5>
        <img src="./images/sweater.jpeg" className="category-img fade-in" />
      </div>
      <div className="card category">
        <h5 className="section slide-in">
          Pants <br /> shop now
        </h5>
        <img src="./images/pants.jpeg" className="category-img fade-in" />
      </div>
    </div>
  );
};
export default Category;
