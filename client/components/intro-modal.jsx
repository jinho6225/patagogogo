import React from 'react';

function IntroModal(props) {
  return (
    <div
      className={`position-fixed h-100 w-100 overlay ${
        props.showIntroModal.displayNone ? 'd-none' : 'd-flex'
      } ${props.showIntroModal.show ? 'fade-in' : 'fade-out'}`}
    >
      <div className="m-auto p-3">
        <div
          className={`bg-white rounded p-3 modal-message ${
            props.showIntroModal.show ? 'slide-in' : 'slide-out'
          }`}
        >
          <h5 className="text-center">Welcome to patagogogo</h5>
          <div className="d-flex"></div>
          <p className="text-center">
            this app was created strictly for demonstration purposes. By
            clicking the button below, you accept that no purchases will be
            made, no payment processing will be done, and that actual personal
            information should not be used in checkout.
          </p>
          <div className="btn-group w-100">
            <button
              className="btn btn-danger w-100"
              onClick={() => props.toggleIntro()}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroModal;
