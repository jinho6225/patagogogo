import React from 'react';
import Category from './category.jsx';
import Catalog from './catalog.jsx';
import IntroModal from './intro-modal.jsx';

const MainPage = (props) => {
  const { showStatus, toggleIntro, setView } = props;
  return (
    <>
      <Catalog />
      <div className="container py-3">
        <div className="card-deck d-flex justify-content-center">
          <Category setView={setView} />
        </div>
        <IntroModal showIntroModal={showStatus} toggleIntro={toggleIntro} />
      </div>
    </>
  );
};

export default MainPage;
