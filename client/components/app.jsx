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

  page() {
    const { view: { name, params }, cart } = this.state;
    if (name === 'catalog') {
      return <ProductList setView={this.setView} />;
    } else if (name === 'cart') {
      return <CartSummary backTo={this.backTo} cart={cart} setView={this.setView} />;
    } else if (name === 'checkout') {
      return <CheckoutForm backTo={this.backTo} cart={cart} setView={this.setView} placeOrder={this.placeOrder} />;
    } else {
      return <ProductDetails backTo={this.backTo} addToCard={this.addToCard} setView={this.setView} params={params} />;
    }
  }

  render() {
    const { cart } = this.state;

    return (
      <div className="container bg-light">
        <Header cartItemCount={cart.length} setView={this.setView} backTo={this.backTo} />
        {this.page()}
      </div>
    );

  }
}

export default App;
