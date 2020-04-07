import React, { useState } from 'react';
import Category from './category.jsx';
import Catalog from './catalog.jsx';
import IntroModal from './intro-modal.jsx';

const MainPage = props => {
  const [showObj, setShowObj] = useState({ show: true, displayNone: false });

  const toggleIntro = () => {
    setShowObj({ show: false, displayNone: false });
    setTimeout(() => {
      setShowObj({ show: false, displayNone: true });
    }, 750);
  };

  return (
    <>
      <Catalog />
      <div className="container py-3">
        <div className="card-deck d-flex">
          <Category setView={props.setView} />
        </div>
        <IntroModal showIntroModal={showObj} toggleIntro={toggleIntro} />
      </div>
    </>
  );
};

export default MainPage;
