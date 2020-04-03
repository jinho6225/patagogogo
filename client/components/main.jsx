import React from 'react';
import Category from './category.jsx';
import Catalog from './catalog.jsx';

const MainPage = () => {
  return (
    <>
      <Catalog />
      <div className="container py-3">
        <div className="card-deck d-flex">
          <Category />
        </div>
      </div>
    </>
  );
};

export default MainPage;
