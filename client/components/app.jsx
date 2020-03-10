import React, { Component } from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';

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
  }

  addToCard(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: [...this.state.cart, data]
        });
      });
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('api/cart')
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
        <Header cartItemCount={cart.length} />
        {view.name === 'catalog'
          ? <ProductList setView={this.setView} />
          : <ProductDetails addToCard={this.addToCard} setView={this.setView} params={view.params} />}
      </div>
    );

  }
}

export default App;
