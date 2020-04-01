import React, { Component } from 'react';
import RemoveModal from './remove-modal';

class CartSummaryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: {
        show: false,
        displayNone: true
      }
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.timeId = null;
  }

  toggleModal() {
    const {
      showModal: { show }
    } = this.state;
    if (show) {
      this.setState({
        showModal: {
          show: false,
          displayNone: false
        }
      });
      this.timeId = setTimeout(() => {
        this.setState({
          showModal: {
            show: false,
            displayNone: true
          }
        });
      }, 750);
      clearTimeout(this.timeId);
    } else {
      this.setState({
        showModal: {
          show: true,
          displayNone: false
        }
      });
    }
  }

  render() {
    const { item, setView, removeCartItem } = this.props;
    return (
      <div className="container mb-3">
        <div className="row border bg-white rounded p-3 position-relative item-card fade-in shadow">
          <div className="d-flex justify-content-between w-100 p-2">
            <h4 className="card-title">{item.name}</h4>
          </div>
          <div
            className="col-md-4 slide-in"
            onClick={() => {
              setView(item.name, item);
            }}
          >
            <img
              src={item.image}
              alt=""
              className="object-fit-card pointer fade-in"
            />
          </div>

          <div className="col-md-8 m-auto slide-in">
            <h4 className="card-text text-muted">{`$${(
              item.price / 100
            ).toFixed(2)}`}</h4>
            <p className="card-text">{item.shortDescription}</p>

            <div className="d-flex mb-3">
              <h5 className="my-auto">Quantity: </h5>
              <div className="d-flex btn-group mx-3 my-auto border border-dark rounded">
                <div className="d-flex">
                  <button
                    className="btn btn-light rounded-right"
                    // onClick={() => {
                    //   if (props.product.quantity > 1) {
                    //     props.sendToCart(props.product.productId, '-');
                    //   } else {
                    //     props.productToRemove(props.product);
                    //     props.toggleModal();
                    //   }
                    // }}
                  >
                    <i className="fas fa-minus m-auto" />
                  </button>
                </div>
                <div className="d-flex px-3">
                  <h5 className="m-auto">{item.quantity}</h5>
                </div>
                <div className="d-flex">
                  <button
                    className="btn btn-light rounded-left"
                    // onClick={() => { props.sendToCart(props.product.productId, '+'); }}
                  >
                    <i className="fas fa-plus m-auto" />
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn text-white removeBtn"
              onClick={() => {
                this.toggleModal();
              }}
            >
              Remove from Cart
            </button>
          </div>
        </div>
        <RemoveModal
          removeCartItem={removeCartItem}
          item={item}
          showModal={this.state.showModal}
          setView={setView}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
export default CartSummaryItem;
