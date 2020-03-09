import React, { Component } from 'react';
import Header from './header.jsx';
import ProductList from './product-list.jsx';

class App extends Component {

  render() {
    return (
      <div className="container bg-light">
        <Header />
        <ProductList />
      </div>
    );

  }
}

export default App;
