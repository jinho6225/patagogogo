import React from 'react';

const Confirmation = (props) => {
  const { orderConfirmArr, orderConfirm, setView } = props;

  return (
    <div className="container py-5">
      <h1 className="fade-in">Thank you for your order!</h1>
      <h3 className="fade-in">Your Order:</h3>
      <div>
        {orderConfirmArr.map((item, i) => {
          return (
            <div
              className="border rounded bg-white p-3 mb-3 d-flex fade-in"
              key={i}
            >
              <div className="col-4 p-0 mr-3">
                <img className="image-fluid slide-in" src={item.image} />
              </div>
              <div className="my-auto">
                <h3 className="fade-in">{item.name}</h3>
                <h6 className="fade-in">${(item.price / 100).toFixed(2)}</h6>
                <small className="text-muted fade-in">
                  Quantity: {item.quantity}
                </small>
              </div>
            </div>
          );
        })}
        <button
          className="btn text-white confirmBtn my-auto fade-in"
          onClick={() => {
            orderConfirm([]);
            setView('main', {});
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
