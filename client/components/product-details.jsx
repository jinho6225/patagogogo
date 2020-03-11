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
        <div className="container d-flex flex-column">
          <div className="row d-flex flex-row justify-content-center" id={product.productId}>
            <div className="w-100 px-5 d-flex flex-column justify-content-lg-start justify-content-md-center justify-content-sm-center justify-content-center col-4 col-12 order-1 col-lg-5 order-lg-1">
              <p className="text-muted pointer" onClick={() => {
                this.props.backTo();
              }}> <i className="fas fa-angle-left "></i> Back to catalog </p>
              <p><img src={product.image} className="detail-img" alt="..." /></p>
            </div>
            <div className=" w-100  px-5 d-flex flex-column justify-content-lg-center justify-content-md-center justify-content-sm-center justify-content-center  col-8 col-12 order-2 col-lg-7 order-lg-2">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-muted">{`$${(product.price / 100).toFixed(2)}`}</p>
              <p className="card-text">{product.shortDescription}</p>
              <p className="card-text" onClick={() => {
                this.props.addToCard(product);
              }} ><button type="button" className="btn btn-primary">Add to Cart</button></p>

            </div>
          </div>
          <div className="row ">
            <p className="my-3 px-5">{product.longDescription}</p>
          </div>
        </div>
      );

    } else {
      return (
        <div>watsup</div>
      );
    }
  }
}

export default ProductDetails;
