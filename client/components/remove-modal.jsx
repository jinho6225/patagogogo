import React from 'react';

function RemoveModal(props) {
  const { removeCartItem, item, showModal, toggleModal } = props;
  return (
    <div
      className={`position-fixed h-100 w-100 ${
        showModal.displayNone ? 'd-none' : 'd-flex'
      } overlay ${showModal.show ? 'fade-in' : 'fade-out'}`}
    >
      <div className="m-auto p-3">
        <div
          className={`bg-white rounded p-3 modal-message ${
            showModal.show ? 'slide-in' : 'slide-out'
          }`}
        >
          <p className="text-center">Do you want to remove item?</p>
          <div className="btn-group w-100">
            <button
              className="btn btn-light w-50"
              onClick={() => toggleModal()}
            >
              Cancel
            </button>
            <button
              className="btn text-white removeBtn w-50"
              onClick={() => {
                removeCartItem(item);
                toggleModal();
              }}
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveModal;
