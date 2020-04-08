import React, { Component } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import MainPage from './main.jsx';
import TshirtList from './tshirt-list.jsx';
import PantsList from './pants-list.jsx';
import SweaterList from './sweater-list.jsx';
import ProductsDetails from './products-details.jsx';
import CartSummary from './cart-summary.jsx';
import CheckoutForm from './checkout-form.jsx';
import Confirmation from './confirmation.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        name: 'main',
        params: {},
      },
      cart: [],
      showStatus: {
        show: true,
        displayNone: false,
      },
      orderConfirmArr: [],
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.backTo = this.backTo.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.orderConfirm = this.orderConfirm.bind(this);
    this.toggleIntro = this.toggleIntro.bind(this);
  }

  toggleIntro() {
    this.setState({
      showStatus: {
        show: false,
        displayNone: false,
      },
    });
    setTimeout(() => {
      this.setState({
        showStatus: {
          show: false,
          displayNone: true,
        },
      });
    }, 750);
  }

  orderConfirm(cart) {
    this.setState({
      orderConfirmArr: cart,
    });
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cart: [],
        });
      });
  }

  backTo() {
    this.setView('main', {});
  }

  addToCart(productId, operator) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, operator }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.getCartItems();
      });
  }

  componentDidMount() {
    this.getCartItems();
  }

  removeCartItem(item) {
    const { cartItemId } = item;
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        this.getCartItems();
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((cart) => {
        this.setState({ cart });
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: { productId: params.productId },
      },
    });
  }

  page() {
    const {
      view: { name, params },
      cart,
      orderConfirmArr,
      showStatus,
    } = this.state;
    if (name === 'tshirt') {
      return <TshirtList setView={this.setView} />;
    } else if (name === 'sweater') {
      return <SweaterList setView={this.setView} />;
    } else if (name === 'pants') {
      return <PantsList setView={this.setView} />;
    } else if (name === 'main') {
      return (
        <MainPage
          setView={this.setView}
          showStatus={showStatus}
          toggleIntro={this.toggleIntro}
        />
      );
    } else if (name === 'cart') {
      return (
        <CartSummary
          removeCartItem={this.removeCartItem}
          backTo={this.backTo}
          cart={cart}
          addToCart={this.addToCart}
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
          orderConfirm={this.orderConfirm}
        />
      );
    } else if (name === 'confirmation') {
      return (
        <Confirmation
          setView={this.setView}
          orderConfirmArr={orderConfirmArr}
          orderConfirm={this.orderConfirm}
        />
      );
    } else {
      return (
        <ProductsDetails
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
