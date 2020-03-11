import React, { Component } from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';
import CartSummary from './cart-summary.jsx';
import CheckoutForm from './checkout-form.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCard = this.addToCard.bind(this);
    this.backTo = this.backTo.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: []
        });
      });
  }

  backTo() {
    this.setView('catalog', {});
  }

  addToCard(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: [...this.state.cart, data[0]]
        });
      });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart });
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: { productId: params.productId }
      }
    });
  }

  render() {
    const { view, cart } = this.state;
    return (
      <div className="container bg-light">
        <Header cartItemCount={cart.length} setView={this.setView} />
        {view.name === 'catalog'
          ? <ProductList setView={this.setView} />
          : view.name === 'cart'
            ? <CartSummary backTo={this.backTo} cart={cart} setView={this.setView} />
            : view.name === 'checkout'
              ? <CheckoutForm backTo={this.backTo} cart={cart} setView={this.setView} placeOrder={this.placeOrder} />
              : <ProductDetails backTo={this.backTo} addToCard={this.addToCard} setView={this.setView} params={view.params} />}

      </div>
    );

  }
}

export default App;
