import React, { Component } from 'react';
import ProductListItem from './product-list-item.jsx';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('api/products')
      .then(res => res.json())
      .then(products => {
        this.setState({ products });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { products } = this.state;
    return (
      <div className="row d-flex justify-content-center">
        {products.map((product, i) => {
          return <ProductListItem product={product} key={i} />;
        })}
      </div>
    );
  }
}
export default ProductList;
