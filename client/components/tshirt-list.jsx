import React, { Component } from 'react';
import TshirtListItem from './tshirt-list-item.jsx';

class TshirtList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  getProducts() {
    fetch('api/products1')
      .then((res) => res.json())
      .then((products) => {
        this.setState({ products });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <div className="container py-3">
          <div className="card-deck d-flex">
            {products.map((product, i) => {
              return (
                <TshirtListItem
                  setView={this.props.setView}
                  product={product}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default TshirtList;
