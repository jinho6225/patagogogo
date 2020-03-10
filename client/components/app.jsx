import React, { Component } from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';
import ProductDetails from './product-details.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      view: {
        name: 'catalog', // { name: 'details',
        params: {} // params: { productId: product.productId } }
      }
    };
    this.setView = this.setView.bind(this);
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
    const { view } = this.state;
    return (
      <div className="container bg-light">
        <Header />
        {view.name === 'catalog'
          ? <ProductList setView={this.setView} />
          : <ProductDetails setView={this.setView} params={view.params} />}
      </div>
    );

  }
}

export default App;
