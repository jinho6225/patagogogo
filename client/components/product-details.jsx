import React, { Component } from 'react';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.getProductOne = this.getProductOne.bind(this);
  }

  getProductOne() {
    const { params } = this.props;
    fetch(`api/products/${params.productId}`)
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
      });
  }

  componentDidMount() {
    this.getProductOne();
  }

  render() {
    const { product } = this.state;
    if (product !== null) {
      return (
        <div className="container py-5">
          <div
            className="container py-3 bg-white border rounded shadow"
            id={product.productId}
          >
            <div className="mb-3">
              <a
                className="text-muted pointer mb-3"
                onClick={() => {
                  this.props.backTo();
                }}
              >
                {' '}
                <i className="fas fa-chevron-circle-left "></i> Back to catalog
              </a>
            </div>
            <div className="row mb-3">
              <div className="col-md-5">
                <img
                  src={product.image}
                  className="w-100 detail-img slide-in"
                  alt={product.name}
                />
              </div>
              <div className="col-md-7 p-2">
                <h3 className="card-title slide-in">{product.name}</h3>
                <h4 className="card-text slide-in">{`$${(
                  product.price / 100
                ).toFixed(2)}`}</h4>
                <p className="card-text slide-in">{product.shortDescription}</p>
                <p
                  className="card-text slide-in"
                  onClick={() => {
                    this.props.addToCard(product);
                  }}
                >
                  <button type="button" className="btn text-white addBtn">
                    Add to Cart
                  </button>
                </p>
              </div>
            </div>
            <div>
              <p className="slide-in">{product.longDescription}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>watsup</div>;
    }
  }
}

export default ProductDetails;
