import React, { Component } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
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
    this.addToCart = this.addToCart.bind(this);
    this.backTo = this.backTo.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
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

  addToCart(productId, operator) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, operator })
    })
      .then(response => response.json())
      .then(data => {
        const { cart } = this.state;
        const updateCart = cart.filter((item, i) => {
          return item.productId !== data[0].productId;
        });
        this.setState({
          cart: [...updateCart, data[0]]
        });
      });
  }

  componentDidMount() {
    this.getCartItems();
  }

  removeCartItem(item) {
    const { cartItemId } = item;
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.ok) {
        this.getCartItems();
      }
    });
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
    const {
      view: { name, params },
      cart
    } = this.state;
    if (name === 'catalog') {
      return <ProductList setView={this.setView} />;
    } else if (name === 'cart') {
      return (
        <CartSummary
          removeCartItem={this.removeCartItem}
          backTo={this.backTo}
          cart={cart}
          setView={this.setView}
        />
      );
    } else if (name === 'checkout') {
      return (
        <CheckoutForm
          backTo={this.backTo}
          cart={cart}
          setView={this.setView}
          placeOrder={this.placeOrder}
        />
      );
    } else {
      return (
        <ProductDetails
          backTo={this.backTo}
          addToCart={this.addToCart}
          setView={this.setView}
          params={params}
        />
      );
    }
  }

  render() {
    const { cart } = this.state;
    return (
      <>
        <Header cart={cart} setView={this.setView} backTo={this.backTo} />
        <div className="content-div">{this.page()}</div>
        <Footer />
      </>
    );
  }
}

export default App;
