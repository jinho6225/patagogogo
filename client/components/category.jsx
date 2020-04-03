import React from 'react';

const Category = props => {
  return (
    <div className="card-deck">
      <div className="card">
        <img
          src="./images/t-shirt.jpeg"
          className="category-img fade-in"
          alt="..."
        />
        <h4 className="card-title slide-in">T-shirt</h4>
      </div>
      <div className="card">
        <img
          src="./images/sweater.jpeg"
          className="category-img fade-in"
          alt="..."
        />
        <h4 className="card-title slide-in">Sweater</h4>
      </div>
      <div className="card">
        <img
          src="./images/pants.jpeg"
          className="category-img fade-in"
          alt="..."
        />
        <h4 className="card-title slide-in">Pants</h4>
      </div>
    </div>
  );
};
export default Category;
