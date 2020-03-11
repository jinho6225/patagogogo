import React, { Component } from 'react';

class CheckoutForm extends Component {

  render() {
    return (
      <div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label htmlFor="">Name</label>
            <span className="input-group-text">Name</span>
          </div>
          <input type="text" className="form-control" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label htmlFor="">Credit Card</label>
            <span className="input-group-text">Credit Card</span>
          </div>
          <input type="text" className="form-control" />
        </div>

        <div className="input-group">
          <div className="input-group-prepend">
            <label htmlFor="">Shipping Address</label>
            <span className="input-group-text">Shipping Address</span>
          </div>
          <textarea className="form-control" ></textarea>
        </div>

      </div>
    );
  }
}

export default CheckoutForm;
