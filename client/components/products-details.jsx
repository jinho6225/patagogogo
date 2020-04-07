import React, { Component } from 'react';
import CartModal from './cart-modal';

class ProductsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      showModal: {
        show: false,
        displayNone: true,
      },
    };
    this.getProductOne = this.getProductOne.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const {
      showModal: { show },
    } = this.state;
    if (show) {
      this.setState({
        showModal: {
          show: false,
          displayNone: false,
        },
      });
      setTimeout(() => {
        this.setState({
          showModal: {
            show: false,
            displayNone: true,
          },
        });
      }, 1000);
    } else {
      this.setState({
        showModal: {
          show: true,
          displayNone: false,
        },
      });
    }
  }

  getProductOne() {
    const { params } = this.props;
    fetch(`api/products/${params.productId}`)
      .then((res) => res.json())
      .then((product) => {
        this.setState({ product });
      });
  }

  componentDidMount() {
    this.getProductOne();
  }

  render() {
    const { product } = this.state;
    const {
      setView,
      params: { productId },
    } = this.props;

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
                  if (productId < 7) {
                    setView('tshirt', { productId: {} });
                  } else if (productId < 13) {
                    setView('pants', { productId: {} });
                  } else {
                    setView('sweater', { productId: {} });
                  }
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
                  className="w-100 detail-img fade-in"
                  alt={product.name}
                />
              </div>
              <div className="col-md-7 p-2">
                <h3 className="card-title slide-in">{product.name}</h3>
                <h4 className="card-text slide-in">{`$${(
                  product.price / 100
                ).toFixed(2)}`}</h4>
                <p className="card-text slide-in">{product.shortDescription}</p>
                <button
                  type="button"
                  className="btn text-white addBtn card-text slide-in"
                  onClick={() => {
                    this.props.addToCart(product.productId, '+');
                    this.toggleModal();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div>
              <p className="slide-in">{product.longDescription}</p>
            </div>
          </div>
          <CartModal
            showModal={this.state.showModal}
            setView={this.props.setView}
            toggleModal={this.toggleModal}
            product={this.state.product}
          />
        </div>
      );
    } else {
      return <div>watsup</div>;
    }
  }
}

export default ProductsDetails;
