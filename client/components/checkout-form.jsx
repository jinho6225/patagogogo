import React, { Component } from 'react';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(e) {
    const { placeOrder, backTo } = this.props;
    e.preventDefault();
    placeOrder(this.state);
    backTo();
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { cart, backTo } = this.props;
    return (
      <div>
        <h2 className="m-2 my-3">My Cart</h2>
        <h6 className="card-text text-muted m-2 my-3">Item Total $ {cart.reduce((acc, cur) => {
          return acc + cur.price;
        }, 0) / 100}</h6>
        <form >
          <label>Name</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange}/>
          </div>

          <label>Credit acrd</label>
          <div className="input-group mb-3">
            <input type="text" className="form-control" name="creditCard" value={this.state.creditCard} onChange={this.handleChange}/>
          </div>

          <label>Shipping Address</label>
          <div className="input-group mb-3">
            <textarea className="form-control" name="shippingAddress" value={this.state.shippingAddress} onChange={this.handleChange}></textarea>
          </div>

          <div className="d-flex justify-content-between align-items-center p-3">
            <span className="text-muted pointer" onClick={() => {
              backTo();
            }}> <i className="fas fa-angle-left "></i> Back to catalog </span>
            <p className="card-text" >
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Place Order</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
